import React, { useState, useEffect } from 'react'
import '../../../scss/profile.scss'
function CarouselItem({ index, item, currentindex }) {
    return (
        <div className="carousel-item" key={index} style={{ transform: `translate(-${currentindex * 100}%)` }}>
            <div
                className="carousel-item-background"
                style={{
                    backgroundImage: `url(${item.src})`,
                    backgroundSize: "cover",
                    filter: `blur(${currentindex === index ? "7px" : "7px"})`,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                }}
            />
            <img
                className="carousel-item-image"
                src={item.src}
                style={{
                    objectFit: "contain",
                    position: "relative",
                    zIndex: 2,
                    maxWidth: "100%",
                    maxHeight: "100%",
                }}
            />
            <div className="carousel-item-toolbar">
                <div>
                    <p>Edit</p>
                </div>
                <div>
                    <p>Share</p>
                </div>
            </div>
        </div>
    )
}
function Carousel() {
    let data = [
        { src: 'https://picsum.photos/id/345/1920/1080/' },
        { src: 'https://picsum.photos/id/212/1920/1080' },
        { src: 'https://picsum.photos/id/37/1920/1080' },
        { src: 'https://picsum.photos/id/137/1920/1080' },
        { src: 'https://picsum.photos/id/217/1440/920' },
    ];
    const [currentindex, setCurrentindex] = useState(0);

    const handleDotClick = (index) => {
        setCurrentindex(index);
    };

    return (
        <div className="carousel-container">
            <div className="dots-wr">
                {data.map((item, index) => {
                    return (
                        <div
                            className={`dot ${currentindex === index ? "active" : ""}`}
                            onClick={() => handleDotClick(index)}
                            key={index}
                        />
                    );
                })}
            </div>
            {data.length === 0 ?
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <h3>No works here</h3>
                </div>
                :
                <div className="carousel-wr">
                    {data.map((item, index) => {
                        return (
                            <CarouselItem item={item} index={index} currentindex={currentindex} />
                        );
                    })}
                </div>
            }

        </div>
    );
}


function UserProfile() {
    return (
        <div className="profile-wr">
            <div className="profile-data">
                <div className="profile-photo-wr">
                    <div className="profile-photo-container">
                        <img src="https://picsum.photos/id/912/300/300"></img>
                    </div>
                    <div className="profile-photo-circles red"></div>
                    <div className="profile-photo-circles blue"></div>
                </div>
                <div className="profile-username-wr">
                    <p className="profile-username">Username</p>
                </div>
            </div>
            <div className="images-wr">
                <div style={{ display: 'flex', flexDirection: 'column', width: '65%' }}>
                    <p>Last works</p>
                    <div className="profile-last-images">
                        <Carousel />
                    </div>

                </div>
                <div style={{ display: 'flex', flexDirection: 'column', width: '30%' }}>
                    <p>Last filter</p>
                    <div className="profile-last-filter">

                    </div>
                </div>

            </div>
        </div>
    )
}

export default UserProfile