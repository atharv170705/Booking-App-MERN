import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AccountNav from "../AccountNav";
import { useEffect } from "react";
const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

function PlacesPage() {
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        axios.get('/user-places').then(({data}) => {
        setPlaces(data);
        })
    }, [])

  return (
    <div>
        <AccountNav/>
        <div className="text-center">
        <Link
            to={"/account/places/new"}
            className="inline-flex gap-1 bg-primary hover:bg-primary-dark duration-300 rounded-full text-white py-2 px-4"
        >
            <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
            >
            <path
                fillRule="evenodd"
                d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                clipRule="evenodd"
            />
            </svg>
            Add new place
        </Link>
        </div>
        <div className=" mt-4 mx-2 md:mx-10">
            {places.length > 0 && places.map(place => (
                <Link to={'/account/places/' + place._id} className="flex cursor-pointer gap-4 bg-gray-200 p-5 mb-5 rounded-2xl" >
                    <div className="flex w-30 h-30 md:w-37 md:h-37 bg-gray-400 rounded-xl shrink-0">
                        {place.photos.length > 0 && (
                            <img className="object-cover grow rounded-xl" src={IMAGE_BASE_URL + place.photos[0]} alt="" />
                        )}
                    </div>
                    <div>
                        <h2 className="text-lg md:text-2xl">{place.title}</h2>
                        <p className="hidden sm:inline text-md mt-2">{place.description}</p>
                    </div>
                </Link>
            ))}
        </div>
    </div>
  );
}

export default PlacesPage;
