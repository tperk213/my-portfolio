import React from 'react';
import Projects from './Projects';
import Showcase from './Showcase';

const Home = () => {
    
    return(
        <div className='home-wrapper'>
            <Showcase />
            <Projects />
        </div>
    )
}

export default Home;