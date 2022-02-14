import { useEffect, useState } from 'react';
import axios from 'axios';

const useProjects = (pageNumber) =>{

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [projects, setProjects] = useState([]);
    const [hasMore, setHasMore] = useState(false);

    useEffect(async ()=>{
        setLoading(true);
        setError(false);

        const res = await fetch(`http://localhost:3001/api/projects/${pageNumber}`);
        const resData = await res.json();
        setProjects(prevState => {
            return [
            ...prevState,
            ...resData.projects
            ]
        });
        setHasMore(resData.projects.length > 0);
        setLoading(false);
        console.log(resData);
    }, [pageNumber])

    return { loading, projects, hasMore }
}
export default useProjects

// Custom hook 
//     to implement a custom hook use the useEffect hook.
//      the useEffect hook can be used to run code when ever the parameters change
//      in this case the pageNumber
//     use state inside the hook and expose it to the outside via return