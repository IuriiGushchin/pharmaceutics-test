const db = require("./index.js");

const create = async ({
  documentId,
  consignmentId,
  isOutcome,
  nomenculatureId,
  outcomeTypeFIFO,
  documentDate,
  documentNumber,
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
    documentNumber,
  ]);

  return result.rows[0];
};


const getByConsignmentId = async (id) => {
  const query = `
        SELECT * FROM
            "public"."documentsTable"
        WHERE
            "consignmentId" = $1 
    ;`;

  const result = await db.query(query, [id]);

  return result.rows[0];
};

module.exports = {
  create,
  getByConsignmentId,
};
