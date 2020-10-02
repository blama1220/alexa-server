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
  app.get("/iphone", function (req, res) {
    client.checkout.create().then((checkout) => {
      // Do something with the checkout
      const checkoutId = checkout.id; // ID of an existing checkout
      const lineItemsToAdd = [
        {
          variantId:
            "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zNjIyODc5MDc0NzI5OA==",
          quantity: 2,
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
