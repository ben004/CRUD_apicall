const supertest = require('supertest');
const app = require('../routes/employee');

describe("Testing the movies API", () => {

	it("tests the base route and returns true for status",  () => {

		const response =  supertest(app).get('/all',(req,response));

		expect(response.status).toBe(200);

	})
})