import { store } from "../store";
import { move } from "../store/gamesSlice";
import { gameSelector } from "../store/selectors/game";
import { checkForWin } from "./checkForWin";
import { getActivePiece } from "./getActivePiece";
import { gridReactEmojis } from "./gridReactEmojis";
import { renderGrid } from "./renderGrid";

const reactionFilter = gameId => (reaction, user) => {
	return gridReactEmojis.includes(reaction.emoji.name)
        && user.id === store.getState().games[gameId].currentPlayer;
};

export const setupReactionMoves = async (message, gameId) => {
    // show the user what reactions can be used
    for (const emoji of gridReactEmojis) {
        await message.react(emoji);
    }

    try { 
        const collected = await message.awaitReactions(
            reactionFilter(gameId),
            { max: 1, time: 60000, errors: ['time'] }
        );
        
        const reaction = collected.first();

        const target = gridReactEmojis.findIndex(emoji => emoji === reaction.emoji.name);

        const game = gameSelector(store.getState(), gameId);

        store.dispatch(move({ id: gameId, target }));

        const updatedGame = gameSelector(store.getState(), gameId);

        const hasWon = checkForWin(
            updatedGame.grid,
            getActivePiece(game),
        );

        if (hasWon) {
            message.channel.send(
                renderGrid(updatedGame.grid)
                + `\n<@!${game.currentPlayer}> wins!`,
            );
        } else {
            const newGrid = await message.channel.send(
                renderGrid(updatedGame.grid)
                + `\n<@!${updatedGame.currentPlayer}>, it's your turn now!`,
            );

            setupReactionMoves(newGrid, gameId);
        }

    } catch (err) {
        console.log(err);
        message.reply('Something went wrong...');
    }
}