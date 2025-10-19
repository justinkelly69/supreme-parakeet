-- Update the enabled_countries table with description, lat/long and zoom
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
        WHERE   id          =  enabled_country->>'id';
    END LOOP;
END;
$$;

-- Enable or disable a country
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
        WHERE   id         =  enabled_country->>'id';
    END LOOP;
END;
$$;

CREATE OR REPLACE FUNCTION get_continent_with_countries(continent_id CHAR(2))  
RETURNS JSONB
LANGUAGE plpgsql
AS $$
DECLARE
    result JSONB;
BEGIN
    SELECT jsonb_build_object(
        'id'            , cd."id",
        'name'          , cd."name",
        'longitude'     , cd."longitude",
        'latitude'      , cd."latitude",
        'zoom'          , cd."zoom",
        'description'   , cd."description",
        'countries', (
            SELECT jsonb_agg(
                jsonb_build_object(
                    'id'        , c."id",
                    'name'      , c."name",
                    'flag'      , c."flag",
                    'is_enabled', ec."is_enabled"
                )
            )
            FROM  country_details c
            JOIN  world.enabled_countries ec ON ec.id = c.id
            WHERE c.continent_id = cd.id
        )
    )
    INTO result
    FROM continent_details cd
    WHERE cd.id = continent_id;  
    RETURN result;
END;
$$;

CREATE OR REPLACE FUNCTION get_country_with_cities(country_id CHAR(2))
RETURNS JSONB
LANGUAGE plpgsql
AS $$
DECLARE
    result JSONB;
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
                    'capital'   , ci."capital"
                )
            )
            FROM  city_details ci
            WHERE ci.country_id = cd.id
        )
    )
    INTO result
    FROM country_details cd
    WHERE cd.id = country_id;
    
    RETURN result;
END;
$$;