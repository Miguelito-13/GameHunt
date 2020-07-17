import React, { useState, useEffect } from 'react';
import RAWG from '../api/RAWG';

export default () => {
    const [results, setResults] = useState(null);
    const [trending, setTrending] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [top, setTop] = useState(null);
    const [gameInfo, setGameInfo] = useState(null);
    const [screenshots, setScreens] = useState(null);

    const getTrending = async (size) => {
        try {
            const response = await RAWG.get('/games/lists/main', {
                params: {
                    ordering: '-relevance',
                    discover: true,
                    page_size: size
                }
            });
            setTrending(response.data.results);
        } catch (err) {
            setErrorMessage("Something Went Wrong.");
        }
    }

    const getTop = async (size) => {
        try {
            const response = await RAWG.get('/games', {
                params: {
                    ordering: '-added',
                    page_size: size
                }
            });
            setTop(response.data.results);
        } catch (err) {
            setErrorMessage("Something Went Wrong.");
        }
    }

    const getGames = async (size, term) => {
        try {
            const response = await RAWG.get('/games', {
                params: {
                    search: term,
                    page_size: size
                }
            });
            setResults(response.data.results);
        } catch (err) {
            setErrorMessage("Something Went Wrong.");
        }
    }

    const getResult = async (id) => {
        const response = await RAWG.get(`/games/${id}`);
        setGameInfo(response.data);
    };
    const getScreens = async (id) => {
        const response = await RAWG.get(`/games/${id}/screenshots`);
        setScreens(response.data.results);
    };


    useEffect(() => {
        getTrending(10);
        getTop(10);
    }, []);



    return [trending, getTrending, results, setResults, top, getTop, getGames, gameInfo, getResult, screenshots, getScreens, errorMessage];
};