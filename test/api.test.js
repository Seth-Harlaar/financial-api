
const request = require('supertest');
const {app, closeServer} = require('../index'); 
const sequelize = require('../dbConfig');



// *******************************************
// ***           Create Tests              ***
// *******************************************
describe('POST /api/account/add', () => {

  beforeAll(async () => {
    // not entirely necessary but allows for better formatting on response check
    // by using matching JSON objects instead of expect statements
    await sequelize.query('DELETE FROM account');
    await sequelize.query('ALTER TABLE account AUTO_INCREMENT = 1;');
  });

  afterAll(async () => {
    await closeServer();
  });

  it('should create an account with title and group provided', async () => {
    const newAccount = {
      title: 'Sample Title1',
      group: 'Sample Group',
    };

    const response = await request(app)
      .post('/api/account/add')
      .query(newAccount)
      .expect(201);

    expect(response.body).toHaveProperty('account');
    expect(response.body.account).toHaveProperty('accountId');
    expect(response.body.account).toHaveProperty('title', newAccount.title);
    expect(response.body.account).toHaveProperty('group', newAccount.group);
  });

  it('should create an account with only title provided (group defaults to undefined)', async () => {
    const newAccount = {
      title: 'Sample Title2',
    };

    const response = await request(app)
      .post('/api/account/add')
      .query(newAccount)
      .expect(201);

    expect(response.body).toHaveProperty('account');
    expect(response.body.account).toHaveProperty('accountId');
    expect(response.body.account).toHaveProperty('title', newAccount.title);
    expect(response.body.account).toHaveProperty('group', 'undefined');
  });
});




describe('PUT /api/account/update', () => {

  beforeAll(async () =>{
    // clear the db and reset id increment
    await sequelize.query('DELETE FROM account');
    await sequelize.query('ALTER TABLE account AUTO_INCREMENT = 1;');

    // fill with accounts
    const firstAccount = {title: 'UpdateTestAccount1', group: 'Sample Group1'};
    const secondAccount = {title: 'UpdateTestAccount2'};
    const thirdAccount = {title: 'UpdateTestAccount3', group: 'Sample Group1'};

    await request(app)
      .post('/api/account/add')
      .query(firstAccount)
      .expect(201);

    await request(app)
      .post('/api/account/add')
      .query(secondAccount)
      .expect(201);

    await request(app)
      .post('/api/account/add')
      .query(thirdAccount)
      .expect(201);
  });


  // the update information
  const accountData = {
    group: "credits",
  };

  it('should update the group of the account', async () => {

    const response = await request(app)
      .put('/api/account/update')
      .query({accountId: 1})
      .send({"accountData" : accountData})
      .expect(201);

    // checks
    expect(response.body).toHaveProperty('updatedAccount');
    expect(response.body.updatedAccount).toBe(1);

  });
});



// *******************************************
// ***            Get test                 ***
// *******************************************

// describe('GET /api/account/group', () => {
//   beforeAll(async () => {
    
//   });

//   afterAll(async () => {
//     await sequelize.close();
//     closeServer();
//   });

//   it('responds with JSON and status code 201', async () => {
//     const response = await request(app).get('/api/account/group?group=credits');
//     expect(response.status).toBe(201);
//     expect(response.body).toEqual({
//       foundAccounts: [
//         {
//           "accountId": 6,
//           "title": "credit_4",
//           "group": "credits"
//         }
//       ]
//     });
//   });
// });




// afterAll(async () => {
//   await closeServer();
// });
