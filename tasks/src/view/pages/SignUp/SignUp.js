//import { useHistory } from "react-router-dom";
import React from 'react';
import './SignUp.css';
import {
    Link
} from "react-router-dom";



function SignUp(props) {
   

    function handleSignUp(e) {
        e.preventDefault();

        const { userEmailInp, userPswInp1,userPswInp2,userFnameInp,userLnameInp,roleInp } = e.target.elements;
        const email = userEmailInp.value;
        const password = userPswInp1.value;
        const password2 = userPswInp2.value;
        const fname = userFnameInp.value;
        const lname = userLnameInp.value;
        const role = roleInp.value;
        
        if(!password.localeCompare(password2))
        {
        fetch('/api/SignUp', {
            method: "POST",
            body: JSON.stringify({ email,password,fname,lname,role}),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                const { success } = data;
                if (success) {

                }

                else {
                    const { error } = data;
                    alert(error)

                }

            });
        }else{
            alert("Passwords does not match")
        }

    }

    return (
        <div className='signUp-wrapper'>
             <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"></link>
            <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
            <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
            <div className="block"></div>
            <div className="signUp">
                <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@200;300;400;500;531;600;700;800&display=swap" rel="stylesheet"></link>
                <h3 className="header">Welcome to Rami System</h3>
                <form id="signUpForm" onSubmit={handleSignUp} >
                   <label>Email Address:</label><input id="userEmail-Inp" name="userEmailInp" placeholder="Enter your Email Adress"></input><br></br>
                    <label>First Name:</label><input id="userFname-Inp" name="userFnameInp" placeholder="Enter your First Name"></input><br></br>
                    <label>Last Name:</label><input id="userLname-Inp" name="userLnameInp" placeholder="Enter your Last Name"></input><br></br>
                    <label>Password:</label><input id="userPsw-Inp1" type="password" name="userPswInp1" placeholder="Enter your Password"></input><br></br>
                    <label>Re enter your Password:</label><input id="userPsw-Inp2" type="password" name="userPswInp2" placeholder="re-Enter your Password"></input><br></br>
                    <label>Role:</label><select name="roleInp" id="roleInp">
                        <option  value="Admin">Mother</option>
                        <option value="User">Family Member</option>
                    </select><br></br>
                    <button type="submit">Sign Up</button>
                </form>
                <div className="service">
                    <div className="HomeArea">
                        <Link className="returnHome" to="/">Return Home</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp;

