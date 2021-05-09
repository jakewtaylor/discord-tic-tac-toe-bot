/**
 * Checks if a grid has been won by the given piece.
 */
export const checkForWin = (grid, piece) => {
    for (let i = 0; i < 9; i++) {
        if (grid[i] === piece) {
            const horizontalWin = checkHorizontal(grid, piece, i);
            const verticalWin = checkVertical(grid, piece, i);
            const diagonalWin = checkDiagonal(grid, piece, i);

            if (horizontalWin || verticalWin || diagonalWin) {
                return true;
            }
        }
    }

    return false;
}

const checkHorizontal = (grid, piece, i) => {
    // We don't need to check if we're not at the start of a row
    // as it should've already been checked at row 0
    if (i % 3 !== 0) return false;

    // Check if every cell in the row matches the specified piece.
    return [i, i + 1, i + 2].every(cell => grid[cell] === piece);
}

const checkVertical = (grid, piece, i) => {
    // We don't need to check if we're not in the first row
    // as it should've already been checked from the first row.
    if (i > 2) return false;

    // Check if every cell in the column matches the specified piece
    return [i, i + 3, i + 6].every(cell => grid[cell] === piece);
}

const checkDiagonal = (grid, piece, i) => {
    // No need to check from anywhere other than top left or right.
    if (i !== 0 && i !== 2) return false;

    // Check if we have a diagonal win
    return [i, 4, 8 - i].every(cell => grid[cell] === piece);
}