import moment from 'moment';
import 'moment-duration-format';
import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import os from 'os';

export default class StatsCommand extends Command {
	public constructor() {
		super('stats', {
			aliases: ['stats'],
			category: 'util',
			channel: 'guild',
			clientPermissions: ['EMBED_LINKS']
		});
	}

	public async exec(message: Message) {
		const embed = this.client.util.embed()
			.setAuthor(this.client.user!.tag, this.client.user!.displayAvatarURL())
			.setTitle('Stats')
			.setDescription([
				'**Memory Usage**',
				`${(process.memoryUsage().heapUsed / (1024 * 1024)).toFixed(2)} MB`,
				'',
				'**Free Memory**',
				`${(os.freemem() / (1024 * 1024)).toFixed(2)} MB`,
				'',
				'**Uptime**',
				`${moment.duration(process.uptime() * 1000).format('D[d], H[h], m[m], s[s]', { trim: 'both mid' })}`,
				'',
				'**Servers**',
				`${this.client.guilds.cache.size}`,
				'',
				'**Users**',
				`${this.client.users.cache.size}`,
				'',
				'**Node.js**',
				`${process.version}`
			]);

		return message.util!.send({ embed });
	}
}