import OrderItemsModel from "../model/OrderItemsModel.js";

import {orderItems} from "../db/DB.js";
import {customers} from "../db/DB.js";
import {items} from "../db/DB.js";

let orderIdCounter = 1;

function updateTotal() {
    let total = 0;
    $(".PurchaseTbl tbody tr").each(function () {
        let rowTotal = parseFloat($(this).find("td:nth-child(5)").text());
        total += rowTotal;
    });
    $("#total").val(total.toFixed(2));
    $("#discount").val('');
    $("#newTotal").val('');
    $("#paidAmount").val('');
    $("#balance").val('');
}

/*
 if you want to give the discout as a number not as a %
function updateNewTotal() {
    let total = parseFloat($("#total").val()) || 0;
    let discount = parseFloat($("#discount").val()) || 0;
    let newTotal = total - discount;
    $("#newTotal").val(newTotal.toFixed(2));
}
*/

function updateNewTotal() {
    let total = parseFloat($("#total").val()) || 0;
    let discountPercent = parseFloat($("#discount").val()) || 0;

    if (discountPercent > 0) {
        let discountAmount = (total * discountPercent) / 100;
        let newTotal = total - discountAmount;
        $("#newTotal").val(newTotal.toFixed(2));
    } else {
        $("#newTotal").val('');
    }
}

function updateBalance() {
    let newTotal = parseFloat($("#newTotal").val()) || 0;
    let paidAmount = parseFloat($("#paidAmount").val()) || 0;

    if (paidAmount > 0) {
        let balance = paidAmount - newTotal;
        $("#balance").val(balance.toFixed(2));
    } else {
        $("#balance").val('');
    }
}

function clearFormInputs() {
    $("#customerIdDropdown").val('');
    $("#customerName").val('');
    $("#itemIdDropdown").val('');
    $("#itemOdDescription").val('');
    $("#itemOdUnitPrice").val('');
    $("#itemOdQty").val('');
    $("#itemOdOrderQty").val('');
    $("#itemOdTotPrice").val('');
    $("#total").val('');
    $("#discount").val('');
    $("#newTotal").val('');
    $("#paidAmount").val('');
    $("#balance").val('');
    $(".PurchaseTbl tbody").empty();
}

$("#navOrder").on("click", () => {

    //let orderIdCounter = 1;
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

            // Update total
            updateTotal();
        });

        // Update total
        updateTotal();
    }
});

// Update new total when discount is changed
$("#discount").on('input', function () {
    updateNewTotal();
});

// Update balance when paid amount is changed
$("#paidAmount").on('input', function () {
    updateBalance();
});

// Handle purchase button click
$("#btnpurchase").on('click', function () {
    let customerId = $("#customerIdDropdown").val();
    let orderDate = $("#orderDate").val();
    let total = parseFloat($("#total").val());
    let discount = parseFloat($("#discount").val());
    let newTotal = parseFloat($("#newTotal").val());
    let paidAmount = parseFloat($("#paidAmount").val());
    let balance = parseFloat($("#balance").val());

    // Add each item in the table to the orderItems array
    $(".PurchaseTbl tbody tr").each(function () {
        let itemId = $(this).find("th").text();
        let description = $(this).find("td:nth-child(2)").text();
        let unitPrice = parseFloat($(this).find("td:nth-child(3)").text().replace('Rs.', ''));
        let orderQty = parseInt($(this).find("td:nth-child(4)").text());
        let total = parseFloat($(this).find("td:nth-child(5)").text());

        let orderItem = new OrderItemsModel(orderIdCounter, customerId, orderDate, itemId, description, unitPrice, orderQty, total);
        orderItems.push(orderItem);
    });

    // Display the bill in the modal
    let billContent = `
        <p>Order ID: ${orderIdCounter}</p>
        <p>Customer ID: ${customerId}</p>
        <p>Order Date: ${orderDate}</p>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Item ID</th>
                    <th scope="col">Description</th>
                    <th scope="col">Unit Price</th>
                    <th scope="col">Order Quantity</th>
                    <th scope="col">Total</th>
                </tr>
            </thead>
            <tbody>
    `;

    $(".PurchaseTbl tbody tr").each(function () {
        let itemId = $(this).find("th").text();
        let description = $(this).find("td:nth-child(2)").text();
        let unitPrice = $(this).find("td:nth-child(3)").text();
        let orderQty = $(this).find("td:nth-child(4)").text();
        let total = $(this).find("td:nth-child(5)").text();

        billContent += `
            <tr>
                <td>${itemId}</td>
                <td>${description}</td>
                <td>${unitPrice}</td>
                <td>${orderQty}</td>
                <td>${total}</td>
            </tr>
        `;
    });

    billContent += `
            </tbody>
        </table>
        <p>Total: Rs. ${total.toFixed(2)}</p>
        <p>Discount: ${discount}%</p>
        <p>New Total: Rs. ${newTotal.toFixed(2)}</p>
        <p>Paid Amount: Rs. ${paidAmount.toFixed(2)}</p>
        <p>Balance: Rs. ${balance.toFixed(2)}</p>
    `;

    $("#billContent").html(billContent);

    // Show the modal
    $('#billModal').modal('show');

    // Increment order ID for the next order
    orderIdCounter++;

    // Clear form inputs
    clearFormInputs();

    // Display next order ID
    $("#orderId").val(orderIdCounter);















    /*
        // Increment order ID for the next order
        orderIdCounter++;

        // Clear form inputs
        clearFormInputs();

        // Display next order ID
        $("#orderId").val(orderIdCounter);

        // Show success message (optional)
        alert("Order placed successfully!");*/
});