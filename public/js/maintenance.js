// Used in the maintenance-management.ejs file.

'use strict' 
 
 // Get a list of items in inventory based on the classification_id 
 let vehicleInventoryList = document.querySelector("#vehicleInventoryList")
 vehicleInventoryList.addEventListener("change", function () { 
  let inv_id = vehicleInventoryList.value 
  console.log(`inv_id is: ${inv_id}`) 
  let invIdURL = "/maintenance/getVehicleInventory/"+inv_id 
  fetch(invIdURL) 
  .then(function (response) { 
   if (response.ok) { 
    return response.json(); 
   } 
   throw Error("Network response was not OK"); 
  }) 
  .then(function (data) { 
   console.log(data); 
   buildRecordList(data); 
  }) 
  .catch(function (error) { 
   console.log('There was a problem: ', error.message) 
  }) 
 })



 function buildRecordList(data) {
  let recordDisplay = document.getElementById("recDisplay");
  // Set up the table labels
  let dataTable = '<div class="table-container"><table>';
  dataTable += '<thead>';
  dataTable += `<tr><th colspan="4" class="table-title">${inv_make} ${inv_model} Maintenance Records</th></tr>`;
  dataTable += '<tr><th class="maintenance-date">Maintenance Date</th><th class="maintenance-type">Maintenance Type</th><td>&nbsp;</td><td>&nbsp;</td></tr>';
  dataTable += '</thead>';
  // Set up the table body
  dataTable += '<tbody>';
  // Iterate over all maintenance history records in the array and put each in a row
  data.forEach(function (element) {
      console.log(element.maintenance_date + ", " + element.maintenance_type);
      dataTable += `<tr>`;
      dataTable += `<td class="maintenance-date">${element.maintenance_date}</td>`;
      dataTable += `<td class="maintenance-type">${element.maintenance_type}</td>`;
      dataTable += `<td><div class="management-modify-button"><a href='/maintenance/view/${element.maintenance_history_id}' title='Click to view the full record.' class="View">View</a></div></td>`;
      dataTable += `<td><div class="management-modify-button"><a href='/maintenance/edit/${element.maintenance_history_id}' title='Click to update the record.' class="modify">Modify</a></div></td>`;
      dataTable += `<td><div class="management-delete-button"><a href='/maintenance/delete/${element.maintenance_history_id}' title='Click to delete the record.' class="delete">Delete</a></div></td>`;
      dataTable += `</tr>`;
  })
  dataTable += '</tbody>';
  dataTable += '</table></div>'; // Closing the table and div
  // Display the contents in the Maintenance History view
  recordDisplay.innerHTML = dataTable;
}

