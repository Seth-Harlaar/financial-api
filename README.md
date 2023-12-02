# financial-api
An API written in JavaScript for keeping records of transactions on a users debit/credit card.

#### Transactions Table

| id | date | destination | debit | credit | balance | category |
| -- | ---- | ----------- | ----- | ------ | ------- | -------- |
0|2023-01-30|ESSO CIRCLE K|23.48||640.54|gas
1|2023-01-23|MOBILE DEPOSIT||693.24|1016.53|work
2|2023-01-10|#259 SPORT CHEK|14.68||2693.43|hockey


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

> | http code | content-type | response |
> | --------- | ------------ | -------- |
> | `201` | `text/plain;charset=UTF-8` | `Configuration created successfully` |
> | `400` | `application/json` | `{"message":"Bad Request"}` |
> | `500` | `application/json` | `{"error": "Internal Server Error", "message": error }` |

##### Example value for transactions

> ```javascript
> [{
>   // an example debit transaciton
>   tranDate: "2023-01-30",
>   destination: "ESSO CIRCLE K",
>   debit: 60.00,
>   credit: null,
>   balance: 5540.54,
>   category: "gas"
>}, {
>   // an example credit transaciton
>    tranDate: "2023-01-23",
>    destination: "MOBILE DEPOSIT",
>    debit: null,
>    credit: 693.24,
>    balance: 8834.51,
>    category: "work"
>}]
> ```

</details>


------------------------------------------------------------------------------------------
#### Reading transaction records
<!-- router.get('/transactionsType', TransactionController.getTransactionsByType); -->

<details>
 <summary><code>GET</code> <code><b>/transactionsType</b></code> </summary>

##### Query Parameters

> | name | type | data type | request location | description |
> | ---- | ---- | --------- | ---------------- |------------ |
> | transactions | not required, default all | string | header | the type of transaction to request (debit, credit, all) |


##### Responses

> | http code | content-type | response |
> | --------- | ------------ | -------- |
> | `201` | `application/json` | `{transactions}` |
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
>            "destination": "060 Veith Pass",
>            "debit": 739.64,
>            "credit": 240.62,
>            "balance": 458.42,
>            "category": "entertainment"
>        },
>        {
>            "tranid": 9,
>            "transaction_date": "2023-08-31",
>            "destination": "71 Division Junction",
>            "debit": 726.87,
>            "credit": 762.03,
>            "balance": 24.89,
>            "category": "utilities"
>        },
>    ]
>}
>> ```

</details>


<!-- routes to define

// read operations
router.get('/transactionsType', TransactionController.getTransactionsByType);
router.get('/transactionsSpecificDate', TransactionController.getTransactionsBySpecificDate);
router.get('/transactionsRangeDate', TransactionController.getTransactionsByRangeDate);

// delete operations
router.delete('/transaction/multiple', TransactionController.deleteTransactionMultiple);
 -->