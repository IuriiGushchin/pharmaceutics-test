const express = require("express");
const app = express();
const documentsRepository = require("./dbRepository/documentsRepository.js");
const nomenculaturesRepository = require("./dbRepository/nomenculaturesRepository.js");
const consignmentsRepository = require("./dbRepository/consignmentsRepository.js");

app.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const docResult = await documentsRepository.create(req.body);
    const nomResult = await nomenculaturesRepository.create(req.body);
    const consResult = await consignmentsRepository.create(req.body);

    result = docResult && nomResult && consResult;

    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      error: {
        code: "internalServerError",
        message: "server error when try to create documents",
      },
    });
  }
});

app.post("/report", async (req, res) => {
  try {
    console.log(req.body);

    const reportValues = await documentsRepository.getAllInDateRange(req.body);
    const consignmentsBySeries = await consignmentsRepository.getAllBySeries(
      req.body
    );
    const idsOfConsignments = consignmentsBySeries.map((x) => x.consignmentId);
    
    const correctStringOfIds =
      `'${idsOfConsignments.join([(separator = "','")])}'`
      console.log(correctStringOfIds)
    const nomenculatures =
      nomenculaturesRepository.getAllByConsignmentIds(correctStringOfIds);

    // const

    res.status(200).json(nomenculatures);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      error: {
        code: "internalServerError",
        message: "server error when try to create documents",
      },
    });
  }
});

module.exports = app;
