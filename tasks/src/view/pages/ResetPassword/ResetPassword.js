import { useHistory,useParams } from "react-router-dom";
import React from 'react';
import './ResetPassword.css';
import {
    Link
} from "react-router-dom";



 function ResetPassword(props) {

    const history = useHistory();
    const { email } = useParams();

    function handleResetPassword(e) {
        e.preventDefault();
        const { passInp1,passInp2 } = e.target.elements;
        const password = passInp1.value;
        const password2 = passInp2.value;
        if(!password.localeCompare(password2))
        {
            fetch('/api/updatePassword', {
                method: "PUT",
                body: JSON.stringify({ email,password }),
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    const { success } = data;
                    if (success) {
                        alert("Password changed")
                    }
                    else {
                        const { error } = data;
                        alert(error)
                    }
                });
            }else{
                alert("Passwords Does Not Match")
            }

    }

    return (
        <div className='resetPassword-wrapper'>
            <div className="block"></div>
            <div className="resetPassword">
                <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@200;300;400;500;531;600;700;800&display=swap" rel="stylesheet"></link>
                <h3 className="header">Welcome to Rami System</h3>
                <form id="resetPasswordForm" onSubmit={handleResetPassword} >
                    <input id="passInp1" name="passInp1" type="password" placeholder="enter new password"></input>
                    <input id="passInp2" name="passInp2" type="password" placeholder="confirm password"></input>
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

export default ResetPassword;

