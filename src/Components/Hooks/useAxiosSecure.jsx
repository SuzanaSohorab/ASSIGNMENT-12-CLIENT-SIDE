import axios from 'axios';
import React from 'react';

const axiosSecure =axios.create({
    baseURL: `https://assignment-12-server-side-gilt.vercel.app`
})

const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;