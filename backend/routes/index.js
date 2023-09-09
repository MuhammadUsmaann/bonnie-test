const api = (module.exports = require("express").Router());

const CredentialsRouter = require("./credentialsinfoApi");
const ProducationRouter = require("./producation");

api
  .get("/", async (req, res, next) => {
    res.status(200).send("Wellcome Assignment DataAPI");
  })

  .use("/auth", CredentialsRouter)
  .use("/production", ProducationRouter);
