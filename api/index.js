import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { User } from "./models/user.model.js";
import { Place } from "./models/place.model.js";
import { Booking } from "./models/booking.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import download from "image-downloader";
import multer from "multer";
import fs from "fs";
import path from "path";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

dotenv.config({
  path: ".env",
});

const PORT = process.env.PORT || 8001;

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin:process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use("/uploads", express.static(__dirname + "/uploads"));

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${process.env.DB_NAME}`
    );
    console.log(
      `\nMongoDB connected! DB host : ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MongoDB connection error", error);
    process.exit(1);
  }
};

app.get('/', (req, res) => {
  res.send('API is running.');
});

app.get("/test", (req, res) => {
  res.json("test ok");
});

const bcryptSalt = bcrypt.genSalt(10);
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, 10),
    });
    res.json(userDoc);
  } catch (error) {
    res.status(422).json(error);
  }
});

const jwtSecret = process.env.JWT_SECRET;
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const passwordOk = bcrypt.compareSync(password, userDoc.password);
    if (passwordOk) {
      jwt.sign(
        {
          email: userDoc.email,
          id: userDoc._id,
        },
        jwtSecret,
        {},
        (err, token) => {
          if (err) {
            throw err;
          } else {
            const options = {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              // sameSite : 'lax'
            };
            res.cookie("token", token, options).json(userDoc, "password ok");
          }
        }
      );
    } else {
      res.status(401).json("password not ok");
    }
  } else {
    res.json("not found");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, decoded) => {
      if (err) {
        throw err;
      }
      const { email } = decoded;
      const user = await User.findOne({ email }).select("-password");
      res.json(user);
    });
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("logged out");
});

app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  console.log(__dirname);

  await download.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });

  res.json(newName);
});

const photosMiddleware = multer({ dest: "uploads/" });
app.post("/upload", photosMiddleware.array("photos", 100), async (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path: filePath, originalname } = req.files[i];
    const extension = path.extname(originalname);
    const newPath = filePath + extension;
    fs.renameSync(filePath, newPath);
    uploadedFiles.push(newPath.replace("uploads/", ""));
  }

  res.json(uploadedFiles);
});

app.post("/places", async (req, res) => {
  const { token } = req.cookies;
  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, decoded) => {
    const userData = decoded;
    if (err) return res.status(401).json({ error: "Unauthorized" });
    const placeDoc = await Place.create({
      owner: userData.id,
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    });
    res.json(placeDoc);
  });
});

app.get("/user-places", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, decoded) => {
    const { id } = decoded; // decoded token is the user data
    res.json(await Place.find({ owner: id }));
  });
});

app.get("/places/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await Place.findById(id));
});

app.put("/places", async (req, res) => {
  const { token } = req.cookies;
  const {
    id,
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, decoded) => {
    const placeDoc = await Place.findById(id);
    if (decoded.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });

      await placeDoc.save();
      res.json("ok");
    } else {
      res.json("unauthorized");
    }
  });
});

app.get("/places", async (req, res) => {
  res.json(await Place.find());
});

app.post("/bookings", async(req, res) => {
  const { token } = req.cookies;
  const { place, checkIn, checkOut, numberOfGuests, name, phone, price } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, decoded) => {
    if (err) return res.status(401).json({ error: "Unauthorized" });
    const userData = decoded;
    const bookingDoc = await Booking.create({
      place, 
      user : userData.id,
      checkIn, 
      checkOut, 
      numberOfGuests, 
      name, 
      phone, 
      price
    })
    res.json(bookingDoc);
  })  
});

app.get('/bookings', async(req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, decoded) => {
        if (err) return res.status(401).json({ error: "Unauthorized" });
        const userData = decoded;
        res.json(await Booking.find({user:userData.id}).populate('place'))
    })
})



const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (err) {
    console.log("MongoDB connection error", err);
  }
};

startServer();
