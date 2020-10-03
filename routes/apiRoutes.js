const db = require("../models");
const axios = require("axios");
const cheerio = require("cheerio");
const Client = require("shopify-buy");
const fetch = require("node-fetch");

// Initializing a client to return content in the store's primary language
const client = Client.buildClient(
  {
    domain: "bills-develop-store.myshopify.com",
    storefrontAccessToken: "f29f50ae969358179bfc8bfbfa5a52df",
  },
  fetch
);

//
module.exports = function (app) {
  //Order Iphone
  app.get("/iphone", function (req, res) {
    client.checkout.create().then((checkout) => {
      // Do something with the checkout
      const checkoutId = checkout.id; // ID of an existing checkout
      const lineItemsToAdd = [
        {
          variantId:
            "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zNjIyODc5MDc0NzI5OA==",
          quantity: 1,
        },
      ];
      client.checkout
        .addLineItems(checkoutId, lineItemsToAdd)
        .then((checkout) => {
          // Do something with the updated checkout
          console.log(checkout); // Array with one additional line item
          client.checkout.fetch(checkout.id).then((checkout) => {
            // Do something with the checkout
            console.log("--------------COMPLETE-----------------");
            res.json(checkout);
            console.log(checkout.webUrl);
          });
        })
        .catch((err) => {
          if (err) {
            console.log(err);
          }
        });
    });
  });

  //Order watch
  app.get("/watch", function (req, res) {
    client.checkout.create().then((checkout) => {
      // Do something with the checkout
      const checkoutId = checkout.id; // ID of an existing checkout
      const lineItemsToAdd = [
        {
          variantId:
            "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zNjQ3MjY5Mzc4NDczOA==",
          quantity: 1,
        },
      ];
      client.checkout
        .addLineItems(checkoutId, lineItemsToAdd)
        .then((checkout) => {
          // Do something with the updated checkout
          console.log(checkout); // Array with one additional line item
          client.checkout.fetch(checkout.id).then((checkout) => {
            // Do something with the checkout
            console.log("--------------COMPLETE-----------------");
            res.json(checkout);
            console.log(checkout.webUrl);
          });
        })
        .catch((err) => {
          if (err) {
            console.log(err);
          }
        });
    });
  });

  //Order AirPods
  app.get("/airpods", function (req, res) {
    client.checkout.create().then((checkout) => {
      // Do something with the checkout
      const checkoutId = checkout.id; // ID of an existing checkout
      const lineItemsToAdd = [
        {
          variantId:
            "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zNjQ1ODYyNjQ4MjMzOA==",
          quantity: 1,
        },
      ];
      client.checkout
        .addLineItems(checkoutId, lineItemsToAdd)
        .then((checkout) => {
          // Do something with the updated checkout
          console.log(checkout); // Array with one additional line item
          client.checkout.fetch(checkout.id).then((checkout) => {
            // Do something with the checkout
            console.log("--------------COMPLETE-----------------");
            res.json(checkout);
            console.log(checkout.webUrl);
          });
        })
        .catch((err) => {
          if (err) {
            console.log(err);
          }
        });
    });
  });

  //Add Item
  app.post("/add/:item", function (req, res) {
    const checkoutId = "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0SW1hZ2UvMTgyMTc3ODc1OTI="; // ID of an existing checkout
    const lineItemsToAdd = [
      {
        variantId: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yOTEwNjAyMjc5Mg==",
        quantity: 5,
        customAttributes: [{ key: "MyKey", value: "MyValue" }],
      },
    ];

    // Add an item to the checkout
    client.checkout
      .addLineItems(checkoutId, lineItemsToAdd)
      .then((checkout) => {
        // Do something with the updated checkout
        console.log(checkout.lineItems); // Array with one additional line item
      });
  });

  //Delete Item
  app.post("/delete/:item", function (req, res) {
    
    const checkoutId = 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0SW1hZ2UvMTgyMTc3ODc1OTI='; // ID of an existing checkout
    const lineItemIdsToRemove = [
      'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0Lzc4NTc5ODkzODQ='
    ];
     
    // Remove an item from the checkout
    client.checkout.removeLineItems(checkoutId, lineItemIdsToRemove).then((checkout) => {
      // Do something with the updated checkout
      console.log(checkout.lineItems); // Checkout with line item 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0Lzc4NTc5ODkzODQ=' removed
    });
  });


  app.post("/item", function (req, res) {});

  app.post("/itemDel", function (req, res) {
    // Create a new Item and pass the req.body to the entry
    db.Item.deleteMany({})
      .then(function (dbItem) {
        // View the added result in the console
        res.json(dbItem);
      })
      .catch(function (err) {
        // If an error occurred, log it
        console.log(err);
      });
  });
};
