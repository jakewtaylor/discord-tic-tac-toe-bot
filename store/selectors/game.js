import { createSelector } from '@reduxjs/toolkit';

export const gameSelector = (state, id) => state.games[id];

export const validCellsSelector = createSelector(gameSelector, game => {
    const validCells = [];

    game.grid.forEach((cell, i) => {
        if (cell === null) {
            validCells.push(i);
        }
    });

    return validCells;
});