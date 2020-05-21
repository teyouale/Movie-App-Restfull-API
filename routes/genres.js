const express = require('express');
const router = express(express.Router);

const genres = [
	{ id: 1, name: 'Action' },
	{ id: 2, name: 'Horror' },
	{ id: 3, name: 'Romance' },
];

router.get('/', (req, res) => res.send(genres));

router.get('/:id', (req, res) => {
	const genres = genres.find(c => c.id === parseInt(req.params.id));
	if (!genres) return res.status(404).send('Invaild ID');
	res.status(200).send(genres);
});

router.post('/', (req, res) => {
	const { error } = validateGeners(req.body);
	if (error) res.status(400).send(error.details[0].message);
	const genres = {
		id: genres.length + 1,
		name: req.body.name,
	};
	genres.push(genres);
	res.status(200).send(genres);
});

router.put('/:id', (req, res) => {
	const genres = genres.find(c => c.id === parseInt(req.params.id));
	if (!genres) return res.status(404).send('Invaild ID');

	const { error } = validateGeners(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	genres.name = req.body.name;

	res.status(200).send(genres);
});

router.delete('/:id', (req, res) => {
	const genres = genres.find(c => c.id === parseInt(req.params.id));
	if (!genres) return res.status(404).send('Invaild ID');

	const index = genres.indexOf(genres);
	console.log('index', index);

	genres.splice(index, 1);

	res.status(200).send(genres);
});

function validateGeners(genres) {
	const schema = {
		name: Joi.string()
			.min(3)
			.required(),
	};
	return Joi.validate(genres, schema);
}

module.exports = router;
