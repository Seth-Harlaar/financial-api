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

#### Creating new transaction records

<details>
 <summary><code>POST</code> <code><b>/transactions/multiple</b></code> </summary>

##### Parameters
<!--
    const {tranDate, dest, debit, credit, balance, category } = tranData;
 -->

> | name | type | data type | description |
> | ---- | ---- | --------- | ----------- |
> | transactions |  required | JSON object | An array of JSON objects representing each transaction to be added to the database |

<!-- [{tranDate: "2023-01-30",destination:"ESSO CIRCLE K",debit:23.48, credit: null, balance: 640.54, category: "gas"},{1|2023-01-23|MOBILE DEPOSIT||693.24|1016.53|work}] -->

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

<!-- // TRANSACTION ROUTES

// read operations
router.get('/transactionsType', TransactionController.getTransactionsByType);
router.get('/transactionsSpecificDate', TransactionController.getTransactionsBySpecificDate);
router.get('/transactionsRangeDate', TransactionController.getTransactionsByRangeDate);

// delete operations
router.delete('/transaction/multiple', TransactionController.deleteTransactionMultiple);
 -->