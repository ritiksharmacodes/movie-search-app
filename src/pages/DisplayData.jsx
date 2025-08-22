import React from 'react'
import { useEffect, useState, useRef } from 'react';
import { useParams } from "react-router"
import { MdLocalMovies } from "react-icons/md";
import { FaPlay } from "react-icons/fa";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
// import required modules
import { FreeMode } from 'swiper/modules';


function DisplayData() {
    let params = useParams();
    const [movie, setMovie] = useState({});
    const [showOverview, setShowOverview] = useState(false);

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
                <div className='text-center font-bold text-xl uppercase'>{movie.title}</div>
                <div className='flex items-center justify-center gap-1'><FaPlay className='text-xs' /> Play trailer</div>
                {/* <iframe
                src='https://www.youtube.com/embed/E7wJTI-1dvQ'
                frameborder='0'
                allow='autoplay; encrypted-media'
                allowFullScreen
                title='video'
            /> */}
            </div>

            {movie.overview?.length > 198 && showOverview === false ? <div className='p-5 text-justify'>{movie.overview.split(' ').slice(0, 15).join(' ') + '... '}<span onClick={() => setShowOverview(true)} className='text-blue-500 md:text-black md:hover:text-blue-500 cursor-pointer'>Show more</span></div> : <div className='p-5 text-justify'>{movie.overview + " "} <span onClick={() => setShowOverview(false)} className={`${movie.overview?.length > 198 ? '' : 'hidden'} text-blue-500 md:text-black md:hover:text-blue-500 cursor-pointer`}>Show less</span></div>}

            <h1>Top billed cast</h1>
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                freeMode={true}
                modules={FreeMode}
                className='h-fit'
            >
                <SwiperSlide>
                    <div className='bg-white w-fit border rounded'>
                        <img className='' src={`https://image.tmdb.org/t/p/original${movie.movie_cast?.at(0).profile_path}`} alt="" />
                        <p className='font-bold p-2'>{`${movie.movie_cast?.at(0).name}`}</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>Slide 2</SwiperSlide>
                <SwiperSlide>Slide 3</SwiperSlide>
                <SwiperSlide>Slide 4</SwiperSlide>
                <SwiperSlide>Slide 5</SwiperSlide>
                <SwiperSlide>Slide 6</SwiperSlide>
                <SwiperSlide>Slide 7</SwiperSlide>
                <SwiperSlide>Slide 8</SwiperSlide>
                <SwiperSlide>Slide 9</SwiperSlide>
            </Swiper>
            {/* <div className='px-5'><span className='font-bold uppercase'>Cast:</span> {movie.movie_cast?.join(', ') + ', etc.'}</div> */}
            {/* <div className='px-5 mt-5'><span className='font-bold uppercase'>Director: </span> {movie.director}</div>
            <div className={`${movie.music_director?.length != 0 ? '' : 'hidden'} p-5`}><span className='font-bold uppercase'>Music By: </span> {movie.music_director}</div> */}
        </>
    )
}

export default DisplayData