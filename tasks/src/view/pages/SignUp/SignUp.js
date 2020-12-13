import { useHistory } from "react-router-dom";
import React from 'react';
import './SignUp.css';
import {
    Link
} from "react-router-dom";



function SignUp(props) {
   
    const history = useHistory();
    let error='';

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
                const { error } = data;
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
            <div className="block"></div>
            <div className="signUp">
                <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@200;300;400;500;531;600;700;800&display=swap" rel="stylesheet"></link>
                <h3 className="header">Welcome to Rami System</h3>
                <form id="signUpForm" onSubmit={handleSignUp} >
                    <input id="userEmail-Inp" name="userEmailInp" placeholder="Enter your Email Adress"></input>
                    <input id="userFname-Inp" name="userFnameInp" placeholder="Enter your First Name"></input>
                    <input id="userLname-Inp" name="userLnameInp" placeholder="Enter your Last Name"></input>
                    <input id="userPsw-Inp1" type="password" name="userPswInp1" placeholder="Enter your Password"></input>
                    <input id="userPsw-Inp2" type="password" name="userPswInp2" placeholder="re-Enter your Password"></input>
                    <select name="roleInp" id="roleInp">
                        <option  value="Admin">Mother</option>
                        <option value="User">Family Member</option>
                    </select>
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

