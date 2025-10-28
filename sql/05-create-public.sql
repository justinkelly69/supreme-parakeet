DROP SCHEMA IF EXISTS public CASCADE;
CREATE SCHEMA IF NOT EXISTS public;

DROP TABLE IF EXISTS public.enabled_continents;
CREATE TABLE IF NOT EXISTS public.enabled_continents (
    "id"                    CHAR(2) NOT NULL UNIQUE,
    "description"           VARCHAR(10000) NOT NULL DEFAULT '',
    "longitude"             FLOAT NOT NULL DEFAULT 0,
    "latitude"              FLOAT NOT NULL DEFAULT 0,
    "zoom"                  INTEGER NOT NULL DEFAULT 1,
     CONSTRAINT "fk_enabled_continents" 
        FOREIGN KEY ("id") 
        REFERENCES iso.continents ("id")
);

INSERT INTO                 public.enabled_continents (id)
    SELECT                  "id"
    FROM                    iso.continents
    ORDER BY                "name";

UPDATE public.enabled_continents SET latitude = 7.047378,    longitude = 22.067525   WHERE id = 'AF';
UPDATE public.enabled_continents SET latitude = -69.831286,  longitude = 75.157788   WHERE id = 'AN';
UPDATE public.enabled_continents SET latitude = 50.145893,   longitude = 104.021219  WHERE id = 'AS';
UPDATE public.enabled_continents SET latitude = 48.618841,   longitude = 16.940829   WHERE id = 'EU';
UPDATE public.enabled_continents SET latitude = 49.039594,   longitude = -104.329124 WHERE id = 'NA';
UPDATE public.enabled_continents SET latitude = 19.603484,   longitude = -155.473617 WHERE id = 'OC';
UPDATE public.enabled_continents SET latitude = -14.271337,  longitude = -55.621334  WHERE id = 'SA';

GRANT SELECT, UPDATE ON     public.enabled_continents TO public;

DROP TABLE IF EXISTS public.enabled_countries;
CREATE TABLE IF NOT EXISTS public.enabled_countries (
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

INSERT INTO                 public.enabled_countries (
                                id, longitude, latitude
                            )
    SELECT                  "id", "longitude", "latitude"
    FROM                    iso.countries
    ORDER BY                "name";

GRANT SELECT, UPDATE ON     public.enabled_countries TO public;



DROP TABLE IF EXISTS public.enabled_cities;
CREATE TABLE public.enabled_cities (
    "id"            VARCHAR(20)     NOT NULL,
    "is_enabled"    BOOLEAN         NOT NULL DEFAULT FALSE,
    "latitude"      FLOAT,
    "longitude"     FLOAT,
    "zoom"          INTEGER         NOT NULL DEFAULT 1,
    "description"   VARCHAR(10000)  NOT NULL DEFAULT ''
);

INSERT INTO public.enabled_cities (
    id,
    latitude, 
    longitude
)
    SELECT  id,
            latitude, 
            longitude
    FROM    iso.cities;

GRANT SELECT, UPDATE ON public.enabled_cities TO public;

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
LEFT JOIN public.enabled_cities wi ON wi."id" = ci."id"
LEFT JOIN public.enabled_countries ec ON ec."id" = ci."country_id"
ORDER BY ci."name";
