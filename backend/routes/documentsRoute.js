const express = require("express");
const app = express();
const documentsRepository = require("./dbRepository/documentsRepository.js");
const nomenculaturesRepository = require("./dbRepository/nomenculaturesRepository.js");
const consignmentsRepository = require("./dbRepository/consignmentsRepository.js");

// TODO : add validation
app.post("/", async (req, res) => {
  try {
    console.log(req.body);
    if (req.body.isOutcome) {
      const consignmentsBySeries = await consignmentsRepository.getAllBySeries(
        req.body
      );
      let totalConsCount = 0;
      await Promise.all(
        consignmentsBySeries.map(async (x) => {
          const document = await documentsRepository.getByConsignmentId(
            x.consignmentId
          );
          console.log(document[0].isOutcome, "******");
          if (document[0].isOutcome === true) {
            totalConsCount -= Number(x.count);
          } else totalConsCount += Number(x.count);
        })
      );
      if (req.body.count > totalConsCount) {
        console.log(req.body.count);
        return res.status(403).json({
          error: {
            code: "forbidden",
            message: "недостаточно товара для списания",
          },
        });
      }
    }

    // const docResult = await documentsRepository.create(req.body);
    // const nomResult = await nomenculaturesRepository.create(req.body);
    // const consResult = await consignmentsRepository.create(req.body);

    // result = docResult && nomResult && consResult;

    res.status(200);
    // .json(result);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      error: {
        code: "internalServerError",
        message: "server error when try to create document",
      },
    });
  }
});

app.post("/report", async (req, res) => {
  try {
    const allConsignmentsBySeries = await consignmentsRepository.getAllBySeries(
      req.body
    );
    const document = await documentsRepository.getByConsignmentId(
      allConsignmentsBySeries[0].consignmentId
    );
    const nomenculature = await nomenculaturesRepository.findOne(
      document[0].nomenculatureId
    );

    //  counts
    let beforeCount = 0;
    let afterCount = 0;
    let income = 0;
    let outcome = 0;

    await Promise.all(
      allConsignmentsBySeries.map(async (x) => {
        const document = await documentsRepository.getByConsignmentId(
          x.consignmentId
        );
        if (x.receiptDate.getTime() <= Date.parse(req.body.startDate)) {
          if (document[0].isOutcome === true) {
            beforeCount -= Number(x.count);
          } else beforeCount += Number(x.count);
        }
        if (x.receiptDate.getTime() <= Date.parse(req.body.endDate)) {
          if (document[0].isOutcome === true) {
            afterCount -= Number(x.count);
          } else afterCount += Number(x.count);
        }
        if (
          Date.parse(req.body.startDate) <=
          x.receiptDate.getTime() <=
          Date.parse(req.body.endDate)
        ) {
          if (document[0].isOutcome === true) {
            outcome += Number(x.count);
          } else income += Number(x.count);
        }
      })
    );

    res
      .status(200)
      .json({
        code: nomenculature.nomenculatureCode,
        name: nomenculature.nomenculatureName,
        before: beforeCount,
        after: afterCount,
        income: income,
        outcome: outcome,
      });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      error: {
        code: "internalServerError",
        message: "server error when try to return a report",
      },
    });
  }
});

module.exports = app;
