import CustomerModel from "../model/CustomerModel.js";

//var customers = [];
import {customers} from "../db/DB.js";

//var recordIndex ;

// Define a variable to store the index of the clicked row
var selectedRowIndex = -1;

$('#customer-mng-section').css({display:'block'});
$('#item-mng-section').css({display:'none'});
$('#order-mng-section').css({display:'none'});

//Customer click
$('#navCustomer').on('click',()=>{
    console.log("customer click")

    $('#customer-mng-section').css({display:'block'});
    $('#item-mng-section').css({display:'none'});
    $('#order-mng-section').css({display:'none'});

});

//item click
$('#navItem').on('click',()=>{
    console.log("item click")

    $('#customer-mng-section').css({display:'none'});
    $('#order-mng-section').css({display:'none'});
    $('#item-mng-section').css({display:'block'});
});


//order click
$('#navOrder').on('click',()=>{
    console.log("order click")

    $('#customer-mng-section').css({display:'none'});
    $('#item-mng-section').css({display:'none'});
    $('#order-mng-section').css({display:'block'});
});


// Validate form fields
function validateCustomerForm(id, name, address, contact) {
    let isValid = true;

    // Reset input styles and error messages
    $('input').removeClass('invalid-input');
    $('.error-message').hide();

    // Validate ID: alphanumeric
    const idPattern = /^[a-zA-Z0-9]+$/;
    if (!id || !idPattern.test(id)) {
        $('#cusId').addClass('invalid-input');
        $('#cusIdError').text('ID must be contain only letters and numbers.').show();
        isValid = false;
    }

    // Validate Name: only letters and spaces
    const namePattern = /^[a-zA-Z\s]+$/;
    if (!name || !namePattern.test(name)) {
        $('#cusName').addClass('invalid-input');
        $('#cusNameError').text('Name must contain only letters and spaces.').show();
        isValid = false;
    }

    // Validate Address: non-empty
    if (!address) {
        $('#cusAddress').addClass('invalid-input');
        $('#cusAddressError').text('Address cannot be empty.').show();
        isValid = false;
    }

    // Validate Contact: exactly 10 digits
    const contactPattern = /^\d{10}$/;
    if (!contact || !contactPattern.test(contact)) {
        $('#cusContact').addClass('invalid-input');
        $('#cusContactError').text('Contact must be exactly 10 digits.').show();
        isValid = false;
    }

    return isValid;
}

function validateUpdateForm(id, name, address, contact) {
    let isValid = true;

    // Reset input styles and error messages
    $('input').removeClass('invalid-input');
    $('.error-message').hide();

    // Validate ID: alphanumeric
    const idPattern = /^[a-zA-Z0-9]+$/;
    if (!id || !idPattern.test(id)) {
        $('#cusEditId').addClass('invalid-input');
        $('#cusEditIdError').text('ID must be alphanumeric.').show();
        isValid = false;
    }

    // Validate Name: only letters and spaces
    const namePattern = /^[a-zA-Z\s]+$/;
    if (!name || !namePattern.test(name)) {
        $('#cusEditName').addClass('invalid-input');
        $('#cusEditNameError').text('Name must contain only letters and spaces.').show();
        isValid = false;
    }

    // Validate Address: non-empty
    if (!address) {
        $('#cusEditAddress').addClass('invalid-input');
        $('#cusEditAddressError').text('Address cannot be empty.').show();
        isValid = false;
    }

    // Validate Contact: exactly 10 digits
    const contactPattern = /^\d{10}$/;
    if (!contact || !contactPattern.test(contact)) {
        $('#cusEditContact').addClass('invalid-input');
        $('#cusEditContactError').text('Contact must be exactly 10 digits.').show();
        isValid = false;
    }

    return isValid;
}


        //load customer table
function loadTable(){

    $("#customer-tbl-body").empty();

    customers.map((item , index) =>{

        var  record =  ` <tr>
                               <td class="customer-id-value">${item.customerid}</td>
                                <td class="customer-name-value">${item.name}</td>
                                <td class="customer-address-value">${item.address}</td>
                                <td class="customer-contact-value">${item.contact}</td>
                           </tr>
        `;

        $("#customer-tbl-body").append(record);

    });

}

        //add customer function
$("#btn-add-customer").on('click', () => {

    var customerId = $("#cusId").val();

    var customerName = $("#cusName").val();

    var customerAddress = $("#cusAddress").val();

    var customerContact = $("#cusContact").val();


    //nikan print karanna

     console.log(customerId);
     console.log(customerName);
     console.log(customerAddress);
     console.log(customerContact);

    /*var  record =  ` <tr>
                    <td class="customer-id-value">${customerId}</td>
                    <td class="customer-name-value">${customerName}</td>
                    <td class="customer-address-value">${customerAddress}</td>
                    <td class="customer-contact-value">${customerContact}</td>
                </tr>
    `;

    console.log(record);
    $("#customer-tbl-body").append(record);*/


   /* let customer = {
        customerid:customerId,
        name: customerName,
        address: customerAddress,
        contact: customerContact,
    }*/


    if (!validateCustomerForm(customerId, customerName, customerAddress, customerContact)) {
        return;
    }


    //create object by using model
    let customer = new CustomerModel(customerId,customerName,customerAddress,customerContact);



    customers.push(customer);
    console.log(customer);
    console.log(customers);

    loadTable();
});


// Function to highlight the clicked row and store its index
$("#customer-tbl-body").on('click', 'tr', function () {

    $("#customer-tbl-body tr").removeClass("selected-row");

    $(this).addClass("selected-row");

    selectedRowIndex = $(this).index();

    let cusId = $(this).find(".customer-id-value").text();
    let cusName = $(this).find(".customer-name-value").text();
    let cusAddress = $(this).find(".customer-address-value").text();
    let cusContact = $(this).find(".customer-contact-value").text();
    
    $("#cusEditId").val(cusId);
    $("#cusEditName").val(cusName);
    $("#cusEditAddress").val(cusAddress);
    $("#cusEditContact").val(cusContact);
});


function applySelectedRowStyle() {
    $("#customer-tbl-body tr").removeClass("selected-row");
    $("#customer-tbl-body tr:eq(" + selectedRowIndex + ")").addClass("selected-row");
}

$("#btn-update-customer").on('click', () => {
    if (selectedRowIndex === -1) {
        // No row is selected, show an error message or handle it as per your requirement
        return;
    }

    var updatedCustomerId = $("#cusEditId").val();
    var updatedCustomerName = $("#cusEditName").val();
    var updatedCustomerAddress = $("#cusEditAddress").val();
    var updatedCustomerContact = $("#cusEditContact").val();

    if (!validateUpdateForm(updatedCustomerId, updatedCustomerName, updatedCustomerAddress, updatedCustomerContact)) {
        return;
    }


    customers[selectedRowIndex].customerid = updatedCustomerId;
    customers[selectedRowIndex].name = updatedCustomerName;
    customers[selectedRowIndex].address = updatedCustomerAddress;
    customers[selectedRowIndex].contact = updatedCustomerContact;

    loadTable();

    applySelectedRowStyle();

    selectedRowIndex = -1;
});

// Delete customer function
$("#btn-dlt-customer").on('click', () => {
    if (selectedRowIndex === -1) {
        alert("No row selected.");
        return;
    }

    if (!confirm("Are you sure you want to delete this customer?")) {
        return;
    }

    customers.splice(selectedRowIndex, 1);
    loadTable();
    selectedRowIndex = -1;
});






