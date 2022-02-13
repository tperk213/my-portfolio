import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Projects = () =>{

    const [projects, setProjects] = useState([]);
    const [currentIndex, setIndex] = useState(0);
    const [totalAmmountOfProjects, setLength] = useState(0);
    const ammountToFetch = 2;

    
    useEffect(() => {
        fetchProjects();
    }, []);
    
    useEffect(() => {
        fetchLength();
    }, []);
    
    
    const fetchLength = async () => {
        const fetchLength = await fetch(`http://localhost:3001/api/showcase/length`);
        const length = await fetchLength.json();

        setLength(length.length);
    }

    const fetchProjects = async () => {
        const rawProjects = await fetch(`http://localhost:3001/api/projects/${currentIndex}/${ammountToFetch}`);
        const projects = await rawProjects.json();
        setIndex(currentIndex + projects.length);
        setProjects(currentProjects => [ ...currentProjects, ...projects]);
    }

    const loadMoreProjects = () => {
        if(currentIndex === totalAmmountOfProjects) return;
        if ((currentIndex + ammountToFetch) > totalAmmountOfProjects){
            setIndex(totalAmmountOfProjects);
        }
        setIndex(currentIndex + ammountToFetch);
        fetchProjects();
    }

    return(
        <div className='projects-wrapper'>
            <h2>Projects</h2>
            <div className="projects-grid">
                {projects.map(project => (
                    <div>
                        <Link to={`/project/${project.name}`} >
                            {project.name}
                            <img className="project-image" src={`http://localhost:3001/api/photo/${project.cover_photo}`} alt=""/>
                        </Link>
                    </div>
                ))}
                <button onClick={loadMoreProjects}>More...</button>
            </div>    
        </div>
    );
}

export default Projects;
// requirments
// queries database and shows 10 projects
// has more button to load more projects
// has search bar at top to search for name
