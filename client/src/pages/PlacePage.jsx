import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import BookingWidget from '../BookingWidget';
const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

function PlacePage() {
  const {id} = useParams();  
  const [place, setPlace] = useState(null);
  const [showAll, setShowAll] = useState(false);
  useEffect(() => {
    if(!id) {
        return;
    }
    axios.get(`/places/${id}`).then(response => {
        setPlace(response.data);
    })
  }, [id]);

  if(!place) {
    return '';
  }

  if(showAll) {
    return (
        <div className='absolute inset-0 text-white min-h-screen'>
            <div className='grid gap-6 py-4 px-7 sm:gap-8 sm:py-8 sm:px-20 bg-black'>
                <div>
                    <h2 className="hidden md:inline text-2xl mr-48">Photos of {place.title}</h2>
                    <button onClick={() => setShowAll(false)} className='cursor-pointer fixed right-6 top-4 md:right-12 md:top-8 flex gap-1 py-2 px-3 rounded-2xl shadow shadow-black bg-white hover:bg-gray-300 duration-300 text-black scale-80 md:scale-100'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                        </svg>
                        Close photos
                    </button>
                </div>
                {place.photos?.length > 0 && place.photos.map(photo => (
                    <img className='w-full h-full rounded-xl object-cover' src={IMAGE_BASE_URL + photo} alt="" />
                ))}
            </div>
        </div>
    )
  }

  return (
    <div className='mt-8 bg-gray-100 -mx-10 -my-8 px-8 py-8'>
       <h1 className='text-3xl'>{place.title}</h1>
       <a className='flex gap-2 my-2 font-semibold underline' target="_blank" href={'https://maps.google.com/?q='+place.address}>
       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
        <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
       </svg>

       {place.address}
       </a>

        <div className='grid grid-cols-2 gap-1 my-10  overflow-hidden relative rounded-xl md:hidden'>
            <div className='col-span-2 row-span-1'>
                {place.photos?.[0] && (
                     <img className=' w-full h-full object-cover' src={IMAGE_BASE_URL + place.photos[0]} alt="" />
                )}
            </div>
            <div className='col-span-1 row-span-1'>
                {place.photos?.[1] && (
                    <img className='w-full h-full  object-cover' src={IMAGE_BASE_URL + place.photos[1]} alt="" />
                )}
            </div>
            <div className='col-span-1 row-span-1'>
                {place.photos?.[2] && (
                    <img className='w-full h-full  object-cover' src={IMAGE_BASE_URL + place.photos[2]} alt="" />
                )}
            </div>
            <button onClick={() => setShowAll(true)} className='cursor-pointer absolute flex gap-1 rounded-lg right-4 bottom-4 bg-white hover:bg-gray-200 duration-300 py-1 px-2 scale-80 text-sm font-semibold'> 
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                    <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clipRule="evenodd" />
                </svg>
                Show all
            </button>
       </div>

       <div className='hidden md:inline relative'>
            <div className='grid gap-2 grid-cols-4 grid-rows-2 h-[400px] mt-6 overflow-hidden rounded-2xl'>
                    <div className='flex col-span-2 row-span-2'>
                    {place.photos?.[0] && (
                        <img className='w-full h-full  object-cover' src={IMAGE_BASE_URL + place.photos[0]} alt="" />
                    )}
                    </div>
                    <div className='flex col-span-1 row-span-1'>
                    {place.photos?.[1] && (
                        <img className='w-full h-full  object-cover' src={IMAGE_BASE_URL + place.photos[1]} alt="" />
                    )}
                    </div>
                    <div className='flex col-span-1 row-span-1'>

                    {place.photos?.[2] && (
                            <img className='w-full h-full  object-cover' src={IMAGE_BASE_URL + place.photos[2]} alt="" />
                        )}
                    </div>
                    <div className='flex col-span-1 row-span-1'>

                    {place.photos?.[3] && (
                            <img className='w-full h-full  object-cover' src={IMAGE_BASE_URL + place.photos[3]} alt="" />
                        )}
                    </div>
                    <div className='flex col-span-1 row-span-1'>

                    {place.photos?.[4] && (
                            <img className='w-full h-full  object-cover' src={IMAGE_BASE_URL + place.photos[4]} alt="" />
                        )}
                    </div>
                    <button onClick={() => setShowAll(true)} className='cursor-pointer absolute flex gap-1 rounded-lg right-4 bottom-4 bg-white hover:bg-gray-200 duration-300 py-1 px-2 text-sm font-semibold'> 
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                            <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clipRule="evenodd" />
                        </svg>
                        Show all
                    </button>
            </div>
       </div>
        <div className='mt-8 mb-8 gap-10 grid grid-cols-1 lg:grid-cols-[2fr_1fr]'>
            <div>
                <div>
                    <h2 className='font-semibold mb-2 text-2xl'>Description</h2>
                    <p className=''>{place.description}</p>
                </div>
                <div className='mt-4'>
                    Check-in: {place.checkIn}<br />
                    Check-out: {place.checkOut}<br />
                    Max number of guests: {place.maxGuests}
                </div>
            </div>
            <div>
                <BookingWidget place={place}/>
            </div>
        </div>
        <div>
            <h2 className=' mb-2 text-2xl'>Extra info</h2>
            {place.extraInfo}
        </div>
    </div>
  )
}

export default PlacePage