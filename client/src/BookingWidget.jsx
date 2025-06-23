import { useState } from 'react'
import { differenceInCalendarDays } from "date-fns";
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './UserContext';
import { useEffect } from 'react';

function BookingWidget({place}) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [bookingId, setBookingId] = useState('');
  const {user} = useContext(UserContext);

  useEffect(() => {
    if(user) {
        setName(user.name);
    }
  }, [user])

  let numberOfNights = 0;

  if(checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
  }

  async function bookThisPlace() {
    const data = {
        place: place._id,
        checkIn, 
        checkOut, 
        numberOfGuests, 
        name, 
        phone, 
        price: numberOfNights * place.price
    };

   const response =  await axios.post('/bookings', data);
   setBookingId(response.data._id);
   setRedirect(true);
  }

  if(redirect) {
    return (
        <Navigate to={`/account/bookings/${bookingId}`} />
    )
  }

  return (
    <div className='bg-white shadow p-4 mt-8 rounded-2xl'>
                <h2 className='text-center text-2xl'>Price: ${place.price} per night</h2>
                <div className='border border-gray-300 rounded-2xl mt-4'>
                    <div className='grid grid-cols-1 md:flex'>
                        <div className='py-3 px-4 md:w-1/2'>
                            <label>Check in: </label>
                            <input value={checkIn} onChange={(ev) => setCheckIn(ev.target.value)} type="date"/>
                        </div>
                        <div className='py-3 px-4 md:w-1/2 border-t md:border-l border-gray-300'>
                            <label>Check out: </label>
                            <input value={checkOut} onChange={(ev) => setCheckOut(ev.target.value)} type="date"/>
                        </div>
                    </div>
                    <div className='px-4 py-3 border-t border-gray-300'>
                        <label>Number of guests: </label>
                        <input value={numberOfGuests} onChange={(ev) => setNumberOfGuests(ev.target.value)} type="text" />
                    </div>
                    {numberOfNights > 0 && (
                        <div className='px-4 py-3 border-t border-gray-300'>
                            <label>Full name: </label>
                            <input value={name} onChange={(ev) => setName(ev.target.value)} type="text" />
                            <label>Phone no. </label>
                            <input value={phone} onChange={(ev) => setPhone(ev.target.value)} type="text" />
                        </div>
                    )}
                </div>
                <div className='mt-5'>
                    <button onClick={bookThisPlace} className="primary bottom-0">Book now</button>
                </div>
                <div className='mt-2 text-center'>
                    {numberOfNights > 0 && (
                        <span className='text-lg'>Book for: ${numberOfNights * place.price}</span>
                    )}
                </div>
            </div>
  )
}

export default BookingWidget