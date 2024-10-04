// All Data interactions are stored in the model of the M-V-C appraoch.
// This file will have functions that interact with the tables `classification` and `inventory`

const pool = require("../database/")

/* ***************************
 *  Get all classification data
 * ************************** */
// Query Purpose: retrieve all car classification data.
async function retrieveCarClassifications()
{
  const selectQuery = `
    SELECT * FROM public.classification
    ORDER BY classification_name
  `;
  const data = await pool.query(selectQuery);

  return data;
}

/* ***************************
 *  Inventory Data by Class Id
 * ************************** */
// Query Purpose: Retrieve inventory data based on the given classification_id.
async function retrieveInventoryDataByClassificationId(classification_id) 
  {
    const selectQuery = ` 
      SELECT * FROM public.inventory AS i 
      JOIN public.vehicle_status as v_s
      ON i.inv_id = v_s.inv_id
      JOIN public.classification AS c 
      ON i.classification_id = c.classification_id 
      WHERE i.classification_id = $1
      `;

    const data = await pool.query(selectQuery, [classification_id]);
    
    return data.rows;
}
  

/* ***************************
 *  Get vehicle by inventory ID
 * ************************** */
// Query Purpose: Retrieve vehicle data by inv_id.
async function retrieveVehicleDataById(inv_id) {
  const selectQuery = `
    SELECT * FROM public.inventory AS i
    JOIN public.vehicle_status as v_s
    ON i.inv_id = v_s.inv_id
    WHERE i.inv_id = $1
  `;

  const data = await pool.query(selectQuery, [inv_id]);

  return data.rows;
}

/* ***************************
 *  Select classification by id 
 * ************************** */
async function checkExistingClassById(classification_id) {
  try {
    const selectQuery = `SELECT * FROM public.classification WHERE classification_id = $1`;
    
    const data = await pool.query(selectQuery, [classification_id]);

    // Check if any rows were returned
    return data.rows.length > 0;
  } catch (error) {
    console.error('checkExistingCatById error:', error);
    throw error;
  }
}

/* ***************************
 *  Insert a new classification
 * ************************** */
async function insertNewVehicleClassificationByName(classification_name) {
  try {
    const insertQuery = `INSERT INTO public.classification (classification_name) VALUES ($1) RETURNING *`;
    
    const data = await pool.query(insertQuery, [classification_name]);
    
    console.log("Inserted classification data:", data.rows);

    return data.rows[0];
  } catch (err) {
    console.error("insertNewVehicleClassificationByName error:", err);
    throw err;
  }
}

/* ***************************
 *  Check if a new classification already exists
 * ************************** */
async function checkExistingClass(classificationName) {
  const selectQuery = 
    `
    SELECT * FROM public.classification 
    WHERE classification_name = $1
    `;
  const data = await pool.query(selectQuery, [classificationName]);
  return data.rows.length > 0; // Returns true if the classification already exists
}

/* ***************************
 *  Insert a new inventory item
 * ************************** */
async function insertNewInventoryItem(
  inv_make,
  inv_model,
  inv_year,
  inv_description,
  inv_image,
  inv_thumbnail,
  inv_price,
  inv_miles,
  inv_color,
  classification_id
) {
  try {
    const insertQuery = `
      INSERT INTO public.inventory 
      ( inv_make, 
        inv_model, 
        inv_year, 
        inv_description, 
        inv_image, 
        inv_thumbnail, 
        inv_price, 
        inv_miles, 
        inv_color, 
        classification_id
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *
    `;

    const result = await pool.query(insertQuery, [
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
      classification_id,
    ]);

    return result.rows[0]; // Assuming you only expect one row to be returned
  } catch (error) {
    console.error(`Error in insertNewInventoryItem: ${error.message}`);
    throw error;
  }
}


/* ***************************
 *  Update inventory item
 * ************************** */
async function updateVehicleData(
  inv_id,
  inv_make,
  inv_model,
  inv_year,
  inv_description,
  inv_image,
  inv_thumbnail,
  inv_price,
  inv_miles,
  inv_color,
  classification_id,
) {
  try {
    const updateQuery = `
      UPDATE public.inventory 
      SET
        inv_make = $1,
        inv_model = $2,
        inv_year = $3,
        inv_description = $4,
        inv_image = $5, 
        inv_thumbnail = $6, 
        inv_price = $7, 
        inv_miles = $8, 
        inv_color = $9, 
        classification_id = $10
      WHERE inv_id = $11
      RETURNING *
    `;

    const result = await pool.query(updateQuery, [
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
      classification_id,
      inv_id
    ]);

    return result.rows[0];
  } catch (error) {
    console.error(`Model error: ${error.message}`);
    throw error;
  }
}

/* ***************************
 *  Delete inventory item
 * ************************** */
async function deleteVehicleData(inv_id) 
{
  try {
    const deleteQuery = `
      DELETE FROM public.inventory 
      WHERE inv_id = $1
    `;

    const result = await pool.query(deleteQuery, [inv_id]);

    return result;
  } catch (error) {
    console.error(`Delete Inventory Error: ${error.message}`);
    throw error;
  }
}

module.exports = {
                  retrieveCarClassifications, 
                  retrieveInventoryDataByClassificationId, 
                  retrieveVehicleDataById,
                  insertNewVehicleClassificationByName, 
                  insertNewInventoryItem, 
                  checkExistingClass, 
                  checkExistingClassById, 
                  updateVehicleData,
                  deleteVehicleData
                };