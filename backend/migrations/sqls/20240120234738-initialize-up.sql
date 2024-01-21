/*
 Navicat Premium Data Transfer

 Source Server         : PostgreSQL_Conn
 Source Server Type    : PostgreSQL
 Source Server Version : 160001 (160001)
 Source Host           : localhost:5432
 Source Catalog        : postgres
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 160001 (160001)
 File Encoding         : 65001
*/


-- ----------------------------
-- Table structure for consignmentsTable
-- ----------------------------
DROP TABLE IF EXISTS "public"."consignmentsTable";
CREATE TABLE "public"."consignmentsTable" (
  "consignmentId" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "consignmentNumber" int4,
  "series" varchar(255) COLLATE "pg_catalog"."default",
  "manufacturer" varchar(255) COLLATE "pg_catalog"."default",
  "bestBeforeDate" date,
  "receiptDate" date,
  "count" varchar(255) COLLATE "pg_catalog"."default" NOT NULL
)
;
ALTER TABLE "public"."consignmentsTable" OWNER TO "postgres";

-- ----------------------------
-- Primary Key structure for table consignmentsTable
-- ----------------------------
ALTER TABLE "public"."consignmentsTable" ADD CONSTRAINT "consignmentsTable_pkey" PRIMARY KEY ("consignmentId");


-- ----------------------------
-- Table structure for nomenculaturesTable
-- ----------------------------
DROP TABLE IF EXISTS "public"."nomenculaturesTable";
CREATE TABLE "public"."nomenculaturesTable" (
  "nomenculatureId" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "nomenculatureCode" varchar(255) COLLATE "pg_catalog"."default",
  "nomenculatureName" varchar(255) COLLATE "pg_catalog"."default",
  "consignmentId" varchar(255) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "public"."nomenculaturesTable" OWNER TO "postgres";

-- ----------------------------
-- Primary Key structure for table nomenculaturesTable
-- ----------------------------
ALTER TABLE "public"."nomenculaturesTable" ADD CONSTRAINT "nomenculaturesTable_pkey" PRIMARY KEY ("nomenculatureId");


-- ----------------------------
-- Table structure for documentsTable
-- ----------------------------
DROP TABLE IF EXISTS "public"."documentsTable";
CREATE TABLE "public"."documentsTable" (
  "documentId" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "consignmentId" varchar(255) COLLATE "pg_catalog"."default",
  "isIncome" bool NOT NULL
)
;
ALTER TABLE "public"."documentsTable" OWNER TO "postgres";

-- ----------------------------
-- Primary Key structure for table documentsTable
-- ----------------------------
ALTER TABLE "public"."documentsTable" ADD CONSTRAINT "documentsTable_pkey" PRIMARY KEY ("documentId");



