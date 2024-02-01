const db = require("./index.js");

const create = async ({
  consignmentId,
  consignmentNumber,
  series,
  manufacturer,
  bestBeforeDate,
  receiptDate,
  count,
}) => {
  const query = `
        INSERT INTO
            "public"."consignmentsTable" 
                ("consignmentId", "consignmentCode", "series", "manufacturer", "bestBeforeDate", "receiptDate", "count")
        VALUES
            ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
    ;`;

  const result = await db.query(query, [
    consignmentId,
    consignmentNumber,
    series,
    manufacturer,
    bestBeforeDate ? bestBeforeDate : null,
    receiptDate,
    count,
  ]);

  return result.rows[0];
};

const updateOne = async (
  id,
  { nomenculatureName, nomenculatureCode, consignmentId }
) => {
  const query = `
        UPDATE
            "public"."documentsTable"
        SET
            "nomenculatureName" = $2,
            "nomenculatureCode" = $3,
            "consignmentId" = $4
        WHERE
        "nomenculatureId" = $1
        RETURNING *
    ;`;

  const result = await db.query(query, [
    id,
    nomenculatureName,
    nomenculatureCode,
    consignmentId,
  ]);

  return result.rows[0];
};

const getAllBySeries = async ({ series }) => {
  const query = `
            SELECT * FROM
                "public"."consignmentsTable"
            WHERE
            "series" = $1
        ;`;

  const result = await db.query(query, [series]);

  return result.rows;
};

const findOne = async (id) => {
  const query = `
        SELECT * FROM
            "public"."consignmentsTable"
        WHERE
        "consignmentId" = $1
    ;`;

  const result = await db.query(query, [id]);

  return result.rows[0];
};

module.exports = {
  create,
  updateOne,
  getAllBySeries,
  findOne
};
