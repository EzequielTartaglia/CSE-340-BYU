const pool = require("../database/");

/* *****************************
*   Register new account
* *************************** */
// Purpose: insert a new account into the account table.
async function insertNewUserAccount(account_firstname, account_lastname, account_email, account_password){
    try {
      const insertQuery = 
        `INSERT INTO public.account 
          (
            account_firstname, 
            account_lastname, 
            account_email, 
            account_password, 
            account_type
          ) 
        VALUES ($1, $2, $3, $4, 'Client') 
        RETURNING *`;
      
        const data = await pool.query(insertQuery, [account_firstname, account_lastname, account_email, account_password]);

      return data;
    } catch (error) {
      return error.message
    }
  }

/* *****************************
*   Check if email exists 
* *************************** */
// Purpose: insert a new account into the account table.
async function checkIfEmailExists(account_email) {
  try {
    const selectQuery = `SELECT * FROM public.account WHERE account_email = $1`
    const data = await pool.query(selectQuery, [account_email])
    return data.rowCount
  } catch (error) {
    return error.message
  }
}

/* *****************************
*   Check if Account Exists
* *************************** */
// Purpose: Retrieves a users account by email to see if the account exists.
async function retrieveUserAccountByEmail(account_email) {
  try {
    const selectQuery = await pool.query(
      `SELECT 
        account_id, 
        account_firstname, 
        account_lastname, 
        account_email, 
        account_type, 
        account_password 
      FROM public.account 
      WHERE account_email = $1
      `,
      [account_email])
    return selectQuery.rows[0]
  } catch (error) {
    return new Error("No matching email found")
  }
}

/* *****************************
*   Check if Account Exists
* *************************** */
// Purpose: Retrieves a users account by email to see if the account exists.
async function retrieveUserAccountById(account_id) {
  try {
    const selectQuery = await pool.query(
      `SELECT 
        account_id, 
        account_firstname, 
        account_lastname, 
        account_email, 
        account_type, 
        account_password 
      FROM public.account 
      WHERE account_id = $1
      `,
      [account_id])
    return selectQuery.rows[0]
  } catch (error) {
    return new Error("No matching email found")
  }
}

/* *****************************
* Update user password
* ***************************** */
// Purpose: Updates a users password.
async function updateAccountPassword(account_password, account_id) {
  try {
    const updateQuery = `UPDATE public.account SET account_password = $1 WHERE account_id = $2`
    
    const result = await pool.query(updateQuery, [account_password, account_id])
    
    return result.rowCount
  } catch (error) {
    console.error("Update Account Password Error: " + error)
  }
}

module.exports = {insertNewUserAccount, checkIfEmailExists, retrieveUserAccountByEmail, retrieveUserAccountById, updateAccountPassword};