const db = require("./index.js");

const create = async ({
  nomenculatureId,
  nomenculatureName,
  nomenculatureCode,
  consignmentId,
}) => {
  const query = `
        INSERT INTO
            "public"."nomenculaturesTable" ("nomenculatureId", "nomenculatureCode", "nomenculatureName", "consignmentId")
        VALUES
            ($1, $2, $3, $4)
        RETURNING *
    ;`;

  const result = await db.query(query, [
    nomenculatureId,
    nomenculatureCode,
    nomenculatureName,
    consignmentId,
  ]);

  return result.rows[0];
};

const getAll = async () => {
  const query = `
        SELECT * FROM
            "public"."nomenculaturesTable"
    ;`;

  const result = await db.query(query);

  return result.rows;
};

const findOne = async (id) => {
  const query = `
        SELECT * FROM
            "public"."nomenculaturesTable"
        WHERE
        "nomenculatureId" = $1
    ;`;

  const result = await db.query(query, [id]);

  return result.rows[0];
};

const updateOne = async (
  id,
  { nomenculatureName, nomenculatureCode, consignmentId }
) => {
  const query = `
        UPDATE
            "public"."nomenculaturesTable"
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

module.exports = {
  create,
  findOne,
  getAll,
  updateOne
};
