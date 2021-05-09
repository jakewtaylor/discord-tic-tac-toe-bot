import { v4 as uuid } from 'uuid';
import { newGame } from '../store/gamesSlice';
import { renderGrid } from '../util/renderGrid';
import { gameSelector } from '../store/selectors/game';
import { store } from '../store';
import { gridReactEmojis } from '../util/gridReactEmojis';
import { setupReactionMoves } from '../util/setupReactionMoves';



export const vsCommand = {
    name: 'vs',
    description: 'Start a new game against the @\'d player',
    async execute(message, players) {
        const id = uuid();

        if (players.length !== 1) {
            message.channel.send(`Please specify only 1 user to play against:`);
            message.channel.send(`\`!ttt vs @opponent\``);
            return;
        }

        const re = /^<@!(\d+)>$/;

        if (!players.every(id => re.test(id))) {
            message.channel.send(`Please @ a user after 'vs'!`);
            return;
        }

        const player1 = message.author.id;
        const [,player2] = players[0].match(re);

        store.dispatch(newGame({ id, player1, player2 }));

        const game = gameSelector(store.getState(), id);

        const newMessage = await message.channel.send(
            `Started new game! (\`${id}\`)\n`
            + renderGrid(game.grid)
            + `\n<@!${game.currentPlayer}>, it's your turn first!`,
        );

        await setupReactionMoves(newMessage, id);
    },
};