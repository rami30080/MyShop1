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
        <div className='login-wrapper'>
            <div className="block"></div>
            <div className="login">
                <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@200;300;400;500;531;600;700;800&display=swap" rel="stylesheet"></link>
                <h3 className="header">Welcome to Rami System</h3>
                <form id="loginForm" >
                    <input id="userEmail-Inp" name="userEmailInp" placeholder="Enter your Email Adress"></input>
                    <input id="userPsw-Inp" type="password" name="userPswInp" placeholder="Enter your Password"></input>
                    <button type="submit">LOGIN</button>
                </form>
                <div className="service">
                    <div className="forgetArea">
                        <Link className="forgetPassword" to="/forgotPassword">Forgot Password?</Link>
                    </div>
                    <div className="CreateUserArea">
                        <Link className="createUser" to="/SignUp">SignUp</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admin;

