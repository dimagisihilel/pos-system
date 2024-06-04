import ItemModel from "../model/ItemModel.js";

import {items} from "../db/DB.js";


// Define a variable to store the index of the clicked row
var selectedRowIndex = -1;


// Validate item form fields
function validateItemForm(id, description, price, qty) {
    let isValid = true;

    // Reset input styles and error messages
    $('input').removeClass('invalid-input');
    $('.error-message').hide();

    // Validate ID: alphanumeric
    const idPattern = /^[a-zA-Z0-9]+$/;
    if (!id || !idPattern.test(id)) {
        $('#itemId').addClass('invalid-input');
        $('#itemIdError').text('ID must be alphanumeric.').show();
        isValid = false;
    }

    // Validate Description: non-empty
    if (!description) {
        $('#itemDescription').addClass('invalid-input');
        $('#itemDescriptionError').text('Description cannot be empty.').show();
        isValid = false;
    }

    // Validate Price: positive number
    const pricePattern = /^\d+(\.\d{1,2})?$/;
    if (!price || !pricePattern.test(price) || parseFloat(price) <= 0) {
        $('#unitPrice').addClass('invalid-input');
        $('#itemPriceError').text('Price must be a positive number.').show();
        isValid = false;
    }

    // Validate Quantity: positive integer
    const qtyPattern = /^\d+$/;
    if (!qty || !qtyPattern.test(qty) || parseInt(qty) <= 0) {
        $('#qty').addClass('invalid-input');
        $('#itemQtyError').text('Quantity must be a positive integer.').show();
        isValid = false;
    }

    return isValid;
}
function validateUpdateForm(id, description, price, qty) {
    let isValid = true;

    // Reset input styles and error messages
    $('input').removeClass('invalid-input');
    $('.error-message').hide();

    // Validate ID: alphanumeric
    const idPattern = /^[a-zA-Z0-9]+$/;
    if (!id || !idPattern.test(id)) {
        $('#itemEditId').addClass('invalid-input');
        $('#itemEditIdError').text('ID must be alphanumeric.').show();
        isValid = false;
    }

    // Validate Description: non-empty
    if (!description) {
        $('#itemEditDes').addClass('invalid-input');
        $('#itemEditDescriptionError').text('Description cannot be empty.').show();
        isValid = false;
    }

    // Validate Price: positive number
    const pricePattern = /^\d+(\.\d{1,2})?$/;
    if (!price || !pricePattern.test(price) || parseFloat(price) <= 0) {
        $('#itemEditPrice').addClass('invalid-input');
        $('#itemEditPriceError').text('Price must be a positive number.').show();
        isValid = false;
    }

    // Validate Quantity: positive integer
    const qtyPattern = /^\d+$/;
    if (!qty || !qtyPattern.test(qty) || parseInt(qty) <= 0) {
        $('#itemEditqty').addClass('invalid-input');
        $('#itemEditQtyError').text('Quantity must be a positive integer.').show();
        isValid = false;
    }

    return isValid;
}




//load item table
function loadTable(){

    $("#item-tbl-body").empty();

    items.map((item , index) =>{

        var record =  ` <tr>
                               <td class="item-id-value">${item.itemid}</td>
                                <td class="item-description-value">${item.description}</td>
                                <td class="item-unitPrice-value">${item.unitprice}</td>
                                <td class="item-qty-value">${item.qty}</td>
                           </tr>
        `;

        $("#item-tbl-body").append(record);

    });

}

//add item function
$("#btn-add-item").on('click', () => {

    var itemId = $("#itemId").val();

    var itemDesc = $("#itemDescription").val();

    var itemPrice = $("#unitPrice").val();

    var itemQty = $("#qty").val();


    //nikan print karanna

    console.log(itemId);
    console.log(itemDesc);
    console.log(itemPrice);
    console.log(itemQty);

    if (!validateItemForm(itemId, itemDesc, itemPrice, itemQty)) {
        return;
    }

    //create object by using model
    let item = new ItemModel(itemId,itemDesc,itemPrice,itemQty);

    items.push(item);
    console.log(item);
    console.log(items)
    loadTable();
});

// Function to highlight the clicked row and store its index
$("#item-tbl-body").on('click', 'tr', function () {

    $("#item-tbl-body tr").removeClass("selected-row");

    $(this).addClass("selected-row");

    selectedRowIndex = $(this).index();

    let itemId = $(this).find(".item-id-value").text();
    let itemDesc = $(this).find(".item-description-value").text();
    let itemPrice = $(this).find(".item-unitPrice-value").text();
    let itemQty = $(this).find(".item-qty-value").text();

    $("#itemEditId").val(itemId);
    $("#itemEditDes").val(itemDesc);
    $("#itemEditPrice").val(itemPrice);
    $("#itemEditqty").val(itemQty);
});


function applySelectedRowStyle() {
    $("#item-tbl-body tr").removeClass("selected-row");
    $("#item-tbl-body tr:eq(" + selectedRowIndex + ")").addClass("selected-row");
}

$("#btn-update-item").on('click', () => {
    if (selectedRowIndex === -1) {
        // No row is selected, show an error message or handle it as per your requirement
        return;
    }

    var updatedItemId = $("#itemEditId").val();
    var updatedItemDesc = $("#itemEditDes").val();
    var updatedItemPrice = $("#itemEditPrice").val();
    var updatedItemQty = $("#itemEditqty").val();

    if (!validateUpdateForm(updatedItemId, updatedItemDesc, updatedItemPrice, updatedItemQty)) {
        return;
    }

    items[selectedRowIndex].itemid = updatedItemId;
    items[selectedRowIndex].description = updatedItemDesc;
    items[selectedRowIndex].unitprice = updatedItemPrice;
    items[selectedRowIndex].qty = updatedItemQty;

    loadTable();

    applySelectedRowStyle();

    selectedRowIndex = -1;
});

// Delete customer function
$("#btn-dlt-item").on('click', () => {
    if (selectedRowIndex === -1) {
        alert("No row selected.");
        return;
    }

    if (!confirm("Are you sure you want to delete this Item?")) {
        return;
    }

    items.splice(selectedRowIndex, 1);
    loadTable();
    selectedRowIndex = -1;
});






