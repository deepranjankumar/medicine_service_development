import React from "react";

const Meet=(props)=>{
return(<>
    <div style={{marginRight:'12px'}}>
    <div>
    <img src={props.img} alt="doc-img" style={{height:'65px',borderRadius:'50%'}}/>
    </div>
    <h1 style={{color:'black'}} >{props.name}</h1>
    <h3 style={{color:'black',fontFamily: 'Playfair Display'}}>{props.spec}</h3>
    <p style={{color:'black',fontFamily: 'Playfair Display'}}>{props.univ}</p>
    </div>
</>)
}
export default Meet;