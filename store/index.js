import { configureStore } from '@reduxjs/toolkit';
import games from './gamesSlice';

export const store = configureStore({
    reducer: {
        games,
    },
});
