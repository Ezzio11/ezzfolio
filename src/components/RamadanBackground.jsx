import React from 'react';
import './RamadanBackground.css';

export default React.memo(function Background() {
    return (
        <div className="ramadan-background-container">
            <div id="stars"></div>
            <div id="stars2"></div>
            <div id="stars3"></div>

            <div className="page">
                <div id="moon" className="fade-in"></div>

                <div id="main-star" className="fade-in">
                    <div className="star-five rotating"></div>
                </div>

                <div className="constellations">
                    <div className="constellation rotating-slow">
                        <div className="baby-star">
                            <div className="star-five rotating"></div>
                        </div>
                        <div className="baby-star">
                            <div className="star-five rotating"></div>
                        </div>
                        <div className="baby-star">
                            <div className="star-five rotating"></div>
                        </div>
                        <div className="baby-star">
                            <div className="star-five rotating"></div>
                        </div>
                    </div>

                    <div id="angled">
                        <div className="constellation rotating-slow">
                            <div className="baby-star">
                                <div className="star-five rotating"></div>
                            </div>
                            <div className="baby-star">
                                <div className="star-five rotating"></div>
                            </div>
                            <div className="baby-star">
                                <div className="star-five rotating"></div>
                            </div>
                            <div className="baby-star">
                                <div className="star-five rotating"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});
