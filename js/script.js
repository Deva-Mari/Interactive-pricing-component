// initialize arrays for text-contents
const pageViewsText = ["10K PAGEVIEWS", "50K PAGEVIEWS", "100K PAGEVIEWS", "500K PAGEVIEWS", "1M PAGEVIEWS"];
const prices = [8.00, 12.00, 16.00, 24.00, 36.00];
const discountedPrice = prices.map(function(t){
    return t - (.25 * t);
})

// grab page objects
const sliderBar = document.querySelector("#slider-bar");
let pageviews = document.querySelector("#pageviews");
let price = document.querySelector("#price");

// changing values on slide
sliderBar.oninput = function (){
    priceCat = setPriceCat();
    setPrices(priceCat);
    let value = ((this.value - this.min) / (this.max - this.min)) * 100;
    this.style.background = 
     `linear-gradient(
        to right,
        hsl(174, 77%, 80%) 0%,
        hsl(174, 77%, 80%) ${value}%,
        hsl(224, 65%, 95%) ${value}%,
        hsl(224, 65%, 95%) 100%
      )`;
}

// when toggling billing, applying discount to prices
const PageX = (elem) => window.pageXOffset + elem.getBoundingClientRect().left;
const toggleContainer = document.querySelector("#toggle-container");
const toggle = document.querySelector("#toggle");
toggleContainer.addEventListener("click", (e) => {
    const clickLocation = e.pageX;
    const containerStart = PageX(toggleContainer);
    const containerWidth = toggleContainer.offsetWidth;
    const containerHalf = containerStart + (containerWidth/2);
    if(clickLocation - containerHalf > 0){
        toggleContainer.style.justifyContent = "flex-end";
        toggle.checked = true;
        priceCat = setPriceCat();
        setPrices(priceCat);
    }else{
        toggleContainer.style.justifyContent = "flex-start";
        toggle.checked = false;
        priceCat = setPriceCat();
        setPrices(priceCat);
    }
})

// assigning price category to each slider-value
let priceCat = null;
let setPriceCat = () => {
    if(sliderBar.value < 20){
        priceCat = 0;
    }
    else if(sliderBar.value < 40){
        priceCat = 1;
    }
    else if(sliderBar.value < 60){
        priceCat = 2;
    }
    else if(sliderBar.value < 80){
        priceCat = 3;
    }
    else {
        priceCat = 4;
    }
    return priceCat;
}

// setting page content depending on price category
let setPrices = (value) => {
    pageviews.textContent = pageViewsText[value];
    if(toggle.checked){
        price.textContent = `$${discountedPrice[value]}.00`;
    }else{
        price.textContent = `$${prices[value]}.00`;
    }
}

// changing order of maininfo and sliderbar elements on small screens
function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

w = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
const targetWidth = 768;
if ( w < targetWidth) {
    insertAfter(sliderBar, pageviews);
}