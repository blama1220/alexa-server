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
let lastCheckout = "";
let currentCheckout = "";

module.exports = function (app) {
  //Generate checkoutID

  app.get("/startCheckout", function (req, res) {
    if (currentCheckout === "") {
      client.checkout.create().then((checkout) => {
        currentCheckout = checkout.id; // ID of an existing checkout
        Realcheckout = checkout;
        res.json({
          currentCheckoutId: currentCheckout,
        });
      });
    } else {
      res.send("Still here");
    }
  });

  //See current Checkout
  app.get("/currentCheckout", function (req, res) {
    if (currentCheckout === "") {
      res.send("No current checkout");
    } else {
      client.checkout.fetch(currentCheckout).then((checkout) => {
        res.json({
          currentCheckoutId: currentCheckout,
          webURL: checkout.webUrl,
        });
      });
    }
  });

  app.get("/lastCheckout", function (req, res) {
    if (lastCheckout === "") {
      res.send("No current checkout");
    } else {
      client.checkout.fetch(lastCheckout).then((checkout) => {
        res.json(checkout.webUrl);
      });
    }
  });

  //End Checkout
  app.get("/endCheckout", function (req, res) {
    client.checkout.fetch(currentCheckout).then((checkout) => {
      // Do something with the checkout
      lastCheckout = checkout.id;
      console.log("--------------COMPLETE-----------------");
      currentCheckout = ""; // ID of an existing checkout
      res.json(checkout);
    });
  });

  //Add iphone to checkout
  app.get("/iphone", function (req, res) {
    const checkoutId = currentCheckout; // ID of an existing checkout
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
        res.json(checkout); //Return checkout with added items
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  });

  //Add AirPods to checkout
  app.get("/airpods", function (req, res) {
    const checkoutId = currentCheckout; // ID of an existing checkout
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
        res.json(checkout); //Return checkout with added items
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  });

  //Add Apple Watch to checkout
  app.get("/watch", function (req, res) {
    const checkoutId = currentCheckout; // ID of an existing checkout
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
        res.json(checkout); //Return checkout with added items
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  });

  //Check availability
  app.get("/product/:productId", function (req, res) {
    // Fetch a single product by ID
    const productId = {
      iphone: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzU3MzQwMjMyMDA5MzA=", // ID
      watch: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzU3ODc4MDgxNzAxNDY=", //ID
      airpods: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzU3ODc4NzgyOTM2NjY=", // ID
    };

    client.product.fetch(productId[req.params.productId]).then((product) => {
      // Do something with the product
      res.json({
        price: product.variants[0].price,
        onStock: product.availableForSale,
      });
    });
  });
};
