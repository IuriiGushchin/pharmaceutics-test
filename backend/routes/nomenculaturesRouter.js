const express = require("express");
const app = express();
const nomenculaturesRepository = require("./dbRepository/nomenculaturesRepository.js");
const consignmentsRepository = require("./dbRepository/consignmentsRepository.js");

app.get("/", async (req, res) => {
  try {
    const result = await nomenculaturesRepository.getAll();
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      error: {
        code: "internalServerError",
        message: "server error when try to get list of nomenculatures",
      },
    });
  }
});

app.post("/create", async (req, res) => {
  try {
    const nomenculaturesResult = await nomenculaturesRepository.create(
      req.body
    );
    const consignmentsResult = await consignmentsRepository.create(req.body);

    res.json(consignmentsResult && nomenculaturesResult);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      error: {
        code: "internalServerError",
        message: "server error when try to create a monencolature ",
      },
    });
  }
});

app.get("/consignment", async (req, res) => {
  try {
    console.log('im working')
    const result = await consignmentsRepository.findOne(req.query.id);
    console.log(result)
    res.send(result);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      error: {
        code: "internalServerError",
        message: "server error when try to get a nomenculature ",
      },
    });
  }
});

app.get("/:id", async (req, res) => {
  try {
    const result = await nomenculaturesRepository.findOne(req.params.id);
    res.send(result);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      error: {
        code: "internalServerError",
        message: "server error when try to get nomenculatures consignment ",
      },
    });
  }
});

app.post("/:id", async (req, res) => {
  try {
    const result = await nomenculaturesRepository.updateOne(
      req.params.id,
      req.body
    );
    res.json(result);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      error: {
        code: "internalServerError",
        message: "server error when try to edit a monencolature ",
      },
    });
  }
});

module.exports = app;
