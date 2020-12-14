import { useHistory } from "react-router-dom";
import React from 'react';
import './ForgetPassword.css';
import {
    Link
} from "react-router-dom";



 function ForgetPassword(props) {

    const history = useHistory();

    function handleForgetPassword(e) {
        e.preventDefault();

        const { userEmailInp } = e.target.elements;
        const email = userEmailInp.value;

            fetch('/api/forgetPassword', {
                method: "POST",
                body: JSON.stringify({ email }),
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((data) => {
                     const { success } = data;
                    console.log(success)
                    if (success) {
                        return (history.push(`/CheckKey/${email}`))
                    }
                    else {
                        const { error } = data;
                        alert(error)
                    }
                });

    }

    return (
        <div className='forgetPassword-wrapper'>
            <div className="block"></div>
            <div className="forgetPassword">
                <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@200;300;400;500;531;600;700;800&display=swap" rel="stylesheet"></link>
                <h3 className="header">Welcome to Rami System</h3>
                <form id="forgetPasswordForm" onSubmit={handleForgetPassword} >
                    <input id="userEmail-Inp" name="userEmailInp" placeholder="Enter your Email Adress"></input>
                    <button type="submit">Submit</button>
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

export default ForgetPassword;

