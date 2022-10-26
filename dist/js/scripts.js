import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

function removeProduct(id) {
    const products = JSON.parse(localStorage.getItem("products"));

    const newProducts = products.filter((product) => {
        return product.id !== id;
    });

    localStorage.setItem("products", JSON.stringify(newProducts));
    renderProducts();
}

function updateProduct(product){
    const storage = localStorage.getItem("products")
    const products = storage ? JSON.parse(storage) : [];
    const uProduct = {
        id:product.id,
        name:product.name,
        price:product.price,
        description:product.description
    }
    localStorage.setItem("products", JSON.stringify([...products,uProduct]))
    document.getElementById("update").style.display="none"
}


function renderProducts() {
    const storage = localStorage.getItem("products");
    const products = storage ? JSON.parse(storage) : [];
    const tbody = document.querySelector("#table-container table tbody");

    tbody.innerHTML = "";
    products.forEach((product) => {
        const tr = document.createElement("tr");
        const id = product.id;

        tr.innerHTML = `
            <td class="table-row">${product.name}</td>
            <td class="table-row">${product.price}</td>
            <td class="table-row">${product.description}</td>
            <td class="table-row">
                <button type="button" class="edit-button" id="Edit${id}"><i class="bi bi-pencil"></i></button>
                <button type="button" class="danger-button" id="Delete${id}"><i class="bi bi-x-lg"></i></button>
            </td>
        `;

        tbody.appendChild(tr);
        document.getElementById(`Delete${product.id}`).addEventListener("click", ()=>{
            removeProduct(product.id);
        });

        document.getElementById(`Edit${product.id}`).addEventListener("click",()=>{
            const update = document.getElementById("update")
            update.style.display="flex"
            const eName = document.getElementById("eName")
            const ePrice = document.getElementById("ePrice")
            const eDesc = document.getElementById("eDesc")

            eName.value=product.name
            ePrice.value=product.price
            eDesc.value=product.description

            document.querySelector("#update form").dataset.id=product.id
            
        })
    });
}

document.addEventListener("DOMContentLoaded", renderProducts);

document.getElementById("product-form").addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.querySelector("#name");
    const price = document.querySelector("#price");
    const description = document.querySelector("#description");

    const newProduct = {
        id: uuidv4(),
        name: name.value,
        price: price.value,
        description: description.value}

    const storage = localStorage.getItem("products");
    const products = storage ? JSON.parse(storage) : [];

    localStorage.setItem("products", JSON.stringify([...products, newProduct]));
    if(products.length > 0){
        alert("Cadastro Realizado!");
    }

    name.value = price.value = description.value = "";

    renderProducts();
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth"});
});

document.querySelector("#update form").addEventListener("submit",(event)=>{
    event.preventDefault()
    const product = {
        id:document.querySelector("#update form").dataset.id,
        name:document.getElementById("eName").value,
        price:document.getElementById("ePrice").value,
        description:document.getElementById("eDesc").value
    }
    removeProduct(product.id)
    updateProduct(product)
    renderProducts()
})
document.querySelector("#update form button:last-child").addEventListener("click",(event)=>{
    event.preventDefault()
    const update = document.getElementById("update")
    update.style.display="none"
})

document.getElementById("button-toggle-theme").addEventListener("click", ()=>{
    if(localStorage.getItem("mode") == "light"){
        localStorage.setItem("mode", "dark");
        changeTheme();
    }
    else{
        localStorage.setItem("mode", "light");
        changeTheme();
    }
});

function changeTheme(){
    if(localStorage.getItem("mode")){
        const root = document.querySelector(":root");
        if(localStorage.getItem("mode") == "light"){
            root.style.setProperty("--background-theme", "#333");
            root.style.setProperty("--font-color", "#fff");
            root.style.setProperty("--dark-border", "#000 1px solid");
        }
        else{
            root.style.setProperty("--background-theme", "#fff");
            root.style.setProperty("--font-color", "#000" );
            root.style.setProperty("--dark-border", "#000 1px solid")
        }
    }
}

changeTheme();