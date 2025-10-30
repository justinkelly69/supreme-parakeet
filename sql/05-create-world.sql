DROP    SCHEMA  IF EXISTS       "world" CASCADE;
CREATE  SCHEMA  IF NOT EXISTS   "world";

-------------------------------------------------------------------------------
-- CREATE TABLE "world"."enabled_continents"
-------------------------------------------------------------------------------
CREATE TABLE 
    IF NOT EXISTS   "world"."enabled_continents" (
    "id"            CHAR(2) NOT NULL UNIQUE,
    "description"   VARCHAR(10000) NOT NULL DEFAULT '',
    "longitude"     FLOAT NOT NULL DEFAULT 0,
    "latitude"      FLOAT NOT NULL DEFAULT 0,
    "zoom"          INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT      "fk_enabled_continents" 
        FOREIGN KEY     ("id") 
        REFERENCES      "iso"."continents" ("id")
);

INSERT INTO         "world"."enabled_continents" ("id")
    SELECT          "id"
    FROM            "iso"."continents"
    ORDER BY        "name";

UPDATE "world"."enabled_continents" SET "latitude" = 7.047378,    "longitude" = 22.067525   WHERE "id" = 'AF';
UPDATE "world"."enabled_continents" SET "latitude" = -69.831286,  "longitude" = 75.157788   WHERE "id" = 'AN';
UPDATE "world"."enabled_continents" SET "latitude" = 50.145893,   "longitude" = 104.021219  WHERE "id" = 'AS';
UPDATE "world"."enabled_continents" SET "latitude" = 48.618841,   "longitude" = 16.940829   WHERE "id" = 'EU';
UPDATE "world"."enabled_continents" SET "latitude" = 49.039594,   "longitude" = -104.329124 WHERE "id" = 'NA';
UPDATE "world"."enabled_continents" SET "latitude" = 19.603484,   "longitude" = -155.473617 WHERE "id" = 'OC';
UPDATE "world"."enabled_continents" SET "latitude" = -14.271337,  "longitude" = -55.621334  WHERE "id" = 'SA';

GRANT SELECT, UPDATE 
    ON              "world"."enabled_continents" 
    TO              "public";

ALTER TABLE         "world"."enabled_continents" 
    ENABLE          ROW LEVEL SECURITY;

CREATE POLICY       "Users can read enabled_continents"
    ON              "world"."enabled_continents"
    AS              PERMISSIVE
    FOR             SELECT
    TO              "public"
    USING (
                    (select TRUE)   
    );

CREATE POLICY       "Users can enable/disable enabled_continents"
    ON              "world"."enabled_continents"
    AS              PERMISSIVE
    FOR             UPDATE
    TO              "public"
    USING (
                    (select TRUE)   
    )
    WITH CHECK (
                    (SELECT true)
    );

-------------------------------------------------------------------------------
-- CREATE TABLE "world"."enabled_countries"
-------------------------------------------------------------------------------
CREATE TABLE 
    IF NOT EXISTS   "world"."enabled_countries" (
    "id"            CHAR(2) NOT NULL UNIQUE,
    "is_enabled"    BOOLEAN NOT NULL DEFAULT FALSE,
    "description"   VARCHAR(10000) NOT NULL DEFAULT '',
    "longitude"     FLOAT,
    "latitude"      FLOAT,
    "zoom"          INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT      "fk_enabled_countries" 
        FOREIGN KEY     ("id") 
        REFERENCES      "iso"."countries" ("id")
);

INSERT INTO         "world"."enabled_countries" ("id", "longitude", "latitude")
    SELECT          "id", "longitude", "latitude"
    FROM            "iso"."countries"
    ORDER BY        "name";

GRANT SELECT, UPDATE 
    ON              "world"."enabled_countries" 
    TO              "public";

ALTER TABLE         "world"."enabled_countries" 
    ENABLE          ROW LEVEL SECURITY;

CREATE POLICY       "Users can read enabled_countries"
    ON              "world"."enabled_countries"
    AS              PERMISSIVE
    FOR             SELECT
    TO              "public"
    USING (
                    (select TRUE)   
    );

CREATE POLICY       "Users can enable/disable enabled_countries"
    ON              "world"."enabled_countries"
    AS              PERMISSIVE
    FOR             UPDATE
    TO              "public"
    USING (
                    (select TRUE)   
    )
    WITH CHECK (
                    (SELECT true)
    );

-------------------------------------------------------------------------------
-- CREATE TABLE "world"."enabled_cities"
-------------------------------------------------------------------------------
CREATE TABLE 
    IF NOT EXISTS   "world"."enabled_cities" (
    "id"            VARCHAR(20)     NOT NULL,
    "is_enabled"    BOOLEAN         NOT NULL DEFAULT FALSE,
    "latitude"      FLOAT,
    "longitude"     FLOAT,
    "zoom"          INTEGER         NOT NULL DEFAULT 1,
    "description"   VARCHAR(10000)  NOT NULL DEFAULT ''
);

INSERT INTO "world"."enabled_cities" (
    "id",
    "latitude", 
    "longitude"
)
    SELECT          "id", "latitude", "longitude"
    FROM            "iso"."cities";

GRANT SELECT, UPDATE 
    ON              "world"."enabled_cities"
    TO              "public";

ALTER TABLE         "world"."enabled_cities" 
    ENABLE          ROW LEVEL SECURITY;

CREATE POLICY       "Users can read enabled_cities"
    ON              "world"."enabled_cities"
    AS              PERMISSIVE
    FOR             SELECT
    TO              "public"
    USING (
                    (select TRUE)   
    );

CREATE POLICY       "Users can enable/disable enabled_cities"
    ON              "world"."enabled_cities"
    AS              PERMISSIVE
    FOR             UPDATE
    TO              "public"
    USING (
                    (select TRUE)   
    )
    WITH CHECK (
                    (SELECT true)
    );
