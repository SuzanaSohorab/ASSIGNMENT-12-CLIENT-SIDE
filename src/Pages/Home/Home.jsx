import React from 'react';
import Banner from '../../Components/Banner';
import AddPost from '../UserDashBoard/AddPost';
import MyPosts from '../UserDashBoard/MyPosts';
import MyProfile from '../UserDashBoard/MyProfile';



const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <AddPost></AddPost>
            <MyPosts></MyPosts>
            <MyProfile></MyProfile>

            
        </div>
    );
};

export default Home;