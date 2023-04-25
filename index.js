import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { Feeling } from './models/Feeling.js';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

// Definitions
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Settings
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

async function connectToDB() {
	await mongoose
		.connect(
			'mongodb+srv://ckbeng:Gxex9nbaDPrfUu7d@howwefeel.5bpz6pw.mongodb.net/?retryWrites=true&w=majority',
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
			}
		)
		.then(() => {
			console.log('Connected to MongoDB');
			app.listen(PORT, () => {
				console.log(`Server is listening on the port ${PORT}`);
			});
		});
}

connectToDB();

// Routes
app.get('/ck', async (req, res) => {
	await Feeling.find({})
		.sort({ createdAt: -1 })
		.then((results) => {
			return res.send(results);
		})
		.catch((err) => {
			res.send(err);
		});
});

app.post('/beng', async (req, res) => {
	let body = req.body;
	console.log(body);
	let feeling = new Feeling(body);

	await feeling
		.save()
		.then(() => {
			return res.send('Added feeling');
		})
		.catch((err) => {
			return res.send(err);
		});
});

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});
