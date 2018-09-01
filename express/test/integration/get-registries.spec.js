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
    app = await expressApp(); // eslint-disable-line no-undef
  });

  it('should get all the contributors', async () => {
    const response = await supertest(app)
      .get(`/registries`)
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body).toHaveLength(2);

    expect(response.body[0]).toBeDefined();
    expect(response.body[0].name).toEqual('Cryptocurrency Addresses');
    expect(response.body[0].address).toEqual('0xc287b15ba2147d86a98fcbbf13afc874beff3d9e');
    expect(response.body[0].vote_style).toEqual('PUBLIC');
    expect(response.body[0].timestamp).toBe(1528745778);
    expect(response.body[0].date).toEqual('Mon, 11 Jun 2018 19:36:18 GMT');
  });
});
