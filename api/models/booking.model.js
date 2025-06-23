import mongoose from "mongoose";
import { Schema } from "mongoose";

const bookingSchema = new Schema({
    place: {
        type : Schema.Types.ObjectId,
        required: true,
        ref : 'Place'
    },
    user: {
        type:mongoose.Schema.Types.ObjectId, 
        required:true,
        ref : 'User'
    },
    checkIn: {
        type:Date,
        required:true
    },
    checkOut: {type:Date, 
        required:true
    },
    name: {
        type:String, 
        required:true
    },
    phone: {
        type:String, 
        required:true
    },
    price: Number,
})

export const Booking = mongoose.model('Booking', bookingSchema);