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

    //create object by using model
    let customer = new CustomerModel(customerId,customerName,customerAddress,customerContact);



    customers.push(customer);
    console.log(customer);
    console.log(customers);

    loadTable();
});

/*
$("#btn-update-customer").on('click', () => {
    var studentId =  $("#txtStudentId").val();
    var studentFName =  $("#txtFName").val();
    var studentLName =  $("#txtLName").val();
    var studentAddress =  $("#txtAddress").val();
    var program = $('input[name ="flexRadioDefault"]:checked').val();

    let StudentObj = students[recordIndex];
    StudentObj.id = studentId;
    StudentObj.firstName = studentFName;
    StudentObj.lastName = studentLName;
    StudentObj.address = studentAddress;
    StudentObj.program = program;

    loadTable();
    $("#student-reset").click();
    // console.log("s1 : ",StudentObj);
    //console.log(students[recordIndex])


});*/

/*

$("#customer-tbl-body").on('click', 'tr' , function () {

    let index = $(this).index();
    recordIndex = index;

    let CusId = $(this).find(".customer-id-value").text();
    let CusName = $(this).find(".customer-name-value").text();
    let CusAddress = $(this).find(".customer-address-value").text();
    let CusContact = $(this).find(".customer-contact-value").text();

    $("#cusId").val(CusId);
    $("#cusName").val(CusName);
    $("#cusAddress").val(CusAddress);
    $("#cusContact").val(CusContact);

});

*/
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

    customers[selectedRowIndex].customerid = updatedCustomerId;
    customers[selectedRowIndex].name = updatedCustomerName;
    customers[selectedRowIndex].address = updatedCustomerAddress;
    customers[selectedRowIndex].contact = updatedCustomerContact;

    loadTable();

    applySelectedRowStyle();

    selectedRowIndex = -1;
});








