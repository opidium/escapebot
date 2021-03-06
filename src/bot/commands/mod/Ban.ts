import Interaction from '../../struct/Interaction';
import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class PingCommand extends Command {
	public constructor() {
		super('ban', {
			aliases: ['ban'],
			channel: 'guild',
			typing: true,
			description: {
				content: 'Bans a user from the guild.',
				usage: '<user> [reason] [--days]',
				examples: ['@Suvajit DM ads --days 7']
			},
			optionFlags: ['--user', '--reason', '--days', '-d']
		});
	}

	public *args(msg: Message) {
		const slash = this.isInteraction(msg);

		const user = yield {
			match: slash ? 'option' : 'phrase',
			type: 'user',
			flag: '--user'
		};

		const reason = yield {
			match: slash ? 'option' : 'rest',
			type: 'string',
			flag: '--reason'
		};

		const days = yield {
			match: 'option',
			type: 'number',
			flag: ['--days', '-d']
		};

		return { user, reason, days };
	}

	public exec(message: Message | Interaction, args: any) {
		console.log(args);
	}
}
