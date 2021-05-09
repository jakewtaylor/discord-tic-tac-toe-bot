/**
 * Converts a given position into an index
 * e.g. A0 = 0, C2 = 9
 */
export const positionToIndex = (position) => {
    const [row, col] = position.split('');

    const rowMap = { a: 0, b: 3, c: 6 };

    return rowMap[row] + parseInt(col, 10);
};
