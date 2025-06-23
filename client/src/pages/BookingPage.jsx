import axios from 'axios';
import { format, differenceInCalendarDays } from 'date-fns';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom'
const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

function BookingPage() {
    const calenderIcon = (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="hidden md:inline size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
    </svg>);

  const arrowIcon = (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                    <path fillRule="evenodd" d="M16.72 7.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H3a.75.75 0 0 1 0-1.5h16.19l-2.47-2.47a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                </svg>);  
  const nightIcon = (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
</svg>
);              
    
  const creditCardIcon = (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
</svg>
    );                             


  const {id} = useParams();
  const [booking, setBooking] = useState(null)
  const [showAll, setShowAll] = useState(false);
  useEffect(() => {
    if(!id) {
        return;
    }
    axios.get('/bookings').then((response) => {
        const foundBooking = response.data.find(({_id}) => _id === id)
        if(foundBooking) {
            setBooking(foundBooking);
        }
    })
  }, [id])  
  if(!booking) {
    return '';
  }

  if(showAll) {
    return (
        <div className='absolute inset-0 text-white min-h-screen'>
            <div className='grid gap-6 py-4 px-7 sm:gap-8 sm:py-8 sm:px-20 bg-black'>
                <div>
                    <h2 className="hidden md:inline text-2xl mr-48">Photos of {booking.place.title}</h2>
                    <button onClick={() => setShowAll(false)} className='cursor-pointer fixed right-6 top-4 md:right-12 md:top-8 flex gap-1 py-2 px-3 rounded-2xl shadow shadow-black bg-white hover:bg-gray-300 duration-300 text-black scale-80 md:scale-100'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                        </svg>
                        Close photos
                    </button>
                </div>
                {booking.place.photos?.length > 0 && booking.place.photos.map(photo => (
                    <img className='w-full h-full rounded-xl object-cover' src={IMAGE_BASE_URL + photo} alt="" />
                ))}
            </div>
        </div>
    )
  }

  return (
    <div className='mt-8 bg-gray-100 -mx-10 -my-8 px-8 py-8'>
        <h1 className='text-3xl'>{booking.place.title}</h1>
       <a className='flex gap-2 my-2 font-semibold underline' target="_blank" href={'https://maps.google.com/?q='+booking.place.address}>
       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
        <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
       </svg>
       {booking.place.address}
       </a>

       <div className=' bg-gray-300 py-3 px-4 my-8 rounded-2xl grid grid-cols-1 gap-3 md:flex justify-between items-center'>
            <div className='flex flex-col gap-3 mx-auto md:mx-0'>
                <h2 className='text-2xl font-semibold'>Your booking information</h2>
                <p className='flex gap-2 text-lg mx-auto md:mx-0'>
                {calenderIcon} {format(new Date(booking.checkIn), 'dd-MM-yyyy')}
                {arrowIcon}
                {calenderIcon} {format(new Date(booking.checkOut), 'dd-MM-yyyy')}
                </p>
                <p className='flex gap-2 text-lg mx-auto md:mx-0 sm:hidden'>
                    {nightIcon} {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} Nights</p>
                <p className='flex gap-2 text-lg mx-auto md:mx-0 sm:hidden'>{creditCardIcon} ${differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn)) * booking.price}</p>
            </div>
            <div className='bg-primary p-2 md:p-3 text-xl md:text-2xl text-white rounded-2xl text-center flex justify-center gap-2  md:block'>
                <h3 className='block'>Total Price</h3>
                <p>${differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn)) * booking.price}</p>
            </div>
       </div>

       <div className='grid grid-cols-2 gap-1 my-10 overflow-hidden relative rounded-xl md:hidden'>
            <div className='col-span-2 row-span-1'>
                {booking.place.photos?.[0] && (
                     <img className='w-full h-full  object-cover' src={IMAGE_BASE_URL + booking.place.photos[0]} alt="" />
                )}
            </div>
            <div className='col-span-1 row-span-1'>
                {booking.place.photos?.[1] && (
                    <img className='w-full h-full  object-cover' src={IMAGE_BASE_URL + booking.place.photos[1]} alt="" />
                )}
            </div>
            <div className='col-span-1 row-span-1'>
                {booking.place.photos?.[2] && (
                    <img className='w-full h-full  object-cover' src={IMAGE_BASE_URL + booking.place.photos[2]} alt="" />
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
                    {booking.place.photos?.[0] && (
                        <img className='w-full h-full  object-cover' src={IMAGE_BASE_URL + booking.place.photos[0]} alt="" />
                    )}
                    </div>
                    <div className='flex col-span-1 row-span-1'>
                    {booking.place.photos?.[1] && (
                        <img className='w-full h-full  object-cover' src={IMAGE_BASE_URL + booking.place.photos[1]} alt="" />
                    )}
                    </div>
                    <div className='flex col-span-1 row-span-1'>

                    {booking.place.photos?.[2] && (
                            <img className='w-full h-full  object-cover' src={IMAGE_BASE_URL + booking.place.photos[2]} alt="" />
                        )}
                    </div>
                    <div className='flex col-span-1 row-span-1'>

                    {booking.place.photos?.[3] && (
                            <img className='w-full h-full  object-cover' src={IMAGE_BASE_URL + booking.place.photos[3]} alt="" />
                        )}
                    </div>
                    <div className='flex col-span-1 row-span-1'>

                    {booking.place.photos?.[4] && (
                            <img className='w-full h-full  object-cover' src={IMAGE_BASE_URL + booking.place.photos[4]} alt="" />
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
    </div>
  )
}

export default BookingPage