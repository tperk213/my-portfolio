import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProjectDetails = () => {
    
    let params = useParams();
    const [project, setProject] = useState({});

    useEffect(()=>{
        fetchProject();
    }, []);
    
    const fetchProject = async () => {
        const fetchedProject = await fetch(`http://localhost:3001/api/project/${params.name}`);
        const project = await fetchedProject.json();
        setProject(project);
    }
    
    
    return(
        <div className="projectDetails-wrapper">
            <h3>Project Name: {project.name}</h3>
            <img className="project-image" src={`http://localhost:3001/api/photo/${project.cover_photo}`} alt=""/>
        </div>
    )
}


export default ProjectDetails;