let productsBtn = document.querySelectorAll('.productBtn');
let basket = document.querySelector('.basket');
let totalPrice = document.getElementsByClassName('totalPrice')[0];
let totalQuantity= document.getElementsByClassName('totalQuantity')[0];
let priceVsego = 0;
let quantityVsego = 0;
let deleteAll = document.querySelector('.deleteAll');

const plusFullPrice = (currentPrice) =>{
    return priceVsego+=currentPrice;
}

const minusFullPrice = (currentPrice) =>{
    return priceVsego-=currentPrice;
}

const printFullPrice = ()=>{
    totalPrice.textContent = `Total Price: ${priceVsego}$`;
}

const printFullQuantity =()=>{
    totalQuantity.textContent = `Total Quantity: ${quantityVsego}`;
}

const generateCartProduct = (img, title, price, id, quantity)=>{
    return `
    <div class='innerBasket' data-id = '${id}'>
    <div class='withImgName'>
        <div class='basketImg' style='${img}'>

        </div>
        <h3>${title}</h3>
    </div>
    <h3 class='basketQuantity'>${quantity}</h3>
    <div class='priceCross'>
    <h3 class='basketPrice'>${price}$</h3>
    <i class="fas fa-times-circle deleteProduct"></i>
</div>
</div>
    `;
}

const deleteProducts = productParent =>{
    let currentPrice = parseInt(productParent.querySelector('.basketPrice').textContent);
    minusFullPrice(currentPrice);
    printFullPrice();
    let quantity = parseInt(productParent.querySelector('.basketQuantity').textContent);
    quantityVsego-=quantity;
    printFullQuantity();
    productParent.remove();

}

productsBtn.forEach(el=>{
    el.addEventListener('click', e=>{
        let self = e.currentTarget;
        let parent = self.closest('.produs');
        let id = parent.dataset.id;
        let img = parent.querySelector('.forImg').getAttribute('style');
        let title = parent.querySelector('.nume').textContent;
        let price = parseInt(parent.querySelector('.price').textContent);
        let quantity = parseInt(parent.querySelector('.count').value)
        if(document.querySelector('.basket').querySelector(`.innerBasket[data-id='${id}']`)){
            document.querySelector('.basket').querySelector(`.innerBasket[data-id='${id}']`).querySelector('.basketPrice').textContent = `${parseInt(document.querySelector('.basket').querySelector(`.innerBasket[data-id='${id}']`).querySelector('.basketPrice').textContent) + (quantity * price)}$`;
            document.querySelector('.basket').querySelector(`.innerBasket[data-id='${id}']`).querySelector('.basketQuantity').textContent = `${parseInt(document.querySelector('.basket').querySelector(`.innerBasket[data-id='${id}']`).querySelector('.basketQuantity').textContent) + quantity}`;
            plusFullPrice(price*quantity);
            printFullPrice();
            quantityVsego+=quantity;
            printFullQuantity();
          }
          else{
        plusFullPrice(price*quantity);
        printFullPrice();
        quantityVsego+=quantity;
        printFullQuantity();
        basket.insertAdjacentHTML('afterbegin', generateCartProduct(img, title, price*quantity, id, quantity));
        }
    })
})

basket.addEventListener('click', e=>{
    if(e.target.classList.contains('deleteProduct')){
        deleteProducts(e.target.closest('.innerBasket'));
    }
})

deleteAll.addEventListener('click', e=>{
    basket.innerHTML = '';
    quantityVsego = 0;
    priceVsego = 0;
    printFullPrice();
    printFullQuantity();
})

