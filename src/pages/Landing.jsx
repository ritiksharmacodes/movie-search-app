import React, { useEffect, useState } from 'react'
import { MdLocalMovies } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import MovieCard from '../components/MovieCard';

function Landing() {
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        fetch(`${import.meta.env.VITE_ADDRESS_OF_THE_SERVER}getMovies`, {
            method: 'GET',
            mode: 'cors'
        })
            .then((res) => res.json())
            .then((data) => setMovies(data))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div>
            <form action="#" className='flex justify-center py-3'>
                <div className='relative outline-2 rounded'>
                    <input className='px-3 outline-0 py-2 w-9/10' placeholder='Search movie' type="text" />
                    <div className='absolute w-1/10 right-3 top-0 h-full flex items-center'>
                        <button type='submit'><CiSearch className='text-3xl' /></button>
                    </div>
                </div>
            </form>
            {/* main card holder */}
            <div className='flex gap-7 flex-wrap justify-center px-2 my-4'>
                {movies.data?.map((cur) => (
                    <MovieCard key={cur.id} movie={cur} />
                ))}
            </div>
        </div>
    )
}

export default Landing
