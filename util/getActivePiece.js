/**
 * Gets the active piece for the given game.
 */
export const getActivePiece = game =>
    game.currentPlayer === game.player1
        ? 1
        : 0;