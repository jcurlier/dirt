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
    app = await expressApp(); // eslint-disable-line no-undef
  });

  it('should get all the items for 0xc287b15ba2147d86a98fcbbf13afc874beff3d9e', async () => {
    const response = await supertest(app)
      .get(`/registries/0xc287b15ba2147d86a98fcbbf13afc874beff3d9e`)
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body).toHaveLength(10);

    expect(response.body[0]).toBeDefined();
    expect(response.body[0].key).toEqual('OmiseGO');
    expect(response.body[0].owner).toEqual('0x453bbf1626c4bd25d6081aed93042208ddc1c1e3');
    expect(response.body[0].value).toEqual('0xd26114cd6EE289AccF82350c8d8487fedB8A0C07');
    expect(response.body[0].blockhistory).toHaveLength(1);
    expect(response.body[0].blockhistory[0]).toBe(3418608);
    expect(response.body[0].date).toEqual('Mon, 11 Jun 2018 23:49:15 GMT');
    expect(response.body[0].stake).toEqual('0.1');
  });

  it('should get no items for 0x0c09614c65251147262c1c6827cd48db5ed423c1', async () => {
    const response = await supertest(app)
      .get(`/registries/0x0c09614c65251147262c1c6827cd48db5ed423c1`)
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body).toHaveLength(0);
  });
});
