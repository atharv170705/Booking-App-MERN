import AccountNav from '../AccountNav'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios';
import { differenceInCalendarDays, format } from 'date-fns';
import { Link } from 'react-router-dom';
const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

function BookingsPage() {
  const [bookings, setBookings] = useState([]);  
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

  useEffect(() => {
    axios.get('/bookings').then((response) => {
        setBookings(response.data);
    })
  }, [])  
  return (
    <div>
        <AccountNav/>
        <div>
            {bookings?.length > 0 && bookings.map(booking => (
                <Link to={`/account/bookings/${booking._id}`} className="flex  gap-4 bg-gray-200 p-5 mb-5 rounded-2xl" >
                        <div className="flex w-37 h-37 bg-gray-400 rounded-xl shrink-0">
                            {booking.place.photos.length > 0 && (
                                <img className=" object-cover grow rounded-xl" src={IMAGE_BASE_URL + booking.place.photos[0]} alt="" />
                            )}
                        </div>
                        <div className=''>
                            <h2 className="text-lg md:text-2xl font-semibold mb-3">{booking.place.title}</h2>
                            <div className='hidden sm:flex flex-col gap-2'>
                               <p className='grid grid-cols-1 sm:flex gap-2 text-lg'>
                                {calenderIcon} {format(new Date(booking.checkIn), 'dd-MM-yyyy')}
                                {arrowIcon}
                                {calenderIcon} {format(new Date(booking.checkOut), 'dd-MM-yyyy')}
                                </p>
                               <p className='flex gap-2 text-lg'>
                                {nightIcon} {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} Nights</p>
                               <p className='flex gap-2 text-lg'>{creditCardIcon} ${differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn)) * booking.price}</p>
                            </div>
                        </div>
                </Link>
            ))}
        </div>
        
    </div>
  )
}

export default BookingsPage