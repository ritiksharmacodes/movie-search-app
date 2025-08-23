import React from 'react'
import { useEffect, useState, useRef } from 'react';
import { useParams } from "react-router"
import { FaPlay } from "react-icons/fa";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
// import required modules
import { FreeMode } from 'swiper/modules';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'black',
    border: '2px solid #fff',
    boxShadow: 24,
    p: 2,
};

function DisplayData() {
    let params = useParams();
    const [movie, setMovie] = useState({});
    const [showOverview, setShowOverview] = useState(false);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_ADDRESS_OF_THE_SERVER}getMovie/${params.movie_id}`, {
            method: 'GET',
            mode: 'cors'
        })
            .then((res) => res.json())
            .then((data) => setMovie(data.data[0]))
            .catch((err) => console.log(err));
    }, [params]);
    console.log(movie);

    return (
        <>
            <div className='flex flex-col gap-3'>
                <div className={`h-70 w-45 m-auto mt-7`}>
                    <img className='h-full w-full rounded-md' src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt="" />
                </div>
                <div className='text-center font-bold text-xl'>{movie.title} <span className='font-semibold text-xs'>({movie.release_date?.split('-').at(0)})</span></div>
                <div onClick={handleOpen} className='flex items-center justify-center gap-1'><FaPlay className='text-xs' /> Play trailer</div>
            </div>

            <div className='bg-gray-500 border-b border-t border-[#00000047] p-5 mt-5 text-white text-[0.8rem] text-center'>
                {movie.genres?.join(', ')}
            </div>

            {movie.overview?.length > 198 && showOverview === false ? <div className='p-5 text-justify'>{movie.overview.split(' ').slice(0, 15).join(' ') + '... '}<span onClick={() => setShowOverview(true)} className='text-blue-500 md:text-black md:hover:text-blue-500 cursor-pointer'>Show more</span></div> : <div className='p-5 text-justify'>{movie.overview + " "} <span onClick={() => setShowOverview(false)} className={`${movie.overview?.length > 198 ? '' : 'hidden'} text-blue-500 md:text-black md:hover:text-blue-500 cursor-pointer`}>Show less</span></div>}

            <div className='flex justify-between px-5'>
                <div>
                    <p className='text-xs font-bold'>{movie.director?.at(0).name}</p>
                    <p className='text-xs'>Director</p>
                </div>
                <div>
                    <p className={`${ !(movie.music_director?.at(0))? 'hidden' : '' } text-xs font-bold`}>{movie.music_director?.at(0)?.name}</p>
                    <p className={`${ !(movie.music_director?.at(0))? 'hidden' : '' } text-xs`}>Music</p>
                </div>
            </div>
            <h1 className='mt-5 px-5 font-semibold'>Top billed cast</h1>
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                freeMode={true}
                modules={FreeMode}
                className='h-fit mt-2'
            >
                {movie.movie_cast?.map((cur) => (
                    <SwiperSlide className='px-5'>
                        <div className='bg-white w-25 h-50 rounded-t'>
                            <img className='rounded-t h-7/10 w-full' src={`https://image.tmdb.org/t/p/original${cur.profile_path}`} alt="" />
                            <p className='font-bold rounded-b border-1 border-[#00000027] p-2 h-3/10 text-xs'>{`${cur.name}`}</p>
                        </div>
                    </SwiperSlide>
                ))}
                <SwiperSlide></SwiperSlide>
            </Swiper>
            <div className='h-5'></div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <h1 className='absolute top-1 text-white font-bold left-[44.5%]'>Trailer</h1>
                    <iframe
                        src='https://www.youtube.com/embed/LY19rHKAaAg'
                        frameborder='0'
                        allow='autoplay; encrypted-media'
                        allowFullScreen
                        title='video'
                        className='w-full mt-5'
                    />
                </Box>
            </Modal>
        </>
    )
}

export default DisplayData