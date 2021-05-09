import { v4 as uuid } from 'uuid';
import { newGame } from '../store/gamesSlice';
import { renderGrid } from '../util/renderGrid';
import { gameSelector } from '../store/selectors/game';
import { store } from '../store';

export const newGameCommand = {
    name: 'newgame',
    description: 'Start a new game between the @\'d users.',
    execute(message, players) {
        const id = uuid();

        if (players.length !== 2) {
            message.channel.send(`Please specify only 2 users to play:`);
            message.channel.send(`\`!ttt newgame @player1 @player2\``);
            return;
        }

        const re = /^<@!(\d+)>$/;

        if (!players.every(id => re.test(id))) {
            message.channel.send(`Please @ 2 users after 'newgame'!`);
            return;
        }

        const [player1, player2] = players.map(player => {
            const [,match] = player.match(re);

            return match;
        });

        store.dispatch(newGame({ id, player1, player2 }));

        const game = gameSelector(store.getState(), id);

        message.channel.send(`Started new game \`${id}\``);
        message.channel.send(renderGrid(game.grid))
        message.channel.send(`<@!${game.currentPlayer}>, it's your turn first!`);
    },
};