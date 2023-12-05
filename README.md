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
------------------------------------------------------------------------------------------

**All api requests must be prefeced by the /api/ endpoint.**

#### Creating new transaction records

<details>
 <summary><code>POST</code> <code><b>/transactions/multiple</b></code> </summary>

##### Parameters

> | name | type | data type | request location | description |
> | ---- | ---- | --------- | ---------------- |------------ |
> | transactions |  required | JSON object | body | An array of JSON objects representing each transaction to be added to the database |

##### Responses

> | http code | content-type | response | description |
> | --------- | ------------ | -------- | ----------- |
> | `201` | `josn` | `{ "createdTransactions": []}` | An array of JSON objects representing each transaction that was added to the database.
> | `400` | `json` | `{"message":"Bad Request"}` | Incorrectly formatted response sent.
> | `500` | `json` | `{"error": "Internal Server Error", "message": error }` | An internal error, not relavent to user.

##### Example value for transactions

> ```javascript
>{
>    "transactions": [{
>        // an example debit transaciton
>        "transactionDate": "2023-01-30",
>        "description": "ESSO CIRCLE K",
>        "debit": 60.00,
>        "credit": null,
>        "balance": 5540.54,
>        "category": "gas",
>        "account": "debit card 1",
>    }, {
>        // an example credit transaciton
>        "transactionDate": "2023-01-23",
>        "description": "MOBILE DEPOSIT",
>        "debit": null,
>        "credit": 693.24,
>        "balance": 8834.51,
>        "category": "work"
>        "account": "debit card 1",
>    }]
>}
> ```

##### Example resposne
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
>            "category": "gas"
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


------------------------------------------------------------------------------------------
#### Reading transaction records

<details>
 <summary><code>GET</code> <code><b>/transactionsType</b></code> </summary>

##### Query Parameters

> | name | type | data type | request location | description |
> | ---- | ---- | --------- | ---------------- |------------ |
> | transactions | not required, default all | string | header | the type of transaction to request (debit, credit, all) |


##### Responses

> | http code | content-type | response | description |
> | --------- | ------------ | -------- | ----------- |
> | `201` | `application/json` | `{"transactions": []}` | An array of JSON objects representing the transactions that were found based on the type specified.
> | `400` | `application/json` | `{"message":"Bad Request"}` |
> | `500` | `application/json` | `{"error": "Internal Server Error", "message": error }` |

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
>        },
>        {
>            "tranid": 9,
>            "transaction_date": "2023-08-31",
>            "description": "71 Division Junction",
>            "debit": 726.87,
>            "credit": 762.03,
>            "balance": 24.89,
>            "category": "utilities"
>        },
>    ]
>}
> ```

</details>


<!-- routes to define

// read operations
router.get('/transactionsType', TransactionController.getTransactionsByType);
router.get('/transactionsSpecificDate', TransactionController.getTransactionsBySpecificDate);
router.get('/transactionsRangeDate', TransactionController.getTransactionsByRangeDate);

// delete operations
router.delete('/transaction/multiple', TransactionController.deleteTransactionMultiple);
 -->
