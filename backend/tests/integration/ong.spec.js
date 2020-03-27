const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/conection')

describe('ONG', () => {
   beforeEach(async () => {
      await connection.migrate.rollback();
      await connection.migrate.latest();
   });

   afterAll (async () => {
      await connection.destroy();
   })

   it('Should be able to create a new ONG', async () => {
      const response = await request(app)
         .post('/ongs')
         .send({
            name: "TESTE",
            email: "TESTE@TESTE.COM.BR",
            whatsapp: "48433258741",
            city: "São José",
            uf: "SC"
         });

      expect(response.body).toHaveProperty('id');
      expect(response.body.id).toHaveLength(8);
   })
});