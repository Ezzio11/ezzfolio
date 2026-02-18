import React from 'react';
import './ComplexLantern.css';

const ComplexLantern = () => {
    return (
        <div className="complex-lantern-container">
            <div className="lantern">
                <div className="wire"></div>
                <div className="ring"></div>
                <div className="top-triangle"></div>
                <div className="front-triangle"></div>
                <div className="ball"></div>
                <div className="rect-1"></div>
                <div className="rect-2"></div>
                <div className="rect-3"></div>

                <div className="window window-left">
                    <div className="left"></div>
                    <div className="right"></div>
                    <div className="circle-1"></div>
                    <div className="circle-2"></div>
                    <div className="circle-3"></div>
                    <div className="circle-4"></div>
                </div>

                <div className="window">
                    <div className="left"></div>
                    <div className="right"></div>
                    <div className="circle-1"></div>
                    <div className="circle-2"></div>
                    <div className="circle-3"></div>
                    <div className="circle-4"></div>
                </div>

                <div className="window window-right">
                    <div className="left"></div>
                    <div className="right"></div>
                    <div className="circle-1"></div>
                    <div className="circle-2"></div>
                    <div className="circle-3"></div>
                    <div className="circle-4"></div>
                </div>

                <div className="candle">
                    <div className="candle-top"></div>
                    <div className="candle-thread"></div>
                    <div className="candle-flame"></div>
                </div>

                <div className="rect-4"></div>
                <div className="rect-5"></div>
                <div className="rect-6"></div>
            </div>
        </div>
    );
};

export default ComplexLantern;
