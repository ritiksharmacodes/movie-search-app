import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from "react-router"
import { MdLocalMovies } from "react-icons/md";

function DisplayData() {
    let params = useParams();
    const [movie, setMovie] = useState({});

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
        <div className={`bg-[url('https://image.tmdb.org/t/p/original${movie.poster_path}')] h-9`}>
            {/* <div className='h-60 w-40'>
                <img className='h-full w-full' src={``} alt="" />
            </div> */}
        </div>
    )
}

export default DisplayData
