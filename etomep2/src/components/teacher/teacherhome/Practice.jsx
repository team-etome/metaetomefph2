import React from 'react';
import "./practice.css";
import image from "../../../assets/messi-ronaldo-1593920966.jpg"

const practice = () => {
    return (
        <div className="main">
            <div className="adding info ">
                <p className="heading">Welcome!</p>
                <div>
                    <p className="email">e@gmail.com</p>
                    <img src={image} alt="Dummy" className="dummy-image" />
                </div>
            </div>
        </div>

    );
}
export default practice;
