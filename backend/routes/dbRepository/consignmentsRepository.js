const db = require("./index.js");

const create = async ({
  consignmentId,
  consignmentCode,
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
    consignmentCode,
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
  { consignmentCode, series, manufacturer, bestBeforeDate, receiptDate, count }
) => {
  const query = `
        UPDATE
            "public"."consignmentsTable"
          SET
            "consignmentCode" = $2,
            "series" = $3,
            "manufacturer" = $4,
            "bestBeforeDate" = $5,
            "receiptDate" = $6,
            "count" = $7 
        WHERE
        "consignmentId" = $1
        RETURNING *
    ;`;

  const result = await db.query(query, [
    id,
    consignmentCode,
    series,
    manufacturer,
    bestBeforeDate,
    receiptDate,
    count,
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
  findOne,
};
