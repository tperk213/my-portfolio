import '../styles/Nav.css'
import React from 'react';


const Nav = () =>{
    return (
        <div className="nav-wrapper">
            
            <div className="nav-logo">
                <h3>Logo</h3>
            </div>
            <div className="nav-links">
                <h3>About</h3>
                <h3>Projects</h3>
            </div>
        </div>
    );
}

export default Nav;