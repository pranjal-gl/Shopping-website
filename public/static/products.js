// older version
firebase.initializeApp({
    apiKey: "AIzaSyBiJdO1hdhPwYOpAaLVBdWwArF3gPAIYHk",
    authDomain: "store-app-19e4d.firebaseapp.com",
    projectId: "store-app-19e4d",
    storageBucket: "store-app-19e4d.appspot.com",
    messagingSenderId: "924664615145",
    appId: "1:924664615145:web:29347577530f380369e078"
})
const db = firebase.firestore();
const settings = {timestampsInSnapshots: true};
db.settings(settings);


var products = ko.observableArray();
var myCart = ko.observableArray();
var checkoutPage = ko.observable();
var gtotal = ko.observable(0);
var showProd = ko.observable(true);
var showCart = ko.observable(false);
var showCheckout = ko.observable(false);
var showForms = ko.observable(false);
var showthankyou = ko.observable(false);
var currProd = ko.observable({});
var addressDetails = ko.observable({});

db.collection('products').onSnapshot(snapshot=>{
    snapshot.docs.forEach((item)=>{
        products.push({...item.data(), id: item.id})
    })
})

/* ******************************* Cart utility functions ************************************** */
var decCount = function(item) {
    myCart().forEach(cartData => {
        if(cartData.id === item.id) {
            if(cartData.count > 1) {
                let newVal = {
                    ...item,
                    count : cartData.count-1
                }
                myCart.replace(cartData, newVal);
            } else {
                myCart.remove(item);
            }
            gtotal(gtotal() - parseInt(cartData.price));
        } 
    })
    console.log(gtotal());

}
var incCount = function(item) {
    myCart().forEach(cartData => {
        if(cartData.id === item.id) {
            let newVal = {
                ...item,
                count : cartData.count+1
            }
            myCart.replace(cartData, newVal);
            gtotal(gtotal() + parseInt(cartData.price));
            console.log(gtotal());
        }
    })
    
}
var deleteFromCart = function(item) {
    gtotal(gtotal() - (item.price * item.count));
    console.log(gtotal());
    myCart.remove(item);
}
var openHomePage = function () {
    showthankyou(false);
    showProd(true);
    showCart(false);
    showCheckout(false)
    showForms(false)
}


/* ******************************* Products page utility functions ***************************** */
var addToCart = function (item) {
    const found = myCart().some(cartData=> cartData.id == item.id);
    if(found) {
        console.log('item already exist');
        // change count for current item
        myCart().forEach(cartData => {
            if(cartData.id === item.id) {
                let newVal = {
                    ...item,
                    count : cartData.count+1
                }
                myCart.replace(cartData, newVal);
            }
        })
    } else {
        myCart.push({...item, count: 1});
    }
    alert('Added to cart');
    gtotal(parseInt(item.price, 10) + parseInt(gtotal()));
    console.log(gtotal());
}

var buyNow = function(item) {
    currProd(item);
    showCart(false);
    showProd(false);
    showCheckout(true);
}

var openCartPage = function() {
    //setting states to initial state
    showthankyou(false);
    showCart(true);
    showCheckout(false);
    showProd(false);
}

/**********************************Common pages*********************************************/
var proceedToPay = function(price) {
    console.log(price);
    showForms(true);
    showCheckout(false)
}

var submitAddress = function(formElements) {
    console.log(formElements.houseNum.value);
    let temp = {
        houseNum: formElements.houseNum.value,
        street: formElements.street.value,
        locality: formElements.locality.value,
        landmark: formElements.landmark.value,
        city: formElements.city.value,
        state: formElements.state.value,
        pincode: formElements.pincode.value
    }
    console.log(temp);
}


var thankyoupage = function() {
    showForms(false);
    showthankyou(true);
}

ko.applyBindings();