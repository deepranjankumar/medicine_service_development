import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Quotes from '../Data/doctorquotes.js';
import Qbody from './quotes.js';
import Meet from './meetdoc.js';
import BestDocData from '../Data/BestDoc.js';
import  BottomDash from './BottomDash.js'
import '../index.css';

const Front = () => {
    const navigate = useNavigate();
    const [buttonWidth, setButtonWidth] = useState("40%");
    const HomeClick = (link) => {
        navigate(link);
    }

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setButtonWidth("80%");
            } else {
                setButtonWidth("40%");
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return ( <>
        <div style={{backgroundColor:"white"}}>
            <div className="navbar" style={{ width: "100%", backgroundColor: "black" }}>
                <div className="logo-amb">
                    <img src='images/medic.png' alt='logo' className="logo" />
                    <img src='images/ambulance.png' alt='ambulance' className="abmulance" onClick={() => { HomeClick("/login") }} />
                </div>
                <div className="button">
                    <button style={{ width: buttonWidth, margin: "10px 0" }}>Service</button>
                     <button style={{ width: buttonWidth, margin: "10px 0",marginLeft:"-80px"}} onClick={() => { HomeClick("/about") }}>About</button>
                    <button style={{ width: buttonWidth, margin: "10px 0",marginLeft:"-80px" }} onClick={() => { HomeClick("/login") }}>Login</button>
                </div>
            </div>
            <div className="main-content" style={{ width: "100%" }}>
                <Slider {...settings}>
                    {Quotes.map((val, ind) => (
                        <Qbody
                            key={ind}
                            name={val.name}
                            imgs={val.img}
                            quote={val.quote}
                        />
                    ))}
                </Slider>
                <h1 style={{ textAlign: 'center', color: 'black' }}>MEET OUR DOCTORS</h1>
                <div style={{  height: '100%',padding:"0px",margin:"0px", width: '100%' }}>
                   
                    <div className="MeetDoc" style={{ display: 'flex',justifyContent:"space-around"}}>
                        {BestDocData.map((val, ind) => (
                            <Meet
                                key={ind}
                                name={val.name}
                                spec={val.speclist}
                                univ={val.university}
                                img={val.img}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
        <div className="abdm" style={{backgroundColor:"rgba(110, 10, 15, 0.3)"}}>
            <div className="left">
                <p >ABDM aims to develop the backbone necessary to support the integrated digital health infrastructure of the country. It will bridge the existing gap amongst different stakeholders of the healthcare ecosystem through digital highways, making quality healthcare accessible to all.
                </p>
                <h1 style={{color:"black"}}>How can you as a healthcare provider be a part of ABDM?</h1>
                <button>Know More</button>
            </div>
            <div className="right">
            <img src='doctor_recption.png' alt='logo' className="logo" />
            </div>
        </div>
        <div className="for_doc" >
        <div className="left">
            <img src='profilesr.png' alt='logo' className="logo" />
            </div>
            <div className="right">
                <h1 style={{color:"black"}}>For doctors</h1>
                <h2>Build your digital presence and enhance patient experience with MSD
                </h2>
               
                <button>Learn More</button>
            </div>
         
        </div>
        <div style={{backgroundColor:"#0056b3"}}>
        < BottomDash/>
        </div>
       </>
    );
}

export default Front;
