import '../styles/App.css'
import '../styles/crayons.css'
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
//components
import Nav from './Nav.js';
import Creator from './Creator.js';
import Showcase from './Showcase.js';
import Projects from './Projects.js';
import Home from './Home.js'
import ProjectDetails from './ProjectDetails.js'
import ProjectEdit from './ProjectEdit.js'
import { useEffect } from 'react';


const App = () => {

    const location = useLocation();

    useEffect(()=>{
        goToTop();
    }, [location.pathname])

    const goToTop = () => {
        document.documentElement.scrollTop = 0; 
    }
    return(
    
    <div>
        <Nav />
        <Creator />
        <div className='app-body'>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/project/:name" element={<ProjectDetails />} />
                <Route path="/project/edit/:name" element={<ProjectEdit />}/>
            </Routes>
        </div>
    </div>
    
    );
}

export default App;