import mongoose from "mongoose";
import { Schema } from "mongoose";

const placeSchema = new Schema({
    owner : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    title : String,
    address : String,
    photos : [String],
    description : String,
    perks : [String],
    extraInfo : String,
    checkIn : Number,
    checkOut : Number,
    maxGuests : Number,
    price : Number
})

export const Place = mongoose.model('Place', placeSchema);