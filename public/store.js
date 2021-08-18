if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked(event) {

    // cartItemNames IS AN ARRAY!

    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    var htmlForm = document.getElementById('html-form')
    var orderList = document.getElementById('order-list')
    var orderTotal = document.getElementById('order-total')

    var quantityElement = cartItems.getElementsByClassName('cart-quantity-input')

    var totalElement = document.getElementsByClassName('cart-total-price')[0]
    var total = parseFloat(totalElement.innerText.replace('$', ''))
    var tax = total * 0.15
    var totalAfterTax = total * 1.15

    for (var i = 0; i < cartItemNames.length; i++) {

        if (cartItemNames.length === 2)  {
            var quantity1 = quantityElement[0].value
            var quantity2 = quantityElement[1].value
            var itemNameArray = [cartItemNames[0].innerText + " Qty: " + quantity1, cartItemNames[1].innerText + " Qty: "  + quantity2] 

                orderList.value = itemNameArray.join("\n");            
        }

        else {
            var quantity1 = quantityElement[0].value
            var itemNameArray = [cartItemNames[i].innerText + " Qty: " + quantity1]

                orderList.value = itemNameArray.join("\n");
            }     
        }

        if (cartItemNames.length > 0 ) {
        document.getElementById("html-form").style.display = "block";

        total = Math.round(total * 100) / 100
        tax = Math.round(tax * 100) / 100
        totalAfterTax = Math.round(totalAfterTax * 100) / 100
        var totalCalc = ["$ " + total , "$ " + tax + " Tax" , "-------------" , "$ " + totalAfterTax]
            orderTotal.value = totalCalc.join("\n");
        }

        while (cartItems.hasChildNodes()) {
        
            cartItems.removeChild(cartItems.firstChild)
        }

    updateCartTotal()
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {

    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`


    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)





    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}



// active nav links
var header = document.getElementById("navbar");
var btns = header.getElementsByClassName("nav-link");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
  var current = document.getElementsByClassName("active");
  if (current.length > 0) { 
    current[0].className = current[0].className.replace(" active", "");
  }
  this.className += " active";
  });
}
