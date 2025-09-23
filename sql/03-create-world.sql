DROP SCHEMA IF EXISTS world CASCADE;
CREATE SCHEMA IF NOT EXISTS world;

DROP TABLE IF EXISTS world.countries;
CREATE TABLE IF NOT EXISTS world.selected_countries (
    "id"           CHAR(2) NOT NULL UNIQUE,
    "is_enabled"   BOOLEAN NOT NULL DEFAULT FALSE,
    "description"  VARCHAR(10000) NOT NULL DEFAULT '',
    "longitude"    INTEGER NOT NULL DEFAULT 0,
    "latitude"     INTEGER NOT NULL DEFAULT 0,
    "zoom"         INTEGER NOT NULL DEFAULT 10,
     CONSTRAINT "fk_selected_countries" FOREIGN KEY ("id") REFERENCES iso.countries ("id")
);

INSERT INTO world.selected_countries (id)
SELECT      "id"
FROM        iso.countries
ORDER BY    "name";

GRANT SELECT, UPDATE ON world.selected_countries TO public;

DROP FUNCTION IF EXISTS update_selected_countries;
CREATE OR REPLACE FUNCTION update_selected_countries(selected_countries JSONB)
RETURNS  VOID
LANGUAGE plpgsql
AS $$
DECLARE
    selected_country JSONB;
BEGIN
    FOR selected_country IN SELECT jsonb_array_elements(selected_countries)
    LOOP
        UPDATE  world.selected_countries 
        SET     is_enabled  = (selected_country->>'is_enabled')::BOOLEAN,
                description = (selected_country->>'description')::VARCHAR(10000),
                longitude   = (selected_country->>'longitude')::INTEGER,
                latitude    = (selected_country->>'latitude')::INTEGER,
                zoom        = (selected_country->>'zoom')::INTEGER
        WHERE   id          = selected_country->>'id';
    END LOOP;
END;
$$;

DROP FUNCTION IF EXISTS enable_disable_selected_countries;
CREATE OR REPLACE FUNCTION enable_disable_selected_countries(selected_countries JSONB)
RETURNS  VOID
LANGUAGE plpgsql
AS $$
DECLARE
    selected_country JSONB;
BEGIN
    FOR selected_country IN SELECT jsonb_array_elements(selected_countries)
    LOOP
        UPDATE world.selected_countries 
        SET    is_enabled = (selected_country->>'is_enabled')::BOOLEAN 
        WHERE  id         = selected_country->>'id';
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
    LEFT JOIN world.selected_countries wc ON wc."id" = co."id"
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

