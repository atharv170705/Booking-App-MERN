import { useState } from "react";
import { useParams } from "react-router-dom";
import Perks from "../PerksLabels";
import axios from "axios";
import { Navigate } from "react-router-dom";
import AccountNav from "../AccountNav";
import { useEffect } from "react";
const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

function PlacesFormPage() {
  const { id } = useParams();
  console.log({ id });

  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!id) return;
    axios.get("/places/" + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    });
  }, [id]);

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }
  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }
  function preInput(header, description) {
    return (
      <div>
        {inputHeader(header)}
        {inputDescription(description)}
      </div>
    );
  }

  async function addPhotoByLink(ev) {
    ev.preventDefault();
    const { data: filename } = await axios.post("/upload-by-link", {
      link: photoLink,
    });
    setAddedPhotos((prev) => {
      return [...prev, filename];
    });
    setPhotoLink("");
  }

  async function uploadPhoto(ev) {
    const files = ev.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    // console.log({ files });
    const response = await axios.post("/upload", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    const { data: filenames } = response;
    setAddedPhotos((prev) => {
      return [...prev, ...filenames];
    });
  }

  function removePhoto(ev, filename) {
    ev.preventDefault();
    setAddedPhotos([...addedPhotos.filter(photo => photo !== filename)])
  }
  function setAsMainPhoto(ev, filename) {
    ev.preventDefault();
    const addedPhotosWithoutSelected = addedPhotos.filter(photo => photo !== filename)
    const newAddedPhotos = [filename, ...addedPhotosWithoutSelected];
    setAddedPhotos(newAddedPhotos);
  }

  async function savePlace(ev) {
    ev.preventDefault();

    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price
    }

    if(id) {
        await axios.put("/places", {
            id,
            ...placeData
        });
    }
    else {
        await axios.post("/places", placeData);
    }
    setRedirect(true);
  }

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <div>
      <AccountNav />
      <form
        onSubmit={savePlace}
        className="w-[95%] mx-auto border border-gray-100 p-5 rounded-3xl shadow shadow-gray-500"
      >
        {preInput("Title", "Give a title to your place")}
        <input
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          type="text"
          placeholder="title, for e.g., My Place"
        />

        {preInput("Address", "Address of your place")}
        <input
          value={address}
          onChange={(ev) => setAddress(ev.target.value)}
          type="text"
          placeholder="address or location of your place"
        />

        {preInput("Photos", "Add photos for your place")}
        <div className="grid grid-cols-1 md:flex gap-2">
          <input
            value={photoLink}
            onChange={(ev) => setPhotoLink(ev.target.value)}
            className="md:w-[85%]"
            type="text"
            placeholder="add image url"
          />
          <button
            onClick={addPhotoByLink}
            className="bg-gray-300 hover:bg-gray-400 duration-300 md:w-[15%] my-1 rounded-xl px-3 py-2"
          >
            Add Photo
          </button>
        </div>
        
        <div className="mt-2 grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {addedPhotos.length > 0 &&
            addedPhotos.map((link) => (
              <div className="h-28 md:h-32 flex relative" key={link}>
                <img
                  className="rounded-2xl w-full object-cover"
                  src={IMAGE_BASE_URL + link}
                  alt=""
                />
               <button onClick={(ev) => removePhoto(ev, link)} className="cursor-pointer absolute bottom-1 right-1 p-1 text-white bg-black/50 transition-transform duration-300 ease-in-out hover:scale-120 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
               </button>
               <button onClick={(ev) => setAsMainPhoto(ev, link)} className="cursor-pointer absolute bottom-1 left-1 p-1 text-white bg-black/50 transition-transform duration-300 ease-in-out hover:scale-120 rounded-full">
                {link === addedPhotos[0] && (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                    </svg>
                )}
                {link !== addedPhotos[0] && (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                    </svg>
                )}
                
               </button>
              </div>
            ))}
          <label className="h-32 cursor-pointer flex gap-2 justify-center items-center bg-transparent hover:bg-gray-100 duration-300 border border-gray-300 px-10 py-8 rounded-2xl text-gray-500">
            <input
              type="file"
              multiple
              className="hidden"
              onChange={uploadPhoto}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
              />
            </svg>
            Upload
          </label>
        </div>

        {preInput("Description", "Give a discription for your place")}
        <textarea
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        ></textarea>

        {preInput("Perks", "Add perks for your place")}
        <Perks selected={perks} onChange={setPerks} />

        {preInput("Extra Info", "Some extra info for your place if you want")}
        <textarea
          value={extraInfo}
          onChange={(ev) => setExtraInfo(ev.target.value)}
        ></textarea>

        {preInput("Check in&out Timings and Pricing", "Add timings")}
        <div className="grid md:grid-cols-4 grid-cols-2 gap-2 text-center">
          <div>
            <h3 className="mt-2 -mb-1">Check in time</h3>
            <input
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
              type="text"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Check out time</h3>
            <input
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
              type="text"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Guest limit</h3>
            <input
              value={maxGuests}
              onChange={(ev) => setMaxGuests(ev.target.value)}
              type="text"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Price per night</h3>
            <input
              value={price}
              onChange={(ev) => setPrice(ev.target.value)}
              type="text"
            />
          </div>
        </div>
        <div>
          <button className="bg-primary hover:bg-primary-dark duration-300 text-white text-xl w-full rounded-xl p-3 mt-20 mb-5">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default PlacesFormPage;
