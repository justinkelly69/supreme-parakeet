DROP SCHEMA IF EXISTS world CASCADE;
CREATE SCHEMA IF NOT EXISTS world;

DROP TABLE IF EXISTS world.enabled_countries;
CREATE TABLE IF NOT EXISTS world.enabled_countries (
    "id"                    CHAR(2) NOT NULL UNIQUE,
    "is_enabled"            BOOLEAN NOT NULL DEFAULT FALSE,
    "description"           VARCHAR(10000) NOT NULL DEFAULT '',
    "longitude"             FLOAT,
    "latitude"              FLOAT,
    "zoom"                  INTEGER NOT NULL DEFAULT 1,
     CONSTRAINT "fk_enabled_countries" 
        FOREIGN KEY ("id") 
        REFERENCES iso.countries ("id")
);

INSERT INTO                 world.enabled_countries (
                                id, 
                                longitude, 
                                latitude
                            )
    SELECT                  "id", "longitude", "latitude"
    FROM                    iso.countries
    ORDER BY                "name";

GRANT SELECT, UPDATE ON     world.enabled_countries TO public;



DROP TABLE IF EXISTS world.enabled_cities;
CREATE TABLE world.enabled_cities (
    "id"            VARCHAR(20)     NOT NULL,
    "is_enabled"    BOOLEAN         NOT NULL DEFAULT FALSE,
    "latitude"      FLOAT,
    "longitude"     FLOAT,
    "zoom"          INTEGER         NOT NULL DEFAULT 1,
    "description"   VARCHAR(10000)  NOT NULL DEFAULT ''
);

INSERT INTO world.enabled_cities (
    id,
    latitude, 
    longitude
)
    SELECT  id,
            latitude, 
            longitude
    FROM    iso.cities;

GRANT SELECT, UPDATE ON world.enabled_cities TO public;

DROP VIEW IF EXISTS public.city_details;
CREATE VIEW public.city_details AS
SELECT
    ci."id",
    ci."name",
    ci."name_ascii",
    ci."country",
    ci."country_id",
    ci."iso2",
    ci."iso3",
    ci."admin_name",
    ci."capital",
    ci."population",
    wi."is_enabled",
    wi."latitude",
    wi."longitude",
    wi."zoom",
    wi."description"
FROM
    iso.cities ci
LEFT JOIN world.enabled_cities wi ON wi."id" = ci."id"
LEFT JOIN world.enabled_countries ec ON ec."id" = ci."country_id"
ORDER BY ci."name";
