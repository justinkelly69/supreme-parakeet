DROP SCHEMA IF EXISTS world CASCADE;
CREATE SCHEMA IF NOT EXISTS world;

DROP TABLE IF EXISTS world.enabled_countries;
CREATE TABLE IF NOT EXISTS world.enabled_countries (
    "id"                    CHAR(2) NOT NULL UNIQUE,
    "is_enabled"            BOOLEAN NOT NULL DEFAULT FALSE,
    "description"           VARCHAR(10000) NOT NULL DEFAULT '',
    "longitude"             INTEGER NOT NULL DEFAULT 0,
    "latitude"              INTEGER NOT NULL DEFAULT 0,
    "zoom"                  INTEGER NOT NULL DEFAULT 10,
     CONSTRAINT "fk_enabled_countries" 
        FOREIGN KEY ("id") 
        REFERENCES iso.countries ("id")
);

INSERT INTO                 world.enabled_countries (id)
    SELECT                  "id"
    FROM                    iso.countries
    ORDER BY                "name";

GRANT SELECT, UPDATE ON     world.enabled_countries TO public;


DROP TABLE IF EXISTS world.enabled_cities;
CREATE TABLE world.enabled_cities (
    id              VARCHAR(20)     NOT NULL,
    enabled         BOOLEAN         NOT NULL DEFAULT FALSE,
    latitude        FLOAT,
    longitude       FLOAT,
    zoom            INTEGER         NOT NULL DEFAULT 1,
    description     VARCHAR(10000)  NOT NULL DEFAULT ''
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










DROP FUNCTION IF EXISTS     update_enabled_countries;
CREATE OR REPLACE FUNCTION  update_enabled_countries(enabled_countries JSONB)
RETURNS  VOID
LANGUAGE plpgsql
AS $$
DECLARE
    enabled_country JSONB;
BEGIN
    FOR enabled_country IN SELECT jsonb_array_elements(enabled_countries)
    LOOP
        UPDATE  world.enabled_countries 
        SET     is_enabled  = (enabled_country->>'is_enabled')::BOOLEAN,
                description = (enabled_country->>'description')::VARCHAR(10000),
                longitude   = (enabled_country->>'longitude')::INTEGER,
                latitude    = (enabled_country->>'latitude')::INTEGER,
                zoom        = (enabled_country->>'zoom')::INTEGER
        WHERE   id          = enabled_country->>'id';
    END LOOP;
END;
$$;

DROP FUNCTION IF EXISTS     enable_disable_enabled_countries;
CREATE OR REPLACE FUNCTION  enable_disable_enabled_countries(enabled_countries JSONB)
RETURNS  VOID
LANGUAGE plpgsql
AS $$
DECLARE
    enabled_country JSONB;
BEGIN
    FOR enabled_country IN SELECT jsonb_array_elements(enabled_countries)
    LOOP
        UPDATE  world.enabled_countries 
        SET     is_enabled = (enabled_country->>'is_enabled')::BOOLEAN 
        WHERE   id         = enabled_country->>'id';
    END LOOP;
END;
$$;

DROP VIEW IF EXISTS public.country_details;

CREATE VIEW public.country_details AS
SELECT
    co."id",
    co."continent_id",
    cn."name" AS "continent_name",
    co."name",
    co."flag",
    co."tld",
    co."prefix",
    co."is_eu",
    wc."description",
    wc."latitude",
    wc."longitude",
    wc."zoom",
    wc."is_enabled",
    JSON_AGG (
        json_build_object (
            'id'         , lg."id", 
            'name'       , lg."name", 
            'is_enabled' , lg."is_enabled"
        )
    ) AS languages,
    JSON_AGG (
        json_build_object (
            'id'   , cu."id", 
            'name' , cu."name"
        )
    ) AS currencies
FROM
    iso.countries co
    LEFT JOIN iso.continents cn           ON cn."id" = co."continent_id"
    LEFT JOIN iso.country_languages cl    ON co."id" = cl."country_id"
    LEFT JOIN iso.languages lg            ON lg."id" = cl."language_id" 
    LEFT JOIN iso.country_currencies cc   ON co."id" = cc."country_id"
    LEFT JOIN iso.currencies cu           ON cu."id" = cc."currency_id" 
    LEFT JOIN world.enabled_countries wc ON wc."id" = co."id"
GROUP BY
    co."id",
    cn."name",
    wc."is_enabled",
    wc."description",
    wc."latitude",
    wc."longitude",
    wc."zoom"
ORDER BY
    co."name";

