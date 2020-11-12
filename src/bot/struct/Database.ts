import { MongoClient, Db } from 'mongodb';

class MongoDB extends MongoClient {
	public constructor() {
		super(process.env.MONGODB_URL!, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
	}

	public async connect() {
		return super.connect();
	}

	public async createIndex() {
		return Promise.all([
			this.db('escape').collection('settings').createIndex({ id: 1 }, { unique: true })
		]);
	}
}

const Connection = new MongoDB();

class Mongo {
	public static get db() {
		return Connection.db('escape');
	}
}

export { Connection, Mongo };