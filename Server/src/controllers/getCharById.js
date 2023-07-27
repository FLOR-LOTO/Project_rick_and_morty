const axios = require('axios');

const URL = 'https://rickandmortyapi.com/api/character/';

const getCharById = async (req, res) => {
// const { id } = req.params;
const id = parseInt(req.params.id);

try {
const { data } = await axios(`${URL}${id}`);

const {
    name,
    gender,
    species,
    origin: { name: origin },
    image,
    status,
} = data;

const character = {
    id,
    name,
    gender,
    species,
    origin,
    image,
    status,
};

return name
    ? res.status(200).json(character)
    : res.status(404).send('Not found');
} catch (error) {
res.status(500).json({ error: error.message });
}
};
module.exports = getCharById;