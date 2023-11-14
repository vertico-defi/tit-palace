import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
// import { Link, useLocation, useNavigate } from 'react-router-dom';
import * as fcl from "@onflow/fcl";
import './header.css';
import logo from '../../assets/photos/nastyGirlsLogo.png';

export default function Navigation() {
    const [user, setUser] = useState({ loggedIn: false, addr: null });

    
  useEffect(() => {
    const unsubscribe = fcl.currentUser().subscribe((user) => {
      setUser({
        loggedIn: user.loggedIn,
        addr: user.addr,
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const logout = () => {
    fcl.unauthenticate();
  };

  return (
    <header className="header">
        <div className="header-top">
            <Link to="/">
              <img src={logo} alt="Logo" className="logo" />
            </Link>
        </div>
        <nav className="navigation">
            <Link to="/teasers" className="nav-link">Teasers</Link>
            <Link to="/shop" className="nav-link">Shop</Link>
        </nav>
        <div className="sign-in">
            {user.loggedIn ? (
                <>
                    <p className="address-text">{user.addr}</p>
                    <button className="button" onClick={() => logout()}>Sign Out</button>
                </>
                ) : (
                    <button className="button" onClick={() => {fcl.logIn();}}>Sign In</button>
                )
            }
        </div>
    </header>
  )


}
 

