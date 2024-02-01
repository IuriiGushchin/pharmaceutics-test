const db = require("./index.js");

const create = async ({
  documentId,
  consignmentId,
  isOutcome,
  nomenculatureId,
  outcomeTypeFIFO,
  documentDate,
  documentNumber
}) => {
  const query = `
        INSERT INTO
            "public"."documentsTable" 
                ("documentId", "consignmentId",  "isOutcome", "nomenculatureId", "outcomeTypeFIFO", "documentDate", "documentNumber")
        VALUES
            ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
    ;`;

  const result = await db.query(query, [
    documentId,
    consignmentId,
    isOutcome,
    nomenculatureId,
    outcomeTypeFIFO,
    documentDate,
    documentNumber
  ]);

  return result.rows[0];
};

const getAllInDateRange = async ({ startDate, endDate }) => {
  console.log(startDate, endDate);

  const query = `
        SELECT * FROM
            "public"."documentsTable"
        WHERE
            ("documentDate" BETWEEN $1 AND $2)
    ;`

    const result = await db.query(query, [startDate, endDate])


  return result.rows[0];
};

module.exports = {
  create,
  getAllInDateRange,
};
