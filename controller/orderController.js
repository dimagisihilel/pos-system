import OrderItemsModel from "../model/OrderItemsModel.js";

import {orderItems} from "../db/DB.js";
import {customers} from "../db/DB.js";


$("#navOrder").on("click", () => {

    let orderIdCounter = 1;
    $("#orderId").val(orderIdCounter);

    let today = new Date().toISOString().slice(0, 16); // Get the current date and format it for input type="datetime-local"
    $("#orderDate").val(today);

    // Load all customer IDs into the dropdown
    console.log("BLa bla bla bla :", customers);
    customers.forEach(customers => {
        console.log(`Adding customer ID: ${customers.customerid}`); // Debug: Log each customer ID being added
        $("#customerIdDropdown").append(`<option value="${customers.customerid}">${customers.customerid}</option>`);
    });

    // Load relevant customer name when a customer ID is selected
    $("#customerIdDropdown").on('change', function() {
        let selectedCustomerId = $(this).val();
        console.log("Selected Customer ID:", selectedCustomerId);
        let selectedCustomer = customers.find(customer => customer.customerid === selectedCustomerId);
        console.log("Selected Customer:", selectedCustomer);
        if (selectedCustomer) {
            $("#customerName").val(selectedCustomer.name);
        } else {
            $("#customerName").val('');
        }
    });
});
