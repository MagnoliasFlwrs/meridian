const collectionBox = document.querySelector('.collection__box');
let productList = null;
let productListCopy = null;
const womensFilter = document.querySelector('.womens__clothing');
const electronicsFilter = document.querySelector('.electronics');
const jeweleryFilter = document.querySelector('.jewelery');
const mensFilter = document.querySelector('.mens__clothing');
const checkboxList = document.querySelectorAll('.filters .input');
const clearButton = document.querySelector('.clear__button');
const minSort = document.querySelector('.min__sort');
const maxSort = document.querySelector('.max__sort');

document.addEventListener('DOMContentLoaded', () => {
    fetch('https://fakestoreapi.com/products')
    .then((Response) => Response.json())
    .then((base) => {
        productList = base;
        productListCopy = [...productList]
        renderProductList();
    })
    checkboxList.forEach(item => {
        item.addEventListener('change', ({ target }) => {
            filterProductList(target.name)
        })
    })
})
function renderProductList() {
    collectionBox.innerHTML = ""
    productListCopy.forEach(({id, category, image, price, title}) => {
        const productCard = document.createElement('div');
        productCard.classList.add('product__card');
        productCard.setAttribute('card-id', id);
        const productImage = document.createElement('img');
        productImage.classList.add('product__image');
        productImage.src = image;
        const productTitle = document.createElement('h3');
        productTitle.classList.add('product__title');
        productTitle.textContent = title;
        const productCategory = document.createElement('h4');
        productCategory.classList.add('product__category');
        productCategory.textContent = category;
        const productPrice = document.createElement('span');
        productPrice.classList.add('product__price');
        productPrice.textContent = price;
        productCard.append(productImage,productTitle,productCategory,productPrice);
        collectionBox.appendChild(productCard);
    });
}

function filterProductList(value) {
    if (event.target.checked) {
        productListCopy = productListCopy.filter(product => {
            console.log(product.category === value)
            return product.category === value
        })
    } else {
        clearFilters()
    }
    renderProductList()
}
function clearFilters() {
    productListCopy = [...productList];
    renderProductList();
}
clearButton.addEventListener('click',() => {
    clearFilters();
})

minSort.addEventListener('click', () => {
    productListCopy.forEach(product  => {
        product.price = +product.price;
    })
    productListCopy.sort((a , b) => a.price > b.price ? 1 : -1)
    renderProductList()
})
maxSort.addEventListener('click', () => {
    productListCopy.forEach(product  => {
        product.price = +product.price;
    })
    productListCopy.sort((a , b) => a.price < b.price ? 1 : -1)
    renderProductList()
})