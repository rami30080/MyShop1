import { useHistory } from "react-router-dom";
import React from 'react';
import './Login.css';
import {
    Link
} from "react-router-dom";



function Login(props) {
   
    const history = useHistory();

    function handleLogin(e) {
        e.preventDefault();

        const { userEmailInp, userPswInp } = e.target.elements;
        const email = userEmailInp.value;
        const password = userPswInp.value;
        console.log(email)
        fetch('/api/login', {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                const { success } = data;
                if (success) {
                    const { info } = data;
                    if (info.role === 'Admin') {
                        history.push("/Admin")
                    }
            
                }

                else {
                    const { error } = data;
                    alert(error)

                }

            });
    }

    return (
      
        <div className='login-wrapper'>
             <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"></link>
            <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
            <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
            <div className="block"></div>
            <div className="login">
                <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@200;300;400;500;531;600;700;800&display=swap" rel="stylesheet"></link>
                <div className="sidenav">
                    <div className="login-main-text">
                        <h1 className="header">Welcome to Rami System - LOGIN</h1>
                     </div>
                     </div>
             

                <form id="loginForm" onSubmit={handleLogin} className="col-md-6 col-sm-12">
                    <label>Email Address:</label><input id="userEmail-Inp" name="userEmailInp" placeholder="Enter your Email Adress"></input><br></br>
                    <label>Password</label><input id="userPsw-Inp" type="password" name="userPswInp" placeholder="Enter your Password"></input>
                    <button type="submit" className="btn-black">LOGIN</button>
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

export default Login;

