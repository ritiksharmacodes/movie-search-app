import React, { useEffect, useState } from 'react'
import { MdLocalMovies } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import MovieCard from '../components/MovieCard';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function Landing() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        fetch(`${import.meta.env.VITE_ADDRESS_OF_THE_SERVER}getMovies`, {
            method: 'GET',
            mode: 'cors'
        })
            .then((res) => res.json())
            .then((data) => { 
                setMovies(data); 
                setIsLoading(false); 
            })
            .catch((err) => { 
                console.log(err); 
                setIsLoading(false);
            });
    }, []);

    return (
        <div>
            {isLoading ? (<Box sx={{ margin: '0', backdropFilter: 'blur(4px)', zIndex: '99999', position: 'fixed', top: '0', width: '100%', height: '100vh' }}>
                <CircularProgress sx={{ color: 'black', position: 'absolute', top: '50%', left: '50%', translate: '-50%' }} />
            </Box>) : <></>}

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