import { useHistory } from "react-router-dom";
import React,{useEffect,useState} from 'react';
import './Admin.css';




function Admin(props) {

    const history = useHistory();
        const [users, setUsers] = useState([]);
    const [acivePage, setAcivePage] = useState(false)


    //-------------------------------------

    
    useEffect(() => {
        fetch('/api/getTasks')
            .then(res => res.json())
            .then(data => {
                if (data.success == true) {
                    setUsers(data.info.tasks);
                }
                else {
                    alert(data.error)
                }
            })
    }, []);
    

    return (
        <div className='page-wrapper'>
            <div className=''>

            </div>
        </div>
    )
}

export default Admin;

