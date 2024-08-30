import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import './reg.css'
function Login() {
  const [cookies] = useCookies([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (cookies.jwt) {
      navigate("/login");
    }
  }, [cookies, navigate]);

  const [values, setValues] = useState({ email: "", password: "" });
  const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right",
    });

const inputEvent=(event)=>{
  const{name,value} = event.target;
  setValues((oldVal)=>({
   ...oldVal,
   [name]:value,
  }))
}

const handleSubmit = async (event) => {
  event.preventDefault();

  try {
    const { data } = await axios.post(
      "https://medicine-service-development-2.onrender.com/login",
      { ...values },
      { withCredentials: true }
    );

    console.log("Server response:", data);

    if (data.errors) {
      const { email, password } = data.errors;
      if (email) generateError(email);
      else if (password) generateError(password);
    } else {
      // Check the correct field name for the token
      const token = data.token || data.Token || data.jwt; // Adjust this line based on the actual response
      if (token) {
        console.log("Storing JWT Token:", token);
        localStorage.setItem("jwtoken", token);
        navigate("/home");
      } else {
        console.error("Token is undefined");
      }
    }

    console.log("Navigated deep or error handled.");
  } catch (ex) {
    console.log("Error:", ex);
  }
};




    return(<>
      <div className="login-page">
      <div className="login-page-div">
      <img src="login-logo.jpeg" alt="loginimg" style={{margin:'0px',padding:'0px',borderRadius:"50%",height:'56px',marginBottom:'15px',marginTop:'12px'}}/>
      <form  method="post" onSubmit={handleSubmit}>
      <div className="form-input">
          <input type="text" id="username" name="email" placeholder="enter your username" 
           onChange={inputEvent}
           value={values.email}

          />
          <input type="password" id="password" name="password" placeholder="enter your password" 
           onChange={inputEvent}
           value={values.password}
          />
          </div>
        
          <div className="submit-btn">
        <button type="submit" className="btn" >Login</button>
        </div>
      </form>
      <div style={{marginTop:'10px'}}><span>
          Don't have an account ?<Link to="/register"> Register </Link>
        </span></div>
      {/* <h3 style={{fontFamily: 'Montserrat'}}>Or Login with</h3>
    <div className="other-option">
       <img src='images/logo/face.png' alt="logoimage"/>
       <img src='images/logo/twitter.png' alt="logoimage"/>
       <img src='images/logo/google.png' alt="logoimage"/>
       <img src='images/logo/insta.png' alt="logoimage"/>
       <img src='images/logo/linkdn.png' alt="logoimage"/>
    </div> */}
    <ToastContainer />
    </div>
    </div>
  
    </>)
}


export default Login;
