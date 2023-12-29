# financial-api
An API written in JavaScript for keeping records of transactions on a users debit/credit card. Served via express.js with a MySQL database for persistent storage.

The motivation for this project is to create a personal storage for all a user's transactions and to have them easily accessible via an API.

Tech stack:
- express.js
- MySQL
- Sequelize

#### Transactions Table

| id | date | description | debit | credit | balance | category | account |
| -- | ---- | ----------- | ----- | ------ | ------- | -------- | ------- |
0|2023-01-30|ESSO CIRCLE K|23.48||640.54|gas | debit card |
1|2023-01-23|MOBILE DEPOSIT||693.24|1016.53|work | credit card | 
2|2023-01-10|#259 SPORT CHEK|14.68||2693.43|hockey | debit card 2


### API reference
---

**All api requests must be prefeced by the /api/ endpoint.**

### Transaction Endpoints






#### Creating new transaction records

<details>
 <summary><code>POST</code> <code><b>/transactions/multiple</b></code> </summary>

##### Request Body

> | name | required | data type | request location | description |
> | ---- | ---- | --------- | ---------------- |------------ |
> | transactions |  yes | JSON object | body | An array of JSON objects representing each transaction to be added to the database |

##### Responses

> | http code | content-type | response | description |
> | --------- | ------------ | -------- | ----------- |
> | `201` | `josn` | `{ "createdTransactions": []}` | An array of JSON objects representing each transaction that was added to the database.


##### Example value for transactions

> ```javascript
>{
>    "transactions": [{
>        // an example debit transaciton
>        "transaction_date": "2023-01-30",
>        "description": "ESSO CIRCLE K",
>        "debit": 60.00,
>        "credit": null,
>        "balance": 5540.54,
>        "category": "gas",
>    }, {
>        // an example credit transaciton
>        "transaction_date": "2023-01-23",
>        "description": "MOBILE DEPOSIT",
>        "debit": null,
>        "credit": 693.24,
>        "balance": 8834.51,
>        "category": "work"
>    }]
>}
> ```

##### Example response
> ```javascript
>{
>    "createdTransactions": [{
>            // The created debit transaction
>            "tranid": 63,
>            "transaction_date": "2023-01-30T00:00:00.000Z",
>            "description": "ESSO CIRCLE K",
>            "debit": 60,
>            "credit": null,
>            "balance": 5540.54,
>            "category": "gas",
>            "account": "debit card 2",
>        },
>        {
>            // The created credit transaction
>            "tranid": 64,
>            "transaction_date": "2023-01-23T00:00:00.000Z",
>            "description": "MOBILE DEPOSIT",
>            "debit": null,
>            "credit": 693.24,
>            "balance": 8834.51,
>            "category": "work"
>            "account": "debit card 2",
>        }
>    ]
>}
> ```


</details>

---






#### Reading transaction records

<details>
 <summary><code>GET</code> <code><b>/transactionsType</b></code> </summary>

##### Query Parameters

> | name | type | data type | description |
> | ---- | ---- | --------- | ----------- |
> | transactions | not required, default all | string | the type of transaction to request (debit, credit, all) |


##### Responses

> | http code | content-type | response | description |
> | --------- | ------------ | -------- | ----------- |
> | `201` | `application/json` | `{"transactions": []}` | An array of JSON objects representing the transactions that were found based on the type specified.


##### Example request
`localhost:3001/api/transactionsType?type=credit`

##### Example response
> ```javascript
>{
>    "transactions": [{
>            "tranid": 8,
>            "transaction_date": "2023-11-25",
>            "description": "060 Veith Pass",
>            "debit": 739.64,
>            "credit": 240.62,
>            "balance": 458.42,
>            "category": "entertainment"
>            "account": "debit card 2",
>        },
>        {
>            "tranid": 9,
>            "transaction_date": "2023-08-31",
>            "description": "71 Division Junction",
>            "debit": 726.87,
>            "credit": 762.03,
>            "balance": 24.89,
>            "category": "utilities"
>            "account": "debit card 2",
>        },
>    ]
>}
> ```

</details>




---

### Account Endpoints





#### Making accounts

<details>
 <summary><code>POST</code> <code><b>/account/add</b></code> </summary>

##### Query Parameters

> | name | required | data type | description |
> | ---- | -------- | --------- | ----------- |
> | title | yes | string | the name of the account to be created |
> | group | no, default undefined | string | the group of accounts the account will belong to |


##### Responses

> | http code | content-type | response | description |
> | --------- | ------------ | -------- | ----------- |
> | `201` | `application/json` | `{"account": {}}` | A JSON object representing the account just created. |


##### Example request
`localhost:3001/api/account/add?title=new acc`

##### Example response
```javascript
{
  "account": {
      "group": "undefined",
      "accountId": 4,
      "title": "new acc"
  }
}
```

</details>




#### Updating Accounts

<details>
 <summary><code>PUT</code> <code><b>/account/update</b></code> </summary>


##### Query Parameters

> | name | required | data type | description |
> | ---- | -------- | --------- | ----------- |
> | title | no | string | the title to update the account to |
> | group | no | string | the group to update the account to |


##### Responses

> | http code | content-type | response | description |
> | --------- | ------------ | -------- | ----------- |
> | `201` | `application/json` | `{"updatedAccount": 1}` | A value representing if changes were made (1) or not (0) |


##### Example request
`localhost:3001/api/account/update?accountId=1`

With the body:
```javascript
{
  "accountData": {
    "title": "new account name",
    "group": "new group name"
  }
}
```

##### Example response
```javascript
{
    "updatedAccount": 1
}
```

</details>










#### Getting accounts

<details>
 <summary><code>GET</code> <code><b>/account/</b></code> </summary>


##### Query Parameters
> | name | required | data type | description |
> | ---- | -------- | --------- | ----------- |
> | accountId | yes | int | the id of the account to get |



##### Responses

> | http code | content-type | response | description |
> | --------- | ------------ | -------- | ----------- |
> | `201` | `application/json` | `{"foundAccount": {}}` | A JSON object representing the account found. |


##### Example request
`localhost:3001/api/account/?accountId=1`


##### Example response
```javascript
{
  "foundAccount": {
      "group": "undefined",
      "accountId": 4,
      "title": "new acc"
  }
}
```

</details>









<details>
 <summary><code>GET</code> <code><b>/account/group</b></code> </summary>


##### Query Parameters
> | name | required | data type | description |
> | ---- | -------- | --------- | ----------- |
> | group | yes | int | the group to find accounts with |



##### Responses

> | http code | content-type | response | description |
> | --------- | ------------ | -------- | ----------- |
> | `201` | `application/json` | `{"foundAccounts": []}` | A JSON object with an array of the accounts found |


##### Example request
`localhost:3001/api/account/group?group=Sample group 1`


##### Example response
```javascript
{
  "foundAccounts": [
    {
        "group": "Sample group 1",
        "accountId": 3,
        "title": "new acc"
    },
    {
        "group": "Sample group 1",
        "accountId": 4,
        "title": "second acc"
    }
  ]
}
```

</details>





