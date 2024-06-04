import ItemModel from "../model/ItemModel.js";

import {items} from "../db/DB.js";


// Define a variable to store the index of the clicked row
var selectedRowIndex = -1;

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

    //create object by using model
    let item = new ItemModel(itemId,itemDesc,itemPrice,itemQty);

    items.push(item);
    console.log(item);
    console.log(items);

    loadTable();
});