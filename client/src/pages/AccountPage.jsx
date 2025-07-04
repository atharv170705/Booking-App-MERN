import { useContext } from "react";
import { UserContext } from "../UserContext";
import { Navigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import PlacesPage from './PlacesPage'
import AccountNav from "../AccountNav";

function AccountPage() {
  const [redirect, setRedirect] = useState(false);  
  const { user, ready, setUser } = useContext(UserContext);
  let {subpage} = useParams();
  if(subpage === undefined) {
    subpage = 'profile';
  }

  async function logout() {
    axios.post('/logout');
    setRedirect(true);
    setUser(null);
  }

  if (!ready) {
    return "Loading....";
  }
  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  if(redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div>
      <AccountNav />
      {subpage === 'profile' && (
        <div className="text-center max-w-lg mx-auto">
            Logged in as {user.name} ({user.email})
            <br />
            <button onClick={logout} className="primary mt-2 max-w-sm">Logout</button>
        </div>
      )}
      {subpage === 'places' && (
        <PlacesPage/>
      )}
    </div>
  );
}

export default AccountPage;
