"use strict";

import nodemailer from "nodemailer";
import fs from "fs";

require.extensions[".html"] = (module, filename) => {
  module.exports = fs.readFileSync(filename, "utf8");
};

let emailRegister = require("./registerEmail.html");
const emailTemple = emailRegister;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "bapsystemhue",
    pass: "Bap@2018"
  }
});

class SendEmail {
  codeCurent = "0965215877";
  static register(receiverEmail, codeToActivate) {
    try {
      emailRegister = emailRegister.replace(
        "#thisweb",
        `<a href='http://localhost:4201/verifyregister/${receiverEmail}'>this web </a>`
      );
      emailRegister = emailRegister.replace(codeCurent, codeToActivate);

      let messageRegister = {
        from: "bapsystemhue@gmail.com",
        to: receiverEmail,
        subject: "Confirm account",
        text: "",
        html: emailRegister
      };

      transporter.sendMail(messageRegister, (error, info) => {
        if (error) return false;
      });

      emailRegister = emailTemple;

      return true;
    } catch (error) {
      return false;
    }
  }
}

export { SendEmail };
