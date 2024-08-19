import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './Menu/Menu.js';
import Home from './Menu/Home';
import  Login from './RegPage/login.js';
import Details from './Menu/details';
// import DocData from './Data/DocData.js';
import About from './Menu/About.js'
import { DoctorProvider } from './Menu/DoctorContext';
import Ambulance from './Ambulance/ambulancepage.js';
import Payment from './Consult/Payments.js';
import AmbuPayment from './Ambulance/AmbuPayment.js';
import Consult from './Consult/ConsultHome.js'
import SignUp from './RegPage/signup.js';
import "react-toastify/dist/ReactToastify.css";
import Lobby from './screens/Lobby'
import RoomPage from "./screens/Room";
import Confirmation from "./Consult/Confermation.js"
import OrderDetails from "./Consult/OrderDetails.js"
import Ambulancedetails from "./Consult/Ambulance_details.js"
const App = () => {
  return (
    <DoctorProvider>
    <Router>
      <Routes>
      <Route exact path='/docdetail' element={<Details               
      />}/>
      <Route exact path='/login' element={<Login/>}/>
        <Route exact path="/" element={<Menu />} />
        <Route exact path="/ambulance" element={<Ambulance />} />
        <Route exact path="/about" element={<About/>} />
        <Route exact path="/confirmation" element={<Confirmation/>} />
        <Route exact path="/home" element={<Home />} />                                 
        <Route exact path="/payment" element={<Payment />} />
        <Route exact path="/ambulance-payment" element={< AmbuPayment />} />
        <Route exact path="/consult" element={<Consult />} />
        <Route exact path="/consult-video" element={<Lobby/>} />
        <Route exact path="/register" element={<SignUp/>} />
        <Route exact path="/room" element={<RoomPage/>} />
        <Route exact path="/order_details" element={<OrderDetails/>} />
        <Route exact path="/ambulance_details" element={<Ambulancedetails/>} />
      </Routes>
    </Router>
    </DoctorProvider>
  );
}

export default App;
