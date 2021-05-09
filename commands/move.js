import { move } from '../store/gamesSlice';
import { renderGrid } from '../util/renderGrid';
import { gameSelector, validCellsSelector } from '../store/selectors/game';
import { store } from '../store';
import { positionToIndex } from '../util/positionToIndex';
import { checkForWin } from '../util/checkForWin';
import { getActivePiece } from '../util/getActivePiece';

export const moveCommand = {
    name: 'move',
    description: 'Start A New Game',
    execute(message, args) {
        if (!args || args.length !== 2) {
            message.channel.send(`Please give game ID and a position!`);
            return;
        }

        const [id, position] = args.map(arg => arg.toLowerCase());

        const game = gameSelector(store.getState(), id);

        if (!game) {
            message.channel.send(`Couldn't find a game with ID \'${id}\`!'`);
            return;
        }

        if (!position) {
            message.channel.send(`Please say which cell you want to play in!`);
            return;
        }

        if (!/^[abc][012]$/.test(position)) {
            message.channel.send(`Position formatted badly, should be like A0 or C2`);
            return;
        }
        
        if (message.author.id !== game.currentPlayer) {
            message.channel.send(`It's not your turn!`);
            return;
        }

        const validCells = validCellsSelector(store.getState(), id);
        const target = positionToIndex(position);

        if (!validCells.includes(target)) {
            message.channel.send(`That cell has already been used!`);
            return;
        }

        store.dispatch(move({ id, target }));

        const updatedGame = gameSelector(store.getState(), id);

        const hasWon = checkForWin(
            updatedGame.grid,
            getActivePiece(game),
        );

        message.channel.send(renderGrid(updatedGame.grid))

        if (hasWon) {
            message.channel.send(`<@!${game.currentPlayer}> wins!`);
        } else {
            message.channel.send(`<@!${updatedGame.currentPlayer}>, it's your turn now!`);
        }
    },
};