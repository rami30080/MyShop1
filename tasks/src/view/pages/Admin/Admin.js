import { useHistory } from "react-router-dom";
import React,{useEffect,useState} from 'react';
import './Admin.css';
import UserRow from './UserRow';




function Admin(props) {

    const history = useHistory();
        const [tasks, setTasks] = useState([]);
    const [acivePage, setAcivePage] = useState(false)


    //-------------------------------------

    
    useEffect(() => {
        let groupID=80128623;
        fetch('/api/getTasks', {
            method: "POST",
            body: JSON.stringify({ groupID}),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.success == true) {
                    setTasks(data.info);
                }
                else {
                    alert(data.error)
                }
            })
    }, []);
    

    return (
        <div className='page-wrapper'>
            <div className=''>
            {tasks.map(task => <UserRow setTasks={setTasks} task={task}/>)}
            </div>
        </div>
    )
}

export default Admin;

