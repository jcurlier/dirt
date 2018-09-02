// Libraries
const supertest = require('supertest');

/**
 * This is testing getting registries.
 */
describe('GET /registry items', () => {
  let app;

  // --------------------------------------------------
  // Request
  // --------------------------------------------------
  beforeAll(async () => {
    app = await loopbackApp(); // eslint-disable-line no-undef
  });

  it('should get all the items for 0xc287b15ba2147d86a98fcbbf13afc874beff3d9e', async () => {
    const response = await supertest(app)
      .get(`/registries/0xc287b15ba2147d86a98fcbbf13afc874beff3d9e/items`)
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body).toHaveLength(10);
  });

  it('should get no items for 0x0c09614c65251147262c1c6827cd48db5ed423c1', async () => {
    const response = await supertest(app)
      .get(`/registries/0x0c09614c65251147262c1c6827cd48db5ed423c1/items`)
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body).toHaveLength(0);
  });
});
