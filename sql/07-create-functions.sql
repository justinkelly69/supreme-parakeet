-------------------------------------------------------------------------------
-- CREATE FUNCTION update_enabled_countries
-- Update the enabled_countries table with description, lat/long and zoom
-------------------------------------------------------------------------------
DROP FUNCTION IF EXISTS     update_enabled_countries;
CREATE OR REPLACE FUNCTION  update_enabled_countries(enabled_countries JSONB)
RETURNS     VOID
LANGUAGE    plpgsql
AS $$
DECLARE
    enabled_country JSONB;
BEGIN
    FOR enabled_country IN SELECT jsonb_array_elements(enabled_countries)
    LOOP
        UPDATE  "world"."enabled_countries" 
        SET     "is_enabled"  = (enabled_country->>'is_enabled')::BOOLEAN,
                "description" = (enabled_country->>'description')::VARCHAR(10000),
                "longitude"   = (enabled_country->>'longitude')::INTEGER,
                "latitude"    = (enabled_country->>'latitude')::INTEGER,
                "zoom"        = (enabled_country->>'zoom')::INTEGER
        WHERE   "id"          =  enabled_country->>'id';
    END LOOP;
END;
$$;


-------------------------------------------------------------------------------
-- CREATE FUNCTION set_enabled_countries
-- Enable or disable a country
-------------------------------------------------------------------------------
DROP FUNCTION IF EXISTS     set_enabled_countries;
CREATE OR REPLACE FUNCTION  set_enabled_countries(enabled_countries CHAR(2) ARRAY)
RETURNS     VOID
LANGUAGE    plpgsql
AS $$
DECLARE
    enabled_country CHAR(2);
BEGIN
        UPDATE  "world"."enabled_countries" 
        SET     "is_enabled" =      FALSE
        WHERE   TRUE;

    FOR enabled_country IN SELECT unnest(enabled_countries)
    LOOP
        UPDATE  "world"."enabled_countries" 
        SET     "is_enabled" =      TRUE
        WHERE   "id"         =      enabled_country;
    END LOOP;

END;
$$;

-------------------------------------------------------------------------------
-- CREATE FUNCTION set_enabled_cities
-- Enable or disable a city
-------------------------------------------------------------------------------
DROP FUNCTION IF EXISTS     set_enabled_cities;
CREATE OR REPLACE FUNCTION  set_enabled_cities(enabled_cities VARCHAR(20) ARRAY)
RETURNS     VOID
LANGUAGE    plpgsql
AS $$
DECLARE
    enabled_city VARCHAR(20);
BEGIN
        UPDATE  "world"."enabled_cities" 
        SET     "is_enabled" =      FALSE
        WHERE   TRUE;

    FOR enabled_city IN SELECT unnest(enabled_cities)
    LOOP
        UPDATE  "world"."enabled_cities" 
        SET     "is_enabled" =      TRUE
        WHERE   "id"         =      enabled_city;
    END LOOP;

END;
$$;

-------------------------------------------------------------------------------
-- CREATE FUNCTION get_world_continents
-------------------------------------------------------------------------------
DROP FUNCTION IF EXISTS get_world_continents;
CREATE OR REPLACE FUNCTION  get_world_continents()
RETURNS setof continent_details 
AS 
$$
    SELECT * FROM continent_details WHERE true;
$$
LANGUAGE sql;

-------------------------------------------------------------------------------
-- CREATE FUNCTION get_continent_with_countries
-------------------------------------------------------------------------------
DROP FUNCTION IF EXISTS     get_continent_with_countries;
CREATE OR REPLACE FUNCTION  get_continent_with_countries(continent_id CHAR(2))  
RETURNS     JSONB
LANGUAGE    plpgsql
AS $$
DECLARE
    result  JSONB;
BEGIN
    SELECT jsonb_build_object(
        'id'            , "cd"."id",
        'name'          , "cd"."name",
        'longitude'     , "cd"."longitude",
        'latitude'      , "cd"."latitude",
        'zoom'          , "cd"."zoom",
        'description'   , "cd"."description",
        'countries', (
            SELECT jsonb_agg(
                jsonb_build_object(
                    'id'        , "c"."id",
                    'name'      , "c"."name",
                    'flag'      , "c"."flag",
                    'population', "c"."population",
                    'is_enabled', "ec"."is_enabled"
                )
            )
            FROM  "country_details" "c"
            JOIN  "world"."enabled_countries" "ec" ON "ec"."id" = "c"."id"
            WHERE "c"."continent_id" = "cd"."id"
        )
    )
    INTO    result
    FROM    "continent_details"     "cd"
    WHERE   "cd"."id" =             continent_id;  
    RETURN  result;
END;
$$;

-------------------------------------------------------------------------------
-- CREATE FUNCTION get_country_with_cities
-------------------------------------------------------------------------------
DROP FUNCTION IF EXISTS     get_country_with_cities;
CREATE OR REPLACE FUNCTION  get_country_with_cities(country_id CHAR(2))
RETURNS     JSONB
LANGUAGE    plpgsql
AS $$
DECLARE
    result  JSONB;
BEGIN
    SELECT jsonb_build_object(
        'id'                , cd."id",
        'continent_id'      , cd."continent_id",
        'continent_name'    , cd."continent_name",
        'name'              , cd."name",
        'flag'              , cd."flag",
        'tld'               , cd."tld",
        'prefix'            , cd."prefix",
        'is_eu'             , cd."is_eu",
        'iso2'              , cd."iso2",
        'demonym'           , cd."demonym",
        'population'        , cd."population",
        'density'           , cd."density",
        'area'              , cd."area",
        'gdp'               , cd."gdp",
        'median_age'        , cd."median_age",
        'website'           , cd."website",
        'driving_side'      , cd."driving_side",
        'un_member'         , cd."un_member",
        'religion'          , cd."religion",
        'description'       , cd."description",
        'latitude'          , cd."latitude",
        'longitude'         , cd."longitude",
        'zoom'              , cd."zoom",
        'is_enabled'        , cd."is_enabled",
        'cities', (
            SELECT jsonb_agg(
                jsonb_build_object(
                    'id'        , ci."id",
                    'name'      , ci."name",
                    'name_ascii', ci."name_ascii",
                    'population', ci."population",
                    'is_enabled', ci."is_enabled",
                    'capital'   , ci."capital"
                )
            )
            FROM    city_details ci
            WHERE   ci.country_id = cd.id
        )
    )
    INTO    result
    FROM    country_details cd
    WHERE   cd.id = country_id;
    
    RETURN  result;
END;
$$;

-------------------------------------------------------------------------------
-- CREATE FUNCTION get_city_with_attractions
-------------------------------------------------------------------------------
DROP FUNCTION IF EXISTS     get_city_with_attractions;
CREATE OR REPLACE FUNCTION  get_city_with_attractions(city_id VARCHAR(20))
RETURNS     JSONB
LANGUAGE    plpgsql
AS $$
DECLARE
    result  JSONB;
BEGIN
    SELECT jsonb_build_object(
        'id'            , ci."id",
        'name'          , ci."name",
        'name_ascii'    , ci."name_ascii",
        'latitude'      , ci."latitude",
        'longitude'     , ci."longitude",
        'country'       , ci."country",
        'country_id'    , ci."country_id",
        'iso2'          , ci."iso2",
        'iso3'          , ci."iso3",
        'admin_name'    , ci."admin_name",
        'capital'       , ci."capital",
        'population'    , ci."population",
        'attractions'   , (
            SELECT jsonb_agg(
                jsonb_build_object(
                    'id'                    , ca."id",
                    'city_id'              ,  ca."city_id",
                    'title'                 , ca."title",
                    'subtitle'              , ca."subtitle",
                    'description'           , ca."description",
                    'price'                 , ca."price",
                    'category_name'         , ca."category_name",
                    'address'               , ca."address",
                    'neighborhood'          , ca."neighborhood",
                    'street'                , ca."street",
                    'postal_code'           , ca."postal_code",
                    'state'                 , ca."state",
                    'city'                  , ca."city",
                    'country'               , ca."country",
                    'website'               , ca."website",
                    'phone'                 , ca."phone",
                    'phone_unformatted'     , ca."phone_unformatted",
                    'latitude'              , ca."latitude",
                    'longitude'             , ca."longitude",
                    'located_in'            , ca."located_in",
                    'total_score'           , ca."total_score",
                    'permanently_closed'    , ca."permanently_closed",
                    'temporarily_closed'    , ca."temporarily_closed",
                    'place_id'              , ca."place_id",
                    'categories'            , ca."categories",
                    'scraped_at'            , ca."scraped_at",
                    'opening_hours'         , ca."opening_hours",
                    'additional_info'       , ca."additional_info",
                    'image_url'             , ca."image_url"
                )
            )
            FROM    world.attractions ca
            WHERE   ca.city_id = ci.id
        )
    )
    INTO    result
    FROM    city_details ci
    WHERE   ci.id = city_id;
    
    RETURN  result;
END;
$$;