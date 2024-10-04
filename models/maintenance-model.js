// Assignment 6

// All Data interactions are stored in the model of the M-V-C appraoch.
// This file will have functions that interact with the tables `classification` and `inventory`

const pool = require("../database/")

/* ***************************
 *  retrieveInventoryReports
 * ************************** */
// Query Purpose: retrieve all vehicle inventory reports
async function retrieveAllInventoryReports()
{
  const selectQuery = `
    SELECT * FROM public.maintenance_history
    ORDER BY maintenance_type DESC
  `;
  const data = await pool.query(selectQuery);

  return data;
}

/* ***************************
 *  retrieveAllVehicleInventory
 * ************************** */
// Query Purpose: retrieve all vehicles in the inventory
async function retrieveAllVehicleInventory()
{
  const selectQuery = `
    SELECT * FROM public.inventory
    ORDER BY inv_make DESC
  `;
  const data = await pool.query(selectQuery);

  return data;
}

/* ***************************
 *  retrieveAllVehicleInventory
 * ************************** */
// Query Purpose: retrieve all the mechanics from the database.
async function retrieveAllMechanics()
{
  const selectQuery = `
    SELECT * FROM public.mechanic_employee
    ORDER BY last_name DESC
  `;
  const data = await pool.query(selectQuery);

  return data;
}

/* ***************************
 *  retrieveMaintenanceHistory
 * ************************** */
// Query Purpose: retrieve all the mechanics from the database.
async function retrieveMaintenanceHistory()
{
  const selectQuery = `
    SELECT i.inv_make, i.inv_model, m_e.first_name || ' ' || m_e.last_name AS mechanic, m_h.maintenance_date, m_h.maintenance_type, m_h.maintenance_description, m_h.cost, m_h.parts_replaced, m_h.notes 
    FROM public.inventory as i
    JOIN public.maintenance_history as m_h
    ON i.inv_id = m_h.inv_id
    JOIN public.mechanic_employee AS m_e 
    ON m_h.mechanic_id = m_e.mechanic_id 
    ORDER BY last_name DESC
  `;
  const data = await pool.query(selectQuery);

  return data;
}

/* ***************************
 *  retrieveAllStatusTypes
 * ************************** */
// Query Purpose: retrieve all the mechanics from the database.
async function retrieveAllStatusTypes() {
  const selectQuery = `
    SELECT inventory_status_type
    FROM public.inventory_status 
  `;
  const data = await pool.query(selectQuery);

  return data;
}

/* ***************************
 *  retrieveAllVehicleInventoryIdMakeModel
 * ************************** */
// Query Purpose: retrieve all the mechanics from the database.
async function retrieveAllVehicleInventoryIdMakeModel() {
  const selectQuery = `
    SELECT inv_id, inv_make, inv_model
    FROM public.inventory
  `;
  const data = await pool.query(selectQuery);

  return data;
}

/* ***************************
 *  retrieveAllMechanicsById
 * ************************** */
// Query Purpose: retrieve all the mechanics from the database.
async function retrieveAllMechanicsById() {
  const selectQuery = `
    SELECT inv_id, inv_make, inv_model
    FROM public.inventory
  `;
  const data = await pool.query(selectQuery);

  return data;
}


module.exports = {
                  retrieveAllInventoryReports,
                  retrieveAllVehicleInventory,
                  retrieveAllMechanics,
                  retrieveMaintenanceHistory,
                  retrieveAllStatusTypes,
                  retrieveAllVehicleInventoryIdMakeModel,
                  retrieveAllMechanicsById
                };