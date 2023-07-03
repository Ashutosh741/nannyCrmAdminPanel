


import React, { useContext, useState } from "react";
import "../../assets/css/login.css";
import { Link, useNavigate } from 'react-router-dom';
import authLayout from "../../hoc/authLayout";

import { Button, Form, FormGroup } from "react-bootstrap";
import { URL } from "../../Url";


const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleClick = (e) => {
        e.preventDefault();

        // Make the API request to login
        fetch(`${URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })
        .then(response => {
            if (response.ok) {
                // Handle successful login
                navigate("/dashboard"); // Redirect to the dashboard page
            } else {
                // Handle login error
                alert("Login failed. Please check your credentials.");
            }
        })
        .catch(error => {
            console.error("Login error:", error);
            alert("An error occurred while trying to login. Please try again later.");
        });
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        if (id === "email") {
            setEmail(value);
        } else if (id === "password") {
            setPassword(value);
        }
    };


    // const handleShow = (e) => {
    //     e.preventDefault()
    //     setShowPass(!showPassword);
    // };
    
    const handleShow = (e) => {
        e.preventDefault()
        setShowPassword(!showPassword);
      };
      
      
    


    return (
        <>
            

                {/* <form className="login-form" onSubmit={handleLogin}>
                <div className="d-flex align-items-center my-4">
                    <h1 className="text-center fw-normal mb-0 me-3">Sign In</h1>
                </div>

                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form3Example3">
                        Email address
                    </label>
                    <input
                        type="email"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        id="form3Example3"
                        className="form-control form-control-lg"
                        placeholder="Enter a valid email address"
                    />
                </div>

                <div className="form-outline mb-3">
                    <label className="form-label" htmlFor="form3Example4">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        id="form3Example4"
                        className="form-control form-control-lg"
                        placeholder="Enter password"
                    />
                </div>

                <div className="d-flex justify-content-between align-items-center">

                    <div className="form-check mb-0">
                        <input
                            className="form-check-input me-2"
                            type="checkbox"
                            value=""
                            id="form2Example3"
                        />
                        <label className="form-check-label" htmlFor="form2Example3">
                            Remember me
                        </label>
                    </div>
                    <Link to="/reset-password" className="text-body">
                        Forgot password?
                    </Link>
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                    <Link type="button" className="btn btn-primary btn-lg">
                        Login
                    </Link>
                    <p className="small fw-bold mt-2 pt-1 mb-0">
                        Don't have an account? <a href="#!" className="link-danger">Register</a>
                    </p>
                </div>
            </form>  */}


            <Form onSubmit={handleClick} className="login-form ">
                <div className="d-flex align-items-center my-4">
                    <h1 className="text-center fw-normal mb-0 me-3">Sign In</h1>
                </div>
                <FormGroup className="mt-3">
                    <label className="mb-1 fw-bold" htmlFor="email">Email</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Email"
                        required
                        id="email"
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup className="mt-3">
                <label className="mb-1 fw-bold" htmlFor="password">Password</label>
                    <div className="input-group">
                    {/* <input
                        type="password"
                        placeholder="Password"
                        required
                        className="form-control"
                        id="password"
                        onChange={handleChange}
                        /> */}
                        <input
                             type={showPassword ? "text" : "password"}
                             placeholder="Password"
                             required
                             className="form-control"
                             id="password"
                             onChange={handleChange}
 
/>

                        <button className="btn eyebtn" onClick={handleShow}><i class="fa-solid fa-eye"></i></button>
                    </div>
                    
                   
                </FormGroup>
              
                {/* <div className="mt-3">

                    
                    <Link to="/reset-password" className="text-body">
                        Forgot password?
                    </Link>
                </div> */}
                <Button
                    className="btn secondary__btn mt-3 auth_btn"
                    type="submit"
                >
                    Login
                </Button>
            </Form>
        </>
    );
};

export default authLayout(LoginPage);





// import React, { useState } from "react";
// import { Link, useNavigate } from 'react-router-dom';
// import { Button, Form, FormGroup } from "react-bootstrap";

// const LoginPage = () => {
    
//     return (
//         <>
//             <Form onSubmit={handleClick} className="login-form">
//                 <FormGroup>
//                     <input
//                         type="text"
//                         className="form-control"
//                         placeholder="Email"
//                         required
//                         id="email"
//                         value={email}
//                         onChange={handleChange}
//                     />
//                 </FormGroup>
//                 <FormGroup>
//                     <input
//                         type="password"
//                         placeholder="Password"
//                         required
//                         className="form-control"
//                         id="password"
//                         value={password}
//                         onChange={handleChange}
//                     />
//                 </FormGroup>
//                 <Button
//                     className="btn secondary__btn auth_btn"
//                     type="submit"
//                 >
//                     Login
//                 </Button>
//             </Form>
//         </>
//     );
// };

// export default LoginPage;








