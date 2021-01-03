import { useHistory } from "react-router-dom";
import React from 'react';
import './Admin.css';
import {
    Link
} from "react-router-dom";



function Admin(props) {
   
    const history = useHistory();

    // function handleLogin(e) {
    //     e.preventDefault();

    //     const { userEmailInp, userPswInp } = e.target.elements;
    //     const email = userEmailInp.value;
    //     const password = userPswInp.value;
    //     console.log(email)
    //     fetch('/api/login', {
    //         method: "POST",
    //         body: JSON.stringify({ email, password }),
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //     })
    //         .then((res) => res.json())
    //         .then((data) => {
    //             const { success } = data;
    //             if (success) {
    //                 const { info } = data;
    //                 if (info.role === 'Admin') {
    //                     history.push("/Admin")
    //                 }
            
    //             }

    //             else {
    //                 const { error } = data;
    //                 alert(error)

    //             }

    //         });
    // }

    return (
        <div className='page-wrapper'>
            <div className=''>
                
            </div>
        </div>
    )
}

export default Admin;

