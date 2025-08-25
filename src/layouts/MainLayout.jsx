import React from 'react'
import { Outlet } from "react-router";
import { MdLocalMovies } from "react-icons/md";
import { useNavigate } from "react-router";

function MainLayout() {
    let navigate = useNavigate();

    return (
        <div className='min-h-[100vh]'>
            <div className='bg-red-700'>
                <MdLocalMovies onContextMenu={() => navigate('/addmovie')} className='text-center w-full text-6xl md:text-7xl' />
                <h1 className='[text-shadow:_0_4px_4px_rgb(0_0_0_/_0.5)] text-base md:text-3xl font-["Noto Sans", sans-serif] capitalize absolute top-7 md:top-8 left-[50%] translate-[-50%] text-white font-extrabold drop-shadow-black'>movie search app</h1>
            </div>
            <Outlet />
        </div>
    )
}

export default MainLayout
