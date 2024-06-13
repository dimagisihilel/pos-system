import OrderItemsModel from "../model/OrderItemsModel.js";

import {orderItems} from "../db/DB.js";
import {customers} from "../db/DB.js";
import {items} from "../db/DB.js";


$("#navOrder").on("click", () => {

    let orderIdCounter = 1;
    $("#orderId").val(orderIdCounter);

    let today = new Date().toISOString().slice(0, 16); // Get the current date and format it for input type="datetime-local"
    $("#orderDate").val(today);

    // Load all customer IDs into the dropdown

    $("#customerIdDropdown").empty();
    $("#customerIdDropdown").append('<option value="" selected disabled>Select Customer Id</option>');


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


    // Load all item IDs into the dropdown
    $("#itemIdDropdown").empty();
    $("#itemIdDropdown").append('<option value="" selected disabled>Select Item Id</option>');

    items.forEach(item => {
        console.log(`Adding item ID: ${item.itemid}`); // Debug: Log each item ID being added
        $("#itemIdDropdown").append(`<option value="${item.itemid}">${item.itemid}</option>`);
    });

    // Load relevant item details when an item ID is selected
    $("#itemIdDropdown").on('change', function() {
        let selectedItemId = $(this).val();
        console.log("Selected Item ID:", selectedItemId);
        let selectedItem = items.find(item => item.itemid === selectedItemId);
        console.log("Selected Item:", selectedItem);
        if (selectedItem) {
            $("#itemOdDescription").val(selectedItem.description);
            $("#itemOdUnitPrice").val(selectedItem.unitprice);
            $("#itemOdQty").val(selectedItem.qty);
        } else {
            $("#itemOdDescription").val('');
            $("#itemOdUnitPrice").val('');
            $("#itemOdQty").val('');
        }
    });

    // Calculate the total amount when order quantity is entered
    $("#itemOdOrderQty").on('input', function () {
        let unitPrice = parseFloat($("#itemOdUnitPrice").val());
        let orderQty = parseInt($("#itemOdOrderQty").val());
        if (!isNaN(unitPrice) && !isNaN(orderQty)) {
            let totalPrice = unitPrice * orderQty;
            $("#itemOdTotPrice").val(totalPrice.toFixed(2));
        }
    });

});


// Add item to the table and reduce quantity on hand
$("#btnAddItem").on('click', function () {
    let selectedItemId = $("#itemIdDropdown").val();
    let selectedItem = items.find(item => item.itemid === selectedItemId);

    if (selectedItem) {
        let orderQty = parseInt($("#itemOdOrderQty").val());
        let totalPrice = parseFloat($("#itemOdTotPrice").val());

        // Reduce quantity on hand
        selectedItem.qty -= orderQty;
        $("#itemOdQty").val(selectedItem.qty);

        // Add item details to the table
        let newRow = `
                <tr>
                    <th scope="row">${selectedItem.itemid}</th>
                    <td>${selectedItem.description}</td>
                    <td>Rs.${selectedItem.unitprice}</td>
                    <td>${orderQty}</td>
                    <td>${totalPrice.toFixed(2)}</td>
                    <td><button type="button" class="btn btn-danger btnDelete">Delete</button></td>
                </tr>
            `;
        $(".PurchaseTbl tbody").append(newRow);

        // Add delete button functionality
        $(".btnDelete").last().on('click', function () {
            // Restore quantity on hand
            selectedItem.qty += orderQty;
            $("#itemOdQty").val(selectedItem.qty);

            // Remove row from table
            $(this).closest('tr').remove();
        });
    }
});
