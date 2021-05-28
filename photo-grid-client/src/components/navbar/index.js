import React from "react";
import './index.css';

const NavBar = ({email, logout}) => {

  if(email){
    return (
      <div className="topnav">
          <button type="button" className="btn disabled">Logged In: {email}</button>
          <button type="button" className="btn btn-link" onClick={logout}>Logout</button>
      </div>
    );
  } else {
    return null;
  }
  
};

export default NavBar;
