import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
    return (
        <div className="px-4 py-3 md:px-10 md:py-8 min-h-screen flex flex-col"> 
            <Header/>
            <Outlet/>
        </div>
    )
}