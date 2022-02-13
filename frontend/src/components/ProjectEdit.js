import React from 'react';
import { useEffect, useState} from 'react';
import { useParams, useNavigate  } from 'react-router-dom';

const ProjectEdit = () => {
    
    let navigate = useNavigate ();
    // ######################################################### Up to here
    //project details as state

    let params = useParams();
    const [project, setProject]= useState({});
    const [updatedProject, setUpdatedProject] = useState({});
    const [imgFile, setImgFile] = useState(null);
    // const [name, setName] = useState({value: '', changed: false});
    // const [description, setDescription] = useState('');
    // const [cover_photo, setCover_photo] = useState('');
    // const [code_link, setCode_link] = useState('');
    // const [display_link, setDisplay_link] = useState('');
    // const [date_created, setDate_created] = useState('');
    // const [date_last_modified,setDate_last_modified] = useState('');
    // const [showcase, setShowcase] = useState(false);

    //effect to load details at page load
    
    const fetchProject = async (project_name) => {
        const fetchedProject = await fetch(`http://localhost:3001/api/project/${project_name}`);
        const initialProject = await fetchedProject.json();
        setProject(prevState => ({
            ...prevState,
            ...initialProject
        }));
        setUpdatedProject(prevState=>({
            ...prevState,
            name: initialProject.name
        }));
        // setName(project.name);
        // setDescription(project.description); 
        // setCover_photo(project.cover_photo);
        // setCode_link(project.code_link); 
        // setDisplay_link(project.display_link);  
        // setShowcase(project.showcase); 
    }
    
    useEffect(()=>{
        fetchProject(params.name);
    },[]);
    
    
    const handleChange = e => {
        // update the project and record changes in updated project
        const { name, value } = e.target;
        setProject(prevState => ({
            ...prevState,
            [name]: value
        }))
        setUpdatedProject(prevState=>({
            ...prevState,
            [name]: value
        }))
        
    }

    const handleChangeShowcase = e => {
        const { name, checked } = e.target;
        setProject(prevState => ({
            ...prevState,
            [name]: checked
        }))
        setUpdatedProject(prevState=>({
            ...prevState,
            [name]: checked
        }))
    }

    const handleChangeName = e => {

        setUpdatedProject(prevState => ({
            ...prevState,
            name: e.target.value 
        }))
    }

    const handleChangeImage = e => {
        const name = e.target.name;
        setImgFile(e.target.files[0]);
        setUpdatedProject(prevState => ({
            ...prevState,
            [name]: 'changed' 
        }));
    }
        


    const updateProject = async () =>{
        const myForm = new FormData();
        for (var key in updatedProject){
            myForm.append(key, updatedProject[key]);
        }
        if (imgFile != null){
            myForm.append("img_to_upload", imgFile);
        }
        const fetchedUpdateResponse = await fetch(`http://localhost:3001/api/update/${project.name}`,{
            method: 'POST',
            body: myForm
        })
        const updateResponse = await fetchedUpdateResponse.json();
        console.log(`update response is ${JSON.stringify(updateResponse)}`);
        if(updateResponse){
            navigate(`/project/edit/${updateResponse.name}`);
            setProject(updateResponse);
        }
        //catch unsucessful updates here
        // const projForm = document.getElementById("project-update-form");
        // projForm.action= `http://localhost:3001/api/update/${project.name}`;
        // projForm.enctype="multipart/form-data"; 
        // projForm.method="post";
        // projForm.submit();
    }

    return(
        <div className='project-edit-wrapper'>
            {/* build out form similar to the index page of server that is filled out with project details and can be changed */}
            <form id="project-update-form">
                <h3>Project Name: <input type="text" name='name' value={updatedProject.name} onChange={handleChangeName} /></h3>
                <h3>Description</h3><input type="text" name="description" value={project.description} onChange={handleChange} ></input>
                {/* ################################################### UP to here make image upload pass in update call */}
                <span><label>cover_photo</label><input type="file" name="img_to_upload" onChange={handleChangeImage}/></span>
                <span><label htmlFor="">current cover photo:</label><img className="project-image" src={`http://localhost:3001/api/photo/${project.cover_photo}`} alt=""/></span>
                <span><label htmlFor="">code link</label><input type="text" name="code_link" value={project.code_link} onChange={handleChange} /></span>
                <span><label htmlFor="">display_link</label><input name="display_link" type="text" value={project.display_link} onChange={handleChange}/></span>
                <span><label htmlFor="">date created: {project.date_created} </label></span>
                <span><label htmlFor="">date last modified: {project.date_last_modified}</label></span>
                <span><label htmlFor="">showcase: </label><input name="showcase" type="checkbox" checked={project.showcase} onClick={handleChangeShowcase} /></span>
                
            </form>
            <button onClick={updateProject}>Update</button>
        </div>
    )
}

export default ProjectEdit;