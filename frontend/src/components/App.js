import '../styles/App.css'
import React from 'react';
import Nav from './Nav.js';
import Showcase from './Showcase.js';

const App = () => {
    return(
    <div className="app-wrapper">
        <Nav />
        <div className="app-body">
            
            <Showcase />
            <h1>Hello</h1>
        </div>
    </div>
    );
}

export default App;