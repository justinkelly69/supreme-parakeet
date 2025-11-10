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

-------------------------------------------------------------------------------
-- CREATE TABLE "world"."attractions"
-------------------------------------------------------------------------------
DROP TABLE IF EXISTS "world"."attractions";
CREATE TABLE "world"."attractions" (
    "id"                    SERIAL              PRIMARY KEY,
    "city_id"               VARCHAR(20)         NOT NULL,
    "title"                 VARCHAR(100)        NOT NULL,
    "subtitle"              VARCHAR(1000)       NOT NULL DEFAULT '',
    "description"           VARCHAR(4000)       NOT NULL DEFAULT '',
    "price"                 FLOAT               NOT NULL DEFAULT 0,
    "category_name"         VARCHAR(100)        NOT NULL,
    "address"               VARCHAR(1000)       NOT NULL DEFAULT '',
    "neighborhood"          VARCHAR(60)         NOT NULL DEFAULT '',
    "street"                VARCHAR(60)         NOT NULL DEFAULT '',
    "postal_code"           VARCHAR(20)         NOT NULL DEFAULT '',
    "state"                 VARCHAR(20)         NOT NULL DEFAULT '',
    "city"                  VARCHAR(60)         NOT NULL DEFAULT '',
    "country"               VARCHAR(50)         NOT NULL DEFAULT '',
    "website"               VARCHAR(1000)       NOT NULL DEFAULT '',
    "phone"                 VARCHAR(20)         NOT NULL DEFAULT '',
    "phone_unformatted"     VARCHAR(20)         NOT NULL DEFAULT '',
    "latitude"              FLOAT               NOT NULL DEFAULT 0,
    "longitude"             FLOAT               NOT NULL DEFAULT 0,
    "located_in"            VARCHAR(1000)       NOT NULL DEFAULT '',
    "total_score"           FLOAT               NOT NULL DEFAULT 0,
    "permanently_closed"    BOOLEAN             NOT NULL DEFAULT FALSE,
    "temporarily_closed"    BOOLEAN             NOT NULL DEFAULT FALSE,
    "place_id"              VARCHAR(100)        NOT NULL,
    "categories"            JSONB               NOT NULL DEFAULT '{}',
    "scraped_at"            TIMESTAMPTZ         NOT NULL,
    "opening_hours"         JSONB               NOT NULL DEFAULT '{}',
    "additional_info"       JSONB               NOT NULL DEFAULT '{}',
    "image_url"             VARCHAR(1000)       NOT NULL DEFAULT ''
);

GRANT SELECT 
    ON              "world"."attractions" 
    TO              "public";

ALTER TABLE         "world"."attractions" 
    ENABLE          ROW LEVEL SECURITY;

CREATE POLICY       "Users can read attractions"
    ON              "world"."attractions"
    AS              PERMISSIVE
    FOR             SELECT
    TO              "public"
    USING (
                    (select TRUE)   
    );