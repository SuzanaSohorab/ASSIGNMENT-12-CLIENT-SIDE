import React from 'react';


import HomePage from '../HomePages/HomePages';
import Banner from '../../Components/Banner';



const Home = () => {
    return (
    //    <div>
    //             <div className="relative min-h-screen overflow-hidden">
    //   {/* 🔹 Background Video */}
    //   <video
    //     autoPlay
    //     loop
    //     muted
    //     playsInline
    //     className="absolute top-0 left-0 w-full h-full object-cover -z-10"
    //   >
    //     <source src="/public/videos/144584-785095786.mp4" type="video/mp4" />
    //   </video>

    // </div> d
    <div>          <Banner></Banner>
            <HomePage></HomePage>
</div>
    
            
        // </div>
    );
};

export default Home;