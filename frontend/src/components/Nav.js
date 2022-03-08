import '../styles/Nav.css'
import React from 'react';


const Nav = () =>{
    return (
        <header className="banner">
            <img className='logo' src="" alt="Logo"/>
            <nav>
                <ul className='nav__links'>
                    <li>
                        <a href="#">About</a>
                    </li>
                    <li>
                        <a href="#">Projects</a>
                    </li>
                </ul>
            </nav>
            <a class="cta" hrefs='#'><button className="nav__button">Contact</button></a> 
        </header>
    );
}

export default Nav;