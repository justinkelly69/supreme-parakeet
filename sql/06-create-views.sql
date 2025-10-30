-------------------------------------------------------------------------------
-- CREATE VIEW "public"."continent_details" 
-------------------------------------------------------------------------------
DROP VIEW   IF EXISTS   "public"."continent_details";
CREATE VIEW             "public"."continent_details" 
    AS SELECT
        "cn"."id",
        "cn"."name",
        "co"."latitude",
        "co"."longitude",
        "co"."zoom",
        "co"."description"
    FROM
        "iso"."continents" "cn"
        LEFT JOIN   "world"."enabled_continents" "co" 
            ON          "co"."id" = "cn"."id"
    ORDER BY
        "cn"."name";

-------------------------------------------------------------------------------
-- CREATE VIEW "public"."country_details"
-------------------------------------------------------------------------------
DROP VIEW   IF EXISTS   "public"."country_details";
CREATE VIEW             "public"."country_details" 
    AS SELECT
        "co"."id",
        "co"."continent_id",
        "cn"."name"     AS "continent_name",
        "co"."name",
        "co"."flag",
        "co"."tld",
        "co"."prefix",
        "co"."is_eu",
        "co"."iso2",
        "co"."demonym",
        "co"."population",
        "co"."density",
        "co"."area",
        "co"."gdp",
        "co"."median_age",
        "co"."website",
        "co"."driving_side",
        "co"."un_member",
        "co"."religion",
        "wc"."description",
        "wc"."latitude",
        "wc"."longitude",
        "wc"."zoom",
        "wc"."is_enabled",
        JSON_AGG (
            json_build_object (
                'id'            , "lg"."id", 
                'name'          , "lg"."name", 
                'is_enabled'    , "lg"."is_enabled"
            )
        ) AS languages,
        JSON_AGG (
            json_build_object (
                'id'            , "cu"."id", 
                'name'          , "cu"."name"
            )
        ) AS "currencies"
    FROM
        "iso"."countries" "co"
        LEFT JOIN   "iso"."continents" "cn"           
            ON          "cn"."id" = "co"."continent_id"
        LEFT JOIN   "iso"."country_languages" "cl"    
            ON          "co"."id" = "cl"."country_id"
        LEFT JOIN   "iso"."languages" "lg"            
            ON          "lg"."id" = "cl"."language_id" 
        LEFT JOIN   "iso"."country_currencies" "cc"   
            ON          "co"."id" = "cc"."country_id"
        LEFT JOIN   "iso"."currencies" "cu"           
            ON          "cu"."id" = "cc"."currency_id" 
        LEFT JOIN   "world"."enabled_countries" "wc"  
            ON          "wc"."id" = "co"."id"
    GROUP BY
        "co"."id",
        "cn"."name",
        "wc"."is_enabled",
        "wc"."description",
        "wc"."latitude",
        "wc"."longitude",
        "wc"."zoom"
    ORDER BY
        "co"."name";

-------------------------------------------------------------------------------
-- CREATE VIEW "public"."city_details"
-------------------------------------------------------------------------------
DROP VIEW   IF EXISTS   "public"."city_details";
CREATE VIEW             "public"."city_details" 
    AS SELECT
        "ci"."id",
        "ci"."name",
        "ci"."name_ascii",
        "ci"."country",
        "ci"."country_id",
        "ci"."iso2",
        "ci"."iso3",
        "ci"."admin_name",
        "ci"."capital",
        "ci"."population",
        "wi"."is_enabled",
        "wi"."latitude",
        "wi"."longitude",
        "wi"."zoom",
        "wi"."description"
    FROM
        "iso"."cities" "ci"
    LEFT JOIN       "world"."enabled_cities" "wi" 
        ON              "wi"."id" = "ci"."id"
    LEFT JOIN       "world"."enabled_countries" "ec" 
        ON              "ec"."id" = "ci"."country_id"
    ORDER BY    
        "ci"."name";
