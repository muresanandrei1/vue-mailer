require("dotenv").config();
const express = require("express");
const consola = require("consola");
const { Nuxt, Builder } = require("nuxt");
const app = express();
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const sendEmail = payload => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.ACCOUNT,
      pass: process.env.PASS
    }
  });

  const { message, email } = payload;

  return transporter.sendMail({
    from: "muresan.1andrei@gmail.com",
    to: email,
    subject: "This is an email from that lame meetup",
    text: message
  });
};

// Import and Set Nuxt.js options
const config = require("../nuxt.config.js");
config.dev = process.env.NODE_ENV !== "production";

app.use(bodyParser.json());

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config);

  const { host, port } = nuxt.options.server;

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  } else {
    await nuxt.ready();
  }

  app.post("/api/send-email", (req, res) => {
    sendEmail(req.body)
      .then(() => {
        res.status("200").send();
      })
      .catch(err => {
        console.log(err);
        res.status("500").send();
      });
  });

  // Give nuxt middleware to express
  app.use(nuxt.render);

  // Listen the server
  app.listen(port, host);
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  });
}
start();
