const app = require('../src/app');
const session = require('supertest');
const agent = session(app);

describe('GET /rickandmorty/character/:id', () => {
    it('Responde con status: 200', async() => {
        const response = await agent.get('/rickandmorty/character/1')
        expect(response.status).toEqual(200);
    });
    it('Responde un objeto con las propiedades: "id", "name", "species", "gender", "status", "origin" e "image"', async() => {
        const response = await agent.get('/rickandmorty/character/1')
        expect(response.body).toHaveProperty("id", "name", "species", "gender", "status", "origin", "image")
    });
    it('Si hay un error responde con status: 500', async() => {
        try{
            await agent.get('/rickandmorty/character/9999')
            .expect(500)
        }catch(error) {
            expect(error.response.status).toEqual(500)
        }
    });
});


describe("POST /rickandmorty/fav", () => {
    let fav = [];
    it("lo que envies por body debe volver en un arreglo", async() => {
        const requestBody = {name: 'Rick Sanchez', species: 'Human', gender: 'Male', status: 'Alive'}
        const response = await agent.post('/rickandmorty/fav').send(requestBody);
        fav.push(requestBody)
        expect(response.body).toEqual(fav)
    });
    it("una nueva request debe ser devuelta en un arreglo que incluye el elemento enviado previamente", async() => {
        const newRequest = {name: 'Morty Smith', species: 'Human', gender: 'Male', status: 'Alive'}
        const response = await agent.post('/rickandmorty/fav').send(newRequest);
        fav.push(newRequest)
        expect(response.body).toEqual(fav)
    });
});

describe("DELETE /rickandmorty/fav/:id", () => {
});