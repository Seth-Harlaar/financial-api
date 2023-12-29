
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



// *******************************************
// ***          Update test                ***
// *******************************************

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

  
  it('should update the title of the account', async () => {
    const accountUpdateData = {
      title: "UpdatedAccountTitle1",
    };

    const response = await request(app)
      .put('/api/account/update')
      .query({accountId: 1})
      .send({"accountData" : accountUpdateData})
      .expect(201);

    expect(response.body).toHaveProperty('updatedAccount');
    expect(response.body.updatedAccount).toBe(1);

    // then reqeust the account and verify the information
    const updatedAccountCheck = await request(app)
      .get('/api/account/')
      .query({accountId: 1})
      .expect(201);

    expect(updatedAccountCheck.body).toHaveProperty('foundAccount');
    expect(updatedAccountCheck.body.foundAccount).toHaveProperty('title');
    expect(updatedAccountCheck.body.foundAccount.title).toBe('UpdatedAccountTitle1');
  });


  it('should update the group of the account', async () => {
    // the update information
    const accountUpdateData = {
      group: "UpdateAccountGroup",
    };

    const response = await request(app)
      .put('/api/account/update')
      .query({accountId: 2})
      .send({"accountData" : accountUpdateData})
      .expect(201);

    // checks
    expect(response.body).toHaveProperty('updatedAccount');
    expect(response.body.updatedAccount).toBe(1);

    // then reqeust the account and verify the information
    const updatedAccountCheck = await request(app)
      .get('/api/account/')
      .query({accountId: 2})
      .expect(201);

    expect(updatedAccountCheck.body).toHaveProperty('foundAccount');
    expect(updatedAccountCheck.body.foundAccount).toHaveProperty('group');
    expect(updatedAccountCheck.body.foundAccount.group).toBe('UpdateAccountGroup');
  });
  
    
  it('should update the title and group of the account', async () => {
    // update information
    const accountUpdateData3 = {
      title: "UpdatedAccountTitle2",
      group: "UpdatedAccountGroup2"
    }

    // make request and check response
    const response = await request(app)
      .put('/api/account/update')
      .query({accountId: 3})
      .send({"accountData" : accountUpdateData3})
      .expect(201);

    expect(response.body).toHaveProperty('updatedAccount');
    expect(response.body.updatedAccount).toBe(1);

    // then reqeust the account and verify the information
    const updatedAccountCheck = await request(app)
    .get('/api/account/')
    .query({accountId: 3})
    .expect(201);

    expect(updatedAccountCheck.body).toHaveProperty('foundAccount');
    expect(updatedAccountCheck.body.foundAccount).toHaveProperty('title');
    expect(updatedAccountCheck.body.foundAccount.title).toBe('UpdatedAccountTitle2');
    expect(updatedAccountCheck.body.foundAccount).toHaveProperty('group');
    expect(updatedAccountCheck.body.foundAccount.group).toBe('UpdatedAccountGroup2');
  });

  
  it('should fail to update the acount title because another account has that title', async () => {

    const accountUpdateData = {
      title: "UpdatedAccountTitle1"
    }

    const response = await request(app)
      .put('/api/account/update')
      .query({accountId: 2})
      .send({"accountData" : accountUpdateData})
      .expect(500);

  });
});



// *******************************************
// ***            Get test                 ***
// *******************************************

describe('GET /api/account', () => {

  beforeAll(async () =>{
    // clear the db and reset id increment
    await sequelize.query('DELETE FROM account');
    await sequelize.query('ALTER TABLE account AUTO_INCREMENT = 1;');

    // put in one account
    const firstAccount = {title: 'GetTestAccount1', group: 'Sample Group 1'};

    await request(app)
      .post('/api/account/add')
      .query(firstAccount)
      .expect(201);
  });


  it('should retrieve the account in the database', async () => {
    const response = await request(app)
      .get('/api/account')
      .query({accountId: 1})
      .expect(201);

    expect(response.body).toHaveProperty('foundAccount');
    expect(response.body.foundAccount).toHaveProperty('title');
    expect(response.body.foundAccount.title).toBe('GetTestAccount1');
    expect(response.body.foundAccount).toHaveProperty('group');
    expect(response.body.foundAccount.group).toBe('Sample Group 1');
  });


  it('should return an empty object', async () => {
    const response = await request(app)
      .get('/api/account')
      .query({accountId: 2})
      .expect(201);

    expect(response.body).toStrictEqual({});
  });
});


describe('GET /api/account/group', () =>{

  beforeAll(async () =>{
    // clear the db and reset id increment
    await sequelize.query('DELETE FROM account');
    await sequelize.query('ALTER TABLE account AUTO_INCREMENT = 1;');

    // fill with accounts
    const firstAccount = {title: 'GetTestAccount1', group: 'Sample Group 1'};
    const secondAccount = {title: 'GetTestAccount2'};
    const thirdAccount = {title: 'GetTestAccount3', group: 'Sample Group 1'};

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


  it('should return two accounts', async() => {
    const response  = await request(app)
      .get('/api/account/group')
      .query({group: 'Sample Group 1'})
      .expect(201);

    expect(response.body).toHaveProperty('foundAccounts');
    expect(Array.isArray(response.body.foundAccounts)).toBe(true);
    expect(response.body.foundAccounts.length).toBe(2);
  });
});



// *******************************************
// ***          Delete test                ***
// *******************************************


describe('DELETE /api/account/rm', () => {

  beforeAll(async () =>{
    // clear the db and reset id increment
    await sequelize.query('DELETE FROM account');
    await sequelize.query('ALTER TABLE account AUTO_INCREMENT = 1;');

    // put in two accounts, the second having a transaction linked to it
    const firstAccount = {title: 'DeleteTestAccount', group: 'Sample Group 1'};
    const secondAccount = {title: 'UpdateTestAccount2'};

    const transactions = [
      {
        // an example debit transaciton
        "transaction_date": "2023-01-30",
        "description": "ESSO CIRCLE K",
        "debit": 60.00,
        "credit": null,
        "balance": 5540.54,
        "category": "gas",
      }, {
        // an example credit transaciton
        "transaction_date": "2023-01-23",
        "description": "MOBILE DEPOSIT",
        "debit": null,
        "credit": 693.24,
        "balance": 8834.51,
        "category": "work"
      }
    ]

    await request(app)
      .post('/api/account/add')
      .query(firstAccount)
      .expect(201);

    await request(app)
      .post('/api/account/add')
      .query(secondAccount)
      .expect(201);

    await request(app)
      .post('/api/transaction/add')
      .query({accountId: 2})
      .send({transactions: transactions})
      .expect(201);
  });

  it('should delete the acccount', async () => {

    const response = await request(app)
      .delete('/api/account/rm')
      .query({accountId: 1})
      .expect(201);

    expect(response.body).toHaveProperty('deletedAccount');
    expect(response.body.deletedAccount).toHaveProperty('transactionsDeleted');
    expect(response.body.deletedAccount.transactionsDeleted).toBe(0);
    expect(response.body.deletedAccount).toHaveProperty('accountDeleted');
    expect(response.body.deletedAccount.accountDeleted).toBe(1);
  });


  it('should fail to delete anything and return 500', async () => {
    
    await request(app)
      .delete('/api/account/rm')
      .query({accountId: 1})
      .expect(500);
  });

  it('should delete the acccount and all associated transactions', async () => {

    const response = await request(app)
      .delete('/api/account/rm')
      .query({accountId: 2})
      .expect(201);

    expect(response.body).toHaveProperty('deletedAccount');
    expect(response.body.deletedAccount).toHaveProperty('transactionsDeleted');
    expect(response.body.deletedAccount.transactionsDeleted).toBe(2);
    expect(response.body.deletedAccount).toHaveProperty('accountDeleted');
    expect(response.body.deletedAccount.accountDeleted).toBe(1);
  });

});