// Libraries
const supertest = require('supertest');

/**
 * This is testing getting registries.
 */
describe('GET /registries', () => {
  let app;

  // --------------------------------------------------
  // Request
  // --------------------------------------------------
  beforeAll(async () => {
    app = await loopbackApp(); // eslint-disable-line no-undef
  });

  it('should get all the registries', async () => {
    const response = await supertest(app)
      .get(`/registries`)
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body).toHaveLength(2);
  });
});
