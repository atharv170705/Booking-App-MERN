import { Routes, Route } from "react-router-dom"
import IndexPage from "./pages/Index.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import Layout from "./Layout.jsx"
import RegisterPage from "./pages/RegisterPage.jsx"
import axios from "axios"
import { UserContextProvider } from './UserContext.jsx'
import AccountPage from "./pages/AccountPage.jsx"
import PlacesPage from "./pages/PlacesPage.jsx"
import PlacesFormPage from "./pages/PlacesFormPage.jsx"
import PlacePage from "./pages/PlacePage.jsx"
import BookingsPage from "./pages/BookingsPage.jsx"
import BookingPage from "./pages/BookingPage.jsx"

const BASE_URL = import.meta.env.VITE_BASE_URL

axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path="/" element = {<Layout/>}>
            <Route index element = {<IndexPage/>} />
            <Route path="/login" element = {<LoginPage/>} />
            <Route path="/register" element = {<RegisterPage/>} />
            <Route path="/account" element = {<AccountPage/>} />
            <Route path="/account/places" element = {<PlacesPage/>} />
            <Route path="/account/places/new" element = {<PlacesFormPage/>} />
            <Route path="/account/places/:id" element = {<PlacesFormPage/>} />
            <Route path="/place/:id" element = {<PlacePage/>} />
            <Route path="/account/bookings" element = {<BookingsPage/>} />
            <Route path="/account/bookings/:id" element = {<BookingPage/>} />
          </Route>
        </Routes>
      </UserContextProvider>
    </>
  )
}


export default App
