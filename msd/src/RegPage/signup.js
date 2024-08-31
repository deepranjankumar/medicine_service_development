import React, { useState} from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
// import { useCookies } from "react-cookie";
import { useNavigate,Link} from "react-router-dom";
function Register() {
  // const [cookies] = useCookies(["cookie-name"]);
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (cookies.jwt) {
  //     navigate("/login");
  //   }
  // }, [cookies, navigate]);

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
        "https://medicine-service-development-2.onrender.com/register",
        {
          ...values,
        },
        { withCredentials: true }
      );
      if (data) {
        if (data.errors) {
          const { email, password } = data.errors;
          if (email) generateError(email);
          else if (password) generateError(password);
        } else {
          navigate("/login");
        }
      }
    } catch (ex) {
      console.log(ex);
    }
  };

    return(<>
<div className="login-page">
<div className="sign-page-div" style={{backgroundColor: "rgba(238, 238, 238, 0.7)",padding:"9% 25%"}}>
<h1 style={{fontFamily: 'Montserrat',color:'black'}}>JOIN MSD</h1>
<form  method="post" onSubmit={ handleSubmit} >
         
      <div className="form-input">
     <input type="text" id="username" name="email" placeholder="enter your email" 
        value={values.email}
        onChange={inputEvent}

          />
     <input type="password" id="password" name="password" placeholder="enter your password" 
            value={values.password}
        onChange={inputEvent}
          />
    </div>
    <div className="submit-btn">
    <button type="submit" className="btn" >Sign Up</button>
    </div>
    
      </form>
      <div style={{marginTop:'10px'}}><span>
          I have an account ?<Link to="/login"> Login </Link>
        </span></div>
      {/* <h3 style={{fontFamily: 'Montserrat'}}>Or Login with</h3>
      <div className="other-option">
       <img src='images/logo/face.png' alt="logoimage"/>
       <img src='images/logo/twitter.png' alt="logoimage"/>
       <img src='images/logo/google.png' alt="logoimage"/>
       <img src='images/logo/insta.png' alt="logoimage"/>
       <img src='images/logo/linkdn.png' alt="logoimage"/>
    </div> */}
      </div>
      <ToastContainer />
    </div>
   
    </>)
}

export default Register;
