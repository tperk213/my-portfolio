import React from 'react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import useProjects from '../hooks/useProjects'

const Projects = () =>{

    const [pageNumber, setPageNumber] = useState(1);

    const {
        loading,
        hasMore,
        projects
    } = useProjects(pageNumber);

    const observer = useRef()
    const lastProjectElementRef = useCallback(node => {
        if(loading) return;
        if(observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting && hasMore){
                console.log('Vissible');
                setPageNumber(prevPageNumber => prevPageNumber + 1);
            }
        });
        if(node) observer.current.observe(node);
    }, [loading, hasMore]);

    return(
        <div className='projects-wrapper'>
            <h2>Projects</h2>
            <div className="projects-grid">
                {projects.map((project, index) => {
                    if(projects.length === index+1){
                        return(<div ref={lastProjectElementRef} key={project.name}>
                            <Link to={`/project/${project.name}`} >
                                {project.name}
                                <img className="project-image" src={`http://localhost:3001/api/photo/${project.cover_photo}`} alt=""/>
                            </Link>
                        </div>);
                    }else{
                        return(
                            <div key={project.name}>
                                <Link to={`/project/${project.name}`} >
                                    {project.name}
                                    <img className="project-image" src={`http://localhost:3001/api/photo/${project.cover_photo}`} alt=""/>
                                </Link>
                            </div>
                        );
                    }
                })}
                <div>{loading && 'Loading...'}</div>
            </div>    
        </div>
    );
}

export default Projects;
// requirments
// queries database and shows 10 projects
// has more button to load more projects
// has search bar at top to search for name
