const express = require('express');
const Joi = require('joi');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const genres = [
	{ id: 1, name: 'Action' },
	{ id: 2, name: 'Horror' },
	{ id: 3, name: 'Romance' },
];

app.get('/', (req, res) => res.send('Hello World!'));
app.get('/api/genres', (req, res) => res.send(genres));
app.post('/api/genres', (req, res) => {
	const { error } = validateGeners(req.body);
	if (error) res.status(400).send(error.details[0].message);
	const genre = {
		id: genres.length + 1,
		name: req.body.name,
	};
	genres.push(genre);
	res.status(200).send(genre);
});
app.listen(port, () => console.log(`Example app listening on ${port} port!`));

function validateGeners(genre) {
	const schema = {
		name: Joi.string()
			.min(3)
			.required(),
	};
	return Joi.validate(genre, schema);
}
