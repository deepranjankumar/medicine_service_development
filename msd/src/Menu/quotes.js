import React from 'react';
import '../index.css'
const Qbody=(props)=>{
    return(<>
    
    <div style={{backgroundColor: '',height:'340px',display:'flex',alignItems:'center',width:'100%'}}>
    <div style={{display: 'flex',alignItems: 'center',width:'90%'}} className="qbody" >
        <div style={{marginTop:'25px',color:'black'}}>
        <h1 style={{fontSize:'14px',fontFamily: 'Playfair Display',color:'black'}}>{props.quote} </h1>
        <h3 style={{color:'black'}}>~{props.name}</h3>
        </div>
        <div>
        <img src={props.imgs} alt="doctor" style={{height:'145px'}}/>
        </div>
        </div>
        </div>
    </>)
}
export default Qbody;