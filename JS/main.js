var productName = document.getElementById('productName');
var productPrice = document.getElementById('productPrice');
var productCategory = document.getElementById('productCategory');
var productDescription = document.getElementById('productDescription');
var tableHtml = document.getElementById("tbody");
var searchItem = document.getElementById('searchItem');
var productNameUpdate = document.getElementById('productNameUpdate');
var productPriceUpdate = document.getElementById('productPriceUpdate');
var productCategoryUpdate = document.getElementById('productCategoryUpdate');
var productDescriptionUpdate = document.getElementById('productDescriptionUpdate');
var resetForm = document.getElementById('resetForm');
var product = [];

var productIndex;

if( localStorage.getItem("allProducts") != null){
    product = JSON.parse(localStorage.getItem("allProducts"));
    productDisplay(product);
}

function addProduct() {
    

    if(validateProductName()){
        if(validateProductPrice()){
            if(validateProductCat()){
                var newProduct={
                    Name : productName.value,
                    Price : productPrice.value,
                    Category : productCategory.value,
                    Description : productDescription.value,
                }
            
                product.push(newProduct);
                localStorage.setItem("allProducts" , JSON.stringify(product))
                productDisplay(product);
                clearForm();
            } else {
                alert("Product Category not valid")
            }
        } else{
            alert("Product Price not Valid")
        }
    } else {
        alert("Product Name not valid")
    }
    
}


function productDisplay(arr) {
    box=``;


    for (var i =0; i < arr.length; i++) {
        box +=`
        <tr>
        <td>${arr[i].Name}</td>
        <td>${arr[i].Price}</td>
        <td>${arr[i].Category}</td>
        <td>${arr[i].Description}</td>
        <td><button onclick="DeleteItem(${i})" class="btn btn-outline-danger">Delete</button></td>
        <td><button onclick="UpdateProduct(${i})" class="btn btn-outline-warning">Update</button></td>
        </tr>
    `;
        
    }

    tableHtml.innerHTML = box;
}

function searchItems(searchKey){
    
    var searchedProduct=[];
    for(var i =0  ; i < product.length ;i++){
        if(product[i].Name.toLowerCase().includes(searchKey.toLowerCase())){
            searchedProduct.push(product[i]);
        }
    }
    if(searchedProduct != null){
        productDisplay(searchedProduct);
    } else {
        productDisplay(product);
    }
    
}



function DeleteItem(index){
    product.splice(index,1)
    localStorage.setItem("allProducts",JSON.stringify(product))
    productDisplay(product);
}

function clearForm(){
    productName.value = "";
    productPrice.value = "";
    productCategory.value = "";
    productDescription.value = "";
    resetFormbtn("");
}

productName.addEventListener("keyup",function(){
    resetFormbtn(productName.value);
    console.log(this.value);
})

productPrice.addEventListener("keyup",function(){
    resetFormbtn(this.value);
})

productCategory.addEventListener("keyup",function(){
    resetFormbtn(this.value);
})

productDescription.addEventListener("keyup",function(){
    resetFormbtn(this.value);
})

function resetFormbtn(inputValue){
    if(inputValue.length >= 1){
        resetForm.removeAttribute("disabled")
    } else if (inputValue.length < 1) {
        resetForm.setAttribute("disabled","")
    }
}

function UpdateProduct(index){
    document.getElementById('productUpdate-inner').classList.add("Search-animation")
    document.getElementById('productUpdate').classList.replace("d-none","d-block")
    

    productNameUpdate.value = product[index].Name;
    productPriceUpdate.value = product[index].Price;
    productCategoryUpdate.value = product[index].Category;
    productDescriptionUpdate.value = product[index].Description;

    productIndex = index
    
}


function sendUpdatedValue(){
    


    if(validateProductNameUpdate()){
        if(validateProductPriceUpdate()){
            if(validateProductCatUpdate()){
                product[productIndex].Name = productNameUpdate.value;
                product[productIndex].Price = productPriceUpdate.value;
                product[productIndex].Category = productCategoryUpdate.value;
                product[productIndex].Description = productDescriptionUpdate.value;


                document.getElementById('productUpdate').classList.replace("d-block","d-none")


                localStorage.setItem("allProducts",JSON.stringify(product));
                clearForm();
                productDisplay(product);
            } else {
                alert("Product Category not valid")
            }
        } else{
            alert("Product Price not Valid")
        }
    } else {
        alert("Product Name not valid")
    }

    


    
}


function cancel(){
    document.getElementById('productUpdate').classList.replace("d-block","d-none")
}

function validateProductName(){
    var regex = /^[A-Z][a-zA-z \ ]{2,}$/
    if(regex.test(productName.value)){
        return true
    } else {
        return false
    }
}


function validateProductPrice(){
    var regex = /[1-9][0-9]{2,}$/
    if(regex.test(productPrice.value)){
        return true
    } else {
        return false
    }
}

function validateProductCat(){
    var regex = /^[A-Z][a-z]+$/
    if(regex.test(productCategory.value)){
        return true
    } else {
        return false
    }
}




// ----------------> Update Validation 

function validateProductNameUpdate(){
    var regex = /^[A-Z][a-zA-z \ ]{2,}$/
    if(regex.test(productNameUpdate.value)){
        return true
    } else {
        return false
    }
}


function validateProductPriceUpdate(){
    var regex = /[1-9][0-9]{2,}$/
    if(regex.test(productPriceUpdate.value)){
        return true
    } else {
        return false
    }
}

function validateProductCatUpdate(){
    var regex = /^[A-Z][a-z]+$/
    if(regex.test(productCategoryUpdate.value)){
        return true
    } else {
        return false
    }
}
