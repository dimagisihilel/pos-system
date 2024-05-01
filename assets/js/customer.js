$('#customer-mng-section').css({display:'block'});
$('#item-mng-section').css({display:'none'});


//Customer click
$('#navCustomer').on('click',()=>{
    console.log("customer click")

    $('#customer-mng-section').css({display:'block'});
    $('#item-mng-section').css({display:'none'});

});

//item click
$('#navItem').on('click',()=>{
    console.log("item click")

    $('#customer-mng-section').css({display:'none'});
    $('#item-mng-section').css({display:'block'});
});

