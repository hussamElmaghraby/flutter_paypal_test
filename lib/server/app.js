
var paypal = require('paypal-rest-sdk');
var express = require('express');

var app = express();

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AVKkQNB7eBcAfRrwleN10a1UEhtPHRKI9YnMEv0iFSMbzTnKFhul8ixf4Y6Sm4yzBwvv31IBCoOnVhhF',
  'client_secret': 'EIukEK4Kk6qIONtyMW9Eaxn4rMG5Skk9HA9l0pd79HUCdWHb9UXZCdr39eXIUo_rintQnu7795DlyKiN'
});



app.get('/pay' , (req , res) => {
       var create_payment_json = {
           "intent": "sale",
           "payer": {
               "payment_method": "paypal"
           },
           "redirect_urls": {
               "return_url": "http://localhost:8000/success",
               "cancel_url": "http://cancel.url"
           },
           "transactions": [{
               "item_list": {
                   "items": [{
                       "name": "item",
                       "sku": "item",
                       "price": "100.00",
                       "currency": "USD",
                       "quantity": 1
                   }]
               },
               "amount": {
                   "currency": "USD",
                   "total": "100"
               },
               "description": "This is the payment description."
           }]
       };

       paypal.payment.create(create_payment_json, function (error, payment) {
           if (error) {
               throw error;
           } else {
               console.log("Create Payment Response");
               console.log(payment);
               for(let i=0 ; i < payment.links.length ; i++){
                    if(payment.links[i].rel == 'approval_url'){
                    console.log("APPROVED URL")
                   return  res.redirect(payment.links[i].href);

                    }
               }
           }
       });

       res.send('payment created !!');
});
app.get('/success' , (req ,res) => {
           var execute_payment_json = {
               "payer_id": req.query.payer_id,
               "transactions": [{
                   "amount": {
                       "currency": "USD",
                       "total": "1.00"
                   }
               }]
           };
           var paymentId = 'PAYMENT id created in previous step';
});

app.listen(8000 , (req , res ) => {
        console.log('server started.')
});