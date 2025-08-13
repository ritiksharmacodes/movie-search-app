import React, { useState } from 'react'
import { useForm } from "react-hook-form";

function AddMovie() {
    const [apiRes, setApiRes] = useState({});
    const { register, handleSubmit } = useForm({
        defaultValues: {
            movieInput: ""
        }
    });
    const { register: register2, handleSubmit: handleSubmit2 } = useForm({
        defaultValues: {
            objectInput: ""
        }
    });

    async function formSubmitHandler(data) {
        try {
            const movie = data.movieInput;

            // sending the movie to the TMDB API
            const url = `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`;
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_READ_ACCESS_TOKEN} `
                }
            };
            const api_res = await fetch(url, options);
            const api_res_json = await api_res.json();
            setApiRes(api_res_json);
            console.log(api_res_json);
        } catch (error) {
            console.log(error);
        }
    }
    async function sendDataToServerHandler(data) {
        try {
            const objIp = apiRes.results[parseInt(data.objectInput)];
            const idOfthemovie = objIp.id;

            // fetching credits data from the TMDB API
            const url = `https://api.themoviedb.org/3/movie/${idOfthemovie}/credits?language=en-US`;
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_READ_ACCESS_TOKEN}`
                }
            };
            const credits_res = await fetch(url, options)
            const credits_res_json = await credits_res.json();

            // fetching details data from the TMDB API
            const details_url = `https://api.themoviedb.org/3/movie/${idOfthemovie}?language=en-US`;
            const details_res = await fetch(details_url, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_READ_ACCESS_TOKEN}`
                }
            });
            const details_res_json = await details_res.json();

            // sending the final data object to the server
            const finalObjectToBeSentToTheServer = {
                mainObject: apiRes,
                details: details_res_json,
                credits: credits_res_json
            };
            const server_res = await fetch('http://localhost:3000/addMovie', {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(finalObjectToBeSentToTheServer)
            })
            const server_res_json = await server_res.json();
            console.log(server_res_json);


        } catch (error) {
            console.log(error);
        }
    }
    function formSubmitionErrorHandler(err) {
        console.log(err);
    }
    function sendDataToServerErrorHandler(err) {
        console.log(err);
    }

    return (
        <>
            <form onSubmit={handleSubmit(formSubmitHandler, formSubmitionErrorHandler)} className='p-4 flex flex-col gap-4 items-center' action="#">
                <h1 className='capitalize text-center text-6xl'>Add movie page</h1>
                <div className=''>
                    <label htmlFor="movie-input">Movie: </label>
                    <input autoComplete='off' className='outline-1 px-3 py-2' id='movie-input' type="text" {...register("movieInput", {
                        required: true
                    })} />
                </div>
                <button type='submit' className='bg-black text-white w-fit py-2 px-6 cursor-pointer rounded active:bg-gray-500'>Send Request</button>
            </form>

            <form onSubmit={handleSubmit2(sendDataToServerHandler, sendDataToServerErrorHandler)} className='p-4 flex flex-col gap-4 items-center' action="#">
                <div className=''>
                    <label htmlFor="">Objects: </label>
                    <select {...register2("objectInput", {
                        required: true
                    })} >
                        {apiRes.results?.map((cur, ind) => (
                            <option key={ind} value={ind}>{ind}</option>
                        ))}
                    </select>
                </div>
                <button type='submit' className='bg-black text-white w-fit py-2 px-6 cursor-pointer rounded active:bg-gray-500'>Send data to server</button>
            </form>
        </>

    )
}

export default AddMovie
