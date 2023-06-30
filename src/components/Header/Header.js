import React from "react";
import {AiOutlineHome} from "react-icons/ai";
import {BsGlobe} from "react-icons/bs";
import './header-style.css'
import {CgProfile} from "react-icons/cg";
function Header () {
    return(
        <>
            <nav className="navbar bg-light">
                <div className="container d-flex justify-content-around">
                    <a className="navbar-brand" href="#">Vector</a>

                    <button className='bg-light home-btn' title='home'><AiOutlineHome className='home'/></button>
                    <input className='input-nav' type="text" placeholder='Search'/>
                    <button className='profile-btn bg-light'><CgProfile className='profile'/></button>
                    <button className='globe-btn bg-light' title='lang'><BsGlobe className='globe'/></button>
                </div>
            </nav>
        </>
    );
}
export default Header;