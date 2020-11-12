import Env from 'dotenv';

Env.config();

import Client from './src/struct/Client';

const client = new Client();

client.on('error', error => console.log(error));

client.start(process.env.TOKEN!);
