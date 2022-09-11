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
const modalWrapper = document.querySelector('.modal__wrapper');
const modalContainer = document.querySelector('.modal__container');

document.addEventListener('DOMContentLoaded', async () => {
    let list =  await fetch('https://fakestoreapi.com/products')
    list = await list.json()
    productList = list;
    productListCopy = [...productList]
    renderProductList();
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
    let checkboxes = document.querySelectorAll(".input");
    for(let i = 0; i < checkboxes.length; i++){
        if (checkboxes[i].checked == true) {
            checkboxes[i].checked = false;
        }
    }
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

function openModal() {
    modalWrapper.style.display = "flex";
}

modalWrapper.addEventListener("click", ({ target }) => {
    if (!target.classList.contains("modal__container")) {
      modalWrapper.style.display = "none";
    }
});

collectionBox.addEventListener('click', ({ target }) => {
    if (target.classList.contains('product__card')) {
        openModal()
    }
})