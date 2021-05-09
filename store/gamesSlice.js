import { createSlice } from '@reduxjs/toolkit';
import { getActivePiece } from '../util/getActivePiece';

const getNextPlayer = (game) => game.currentPlayer === game.player1
    ? game.player2
    : game.player1;

export const gamesSlice = createSlice({
    name: 'games',
    initialState: {},
    reducers: {
        newGame: (state, action) => {
            const { id, player1, player2 } = action.payload;

            // const currentPlayer = Math.random() > 0.5 ? player1 : player2;
            const currentPlayer = player2;

            state[id] = {
                player1,
                player2,
                currentPlayer,
                grid: [
                    null, null, null,
                    null, null, null,
                    null, null, null,
                ],
            };
        },

        move: (state, action) => {
            const { id, target } = action.payload;

            state[id].grid[target] = getActivePiece(state[id]);
            state[id].currentPlayer = getNextPlayer(state[id]);
        },
    },
});

export const { newGame, move } = gamesSlice.actions;

export default gamesSlice.reducer;