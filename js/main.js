// selecting elements
const title = document.getElementById("title");
const price = document.getElementById("price");
const taxes = document.getElementById("taxes");
const ads = document.getElementById("ads");
const discount = document.getElementById("discount");
const total = document.getElementById("total");
const count = document.getElementById("count");
const category = document.getElementById("category");
const submit = document.getElementById("submit");
const search = document.getElementById("search");
const searchTitle = document.getElementById("searchTitle");
const searchCategory = document.getElementById("searchCategory");
let mood = 'create';
let globalI;


// calculate total
function calculateTotal(){
    if(price.value){
        const result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = 'rgb(67, 236, 67)';
    }else{
        total.innerHTML = '';
        total.style.backgroundColor = 'rgb(215, 101, 101)'
    }
    
}

price.onkeyup=calculateTotal;
taxes.onkeyup=calculateTotal;
ads.onkeyup=calculateTotal;
discount.onkeyup=calculateTotal;

//CREATE
let products = JSON.parse(localStorage.getItem("Products")) || [];

submit.addEventListener("click" , function(){
    const newProduct = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:+count.value,
        category:category.value.toLowerCase()
    }
    if (mood === 'create'){
        if (newProduct.count>1){
            for (let i=0 ; i<newProduct.count ; i++){
                products.push(newProduct);
            }
        } else {
            products.push(newProduct);
        }
    } else{
        products[globalI] = newProduct;
        submit.innerHTML = 'Create';
        count.classList.remove('d-none');
        mood='create';
    }
    localStorage.setItem("Products",JSON.stringify(products));
    clearData();
    display();
    search.value = '';
})
//attach enter key
document.addEventListener("keydown" , function(button){
    if (button.key === 'Enter'){
        submit.click();
    }
})

//clear data
function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    total.style.backgroundColor = 'rgb(215, 101, 101)';
    count.value = '';
    category.value = '';
}

//READ
function display(){
    let table = '';
    for (i=0 ; i< products.length ; i++){
        table += `
                <tr>
                    <td>${i+1}</td>
                    <td>${products[i].title}</td>
                    <td>${products[i].price}</td>
                    <td>${products[i].taxes}</td>
                    <td>${products[i].ads}</td>
                    <td>${products[i].discount}</td>
                    <td>${products[i].total}</td>
                    <td>${products[i].category}</td>
                    <td><button class="btn btn-primary" id="update" onclick="updateProduct(${i})">update</button></td>  
                    <td><button class="btn btn-danger" id="delete" onclick="deleteProduct(${i})">delete</button></td>  
                </tr>
        `
    }
    document.querySelector('tbody').innerHTML = table;
    if (products.length>0){
        document.getElementById("deleteAll").innerHTML = `<button onclick="deleteAll()" class="btn btn-danger" id="Delete All">Delete All (${products.length})</button>`

    }
}
display();

//DELETE
function deleteProduct(i){
    products.splice(i,1);
    localStorage.setItem("Products",JSON.stringify(products));
    display();
    search.value = '';
}

function deleteAll(){
    localStorage.clear();
    products.splice(0);
    document.getElementById("deleteAll").innerHTML = '';
    display();
    search.value = '';
}

//Update
function updateProduct(i){
    title.value = products[i].title;
    price.value = products[i].price;
    taxes.value = products[i].taxes;
    ads.value = products[i].ads;
    discount.value = products[i].discount;
    calculateTotal();
    count.classList.add('d-none');
    title.value = products[i].title;
    category.value = products[i].category;
    submit.innerHTML = "Update";
    mood = 'update';
    globalI = i;
    scroll({
        top:0,
        behavior:'smooth'
    })
}

//search
let searchMood = 'title';
function getSearchMood(id){
    if (id === 'searchTitle'){
        search.placeholder = "search by title";
    } else{
        searchMood = 'category';
        search.placeholder = "search by category"
    }
    search.focus();
    search.value ='';
    display();
}
searchTitle.onclick=function(){
    (getSearchMood(this.id))
};
searchCategory.onclick=function (){
    (getSearchMood(this.id))
};

function serachProduct(value){
    let table='';
    if (searchMood === 'title'){
        for (let i=0 ; i<products.length ; i++){
            if(products[i].title.includes(value.toLowerCase())){
                table += `
                <tr>
                    <td>${i+1}</td>
                    <td>${products[i].title}</td>
                    <td>${products[i].price}</td>
                    <td>${products[i].taxes}</td>
                    <td>${products[i].ads}</td>
                    <td>${products[i].discount}</td>
                    <td>${products[i].total}</td>
                    <td>${products[i].category}</td>
                    <td><button class="btn btn-primary" id="update" onclick="updateProduct(${i})">update</button></td>  
                    <td><button class="btn btn-danger" id="delete" onclick="deleteProduct(${i})">delete</button></td>  
                </tr>
                `
            }
        }
    } else{
        for (let i=0 ; i<products.length ; i++){
            if(products[i].category.includes(value.toLowerCase())){
                table += `
                <tr>
                    <td>${i+1}</td>
                    <td>${products[i].title}</td>
                    <td>${products[i].price}</td>
                    <td>${products[i].taxes}</td>
                    <td>${products[i].ads}</td>
                    <td>${products[i].discount}</td>
                    <td>${products[i].total}</td>
                    <td>${products[i].category}</td>
                    <td><button class="btn btn-primary" id="update" onclick="updateProduct(${i})">update</button></td>  
                    <td><button class="btn btn-danger" id="delete" onclick="deleteProduct(${i})">delete</button></td>  
                </tr>
                `
            }
        }
    }
    document.querySelector('tbody').innerHTML = table;
}

search.addEventListener('keyup' , function(){
    serachProduct(this.value);
})