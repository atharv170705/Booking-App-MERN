import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import { Link } from "react-router-dom";
const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

export default function IndexPage() {
    const [places, setPlaces] = useState([]);
    useEffect(() => {
        axios.get('/places').then(response => {
            setPlaces([...response.data]);
        })
    }, [])
    return (
        <div className="mt-10 gap-x-6 gap-y-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
            {places.length > 0 && places.map(place => (
            <Link to={'/place/' + place._id}>
                <div className="rounded-2xl mb-2 flex bg-gray-400">
                    {place.photos?.[0] && (
                       <img className="rounded-2xl hover:opacity-80 duration-200 aspect-square object-cover" src={IMAGE_BASE_URL + place.photos?.[0]} alt="bbbb" />
                    )}
                </div>
                <h2 className="font-medium text-sm">{place.address}</h2>
                <h3 className="text-xs text-gray-500">{place.title}</h3>
                <div className="text-sm mt-1">
                    <span className="font-bold">${place.price}</span> per night
                </div>
            </Link>
        ))}
        </div>
    )
}