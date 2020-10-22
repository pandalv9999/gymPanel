import React, {useState} from "react";
import './style/RegisterForm.css'

const RegisterFrom = ({setRegistering}) => {

    const [errMsg, setErrMsg] = useState("");

    const register = () => {

    };

    return (
        <div>
            <h2 className={"title-form"}>Create Account</h2>
            <form action="/create-data" method="POST" className={"register-form"}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" name="username" id="username"/>
                </div>
                <div className="form-group">
                    <label htmlFor="firstName">First Name:</label>
                    <input type="text" className="form-control" name="firstName" id="firstName"/>
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name:</label>
                    <input type="text" className="form-control" name="lastName" id="lastName"/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="text" className="form-control" name="email" id="email"/>
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone:</label>
                    <input type="text" className="form-control" name="phone" id="phone"/>
                </div>
                <div className="form-group">
                    <label htmlFor="DOB">DOB(MM-DD-YYYY):</label>
                    <input type="text" className="form-control" name="DOB" id="DOB"/>
                </div>
                <div className="form-group">
                    <label htmlFor="gender">Gender:</label>
                    <select id="gender" className="form-control" name="gender">
                        <option selected value="Select">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="weight">Weight:</label>
                    <input type="text" className="form-control" name="weight" id="weight"/>
                </div>
                <div className="form-group">
                    <label htmlFor="height">Height:</label>
                    <input type="text" className="form-control" name="height" id="height"/>
                </div>
                <button className="btn btn-primary">Create</button>
                <button className="btn btn-primary" id={"back-button"} onClick={() => setRegistering(false)}>Login</button>
            </form>
            <p>{errMsg}</p>
        </div>
    )
};

export default RegisterFrom;