import { useHistory } from "react-router-dom";
import React from 'react';
import './ResetPassword.css';
import {
    Link
} from "react-router-dom";



 function ResetPassword(props) {

    const history = useHistory();

    function handleResetPassword(e) {
        e.preventDefault();

        const { keyInp } = e.target.elements;
        const key = keyInp.value;

            fetch('/api/forgetPassword', {
                method: "POST",
                body: JSON.stringify({ key }),
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    const { success } = data;
                    if (success) {
                        //history.push("/resetPassword")
                    }
                    else {
                        const { error } = data;
                        alert(error)
                    }
                });

    }

    return (
        <div className='resetPassword-wrapper'>
            <div className="block"></div>
            <div className="resetPassword">
                <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@200;300;400;500;531;600;700;800&display=swap" rel="stylesheet"></link>
                <h3 className="header">Welcome to Rami System</h3>
                <form id="resetPasswordForm" onSubmit={handleResetPassword} >
                    <input id="keyInp" name="keyInp" placeholder="Enter Key"></input>
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

export default ResetPassword;

