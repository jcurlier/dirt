// Libraries
const supertest = require('supertest');

/**
 * This is an example of an end-to-end test suite. The Express application
 * does not come with a route defined at `/invalid` so this endpoint should return
 * a 404.
 */
describe('GET /invalid', () => {
  let app;
  let response;

  // --------------------------------------------------
  // Request
  // --------------------------------------------------
  beforeAll(async () => {
    app = await expressApp(); // eslint-disable-line no-undef
    response = await supertest(app).get('/invalid');
  });

  it('should return a 404 with an empty respone', async () => {
    expect(response.status).toEqual(404);
  });
});
