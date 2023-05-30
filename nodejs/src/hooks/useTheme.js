import { useState, useEffect } from "react";
import { useTasksContext } from "../context/TaskContext";

const LOCAL_STORAGE_KEY = 'darkTheme';

export function useTheme() {
    const { theme } = useTasksContext();
    const [darkTheme, setDarkTheme] = theme;

    function toggleTheme() {
        setDarkTheme(() => !darkTheme);
    }

    useEffect(() => {
        document.documentElement.setAttribute("data-darkTheme", darkTheme);
    }, [darkTheme]);

    useEffect(() => {
        try {
            const storedObj = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
            if (storedObj) setDarkTheme(() => storedObj);
        }
        catch (e) {
            console.log(e.message);
        }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(darkTheme));
        }
        catch (e) {
            console.log(e.message);
        }
    }, [darkTheme]);


    return { toggleTheme, darkTheme };
}