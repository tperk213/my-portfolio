import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../styles/Showcase.css'

const Showcase = () => {
    
    const [showcase, setShowcase] = useState({});
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(2);
    const [showcaseLength, setLength] = useState(0);
    //get the projects from backend
    let projDetails = useParams();
    useEffect(()=>{
        fetchShowcase();
    }, [startIndex, endIndex]);

    useEffect(()=>{
        fetchLength();
    }, []);


    //function to get the item and asign it to state property
    const fetchLength = async () => {
        const fetchLength = await fetch(`http://localhost:3001/api/showcase/length`);
        const length = await fetchLength.json();

        setLength(length.length);
    }

    const fetchShowcase = async () =>{
        const fetchShowcase = await fetch(`http://localhost:3001/api/showcase/${startIndex}/${endIndex}`);
        const showcase = await fetchShowcase.json();

        console.log(`showcase has been fetched ${showcase}`);

        setShowcase(showcase);
    } 
    
    const indexInc = () => {
        //check for endIndex less then list length
        if (endIndex >= showcaseLength -1) return;
        setStartIndex(startIndex + 1);
        setEndIndex(endIndex + 1); 
    };

    const indexDec = () =>{
        //check for startIndex greater then 0
        if(startIndex <= 0) return;
        setStartIndex(startIndex - 1);
        setEndIndex(endIndex - 1);
    }

    return(
        <div className="showcase-wrapper">
            {/* 3-4 projects that have pictures as links maybe description short */}
            <h1>Showcase</h1>
            {/* loop through projects that are returned in the get showcase and display their title, picture and description */}
            <div className="showcase-grid">
                <button className="showcase-control" onClick={indexDec}  >&lt;</button>
                {Object.entries(showcase).map(project => (
                    <div className="showcase-pannel">
                        <Link to={`/project/${project[1].name}`}>
                            {project[1].name}
                            <img className="showcase-image" src={`http://localhost:3001/api/photo/${project[1].cover_photo}`} alt=""/>
                        </Link>
                    </div>
                ))}
                <button className="showcase-control" onClick={indexInc}>&gt;</button>
            </div>
        </div>
    );
}

export default Showcase;



// carosel thing
// have fecth showcase load projects from a start to end param
// store these in projects list
// on initial load get 3
// on right press check if end index is larger the total projects and current projects
//          fetch next project and add to list if needed
//          update currently displayed projects
// on left press do similar//      
// update the currently displayed projects
//