DROP SCHEMA IF EXISTS   "world" CASCADE;
DROP SCHEMA IF EXISTS   "iso" CASCADE;

DROP FUNCTION IF EXISTS update_enabled_countries;
DROP FUNCTION IF EXISTS set_enabled_countries;
DROP FUNCTION IF EXISTS set_enabled_cities;
DROP FUNCTION IF EXISTS get_continent_with_countries;

DROP VIEW   IF EXISTS   "public"."continent_details";
DROP VIEW   IF EXISTS   "public"."country_details";
DROP VIEW   IF EXISTS   "public"."city_details";

CREATE SCHEMA           "iso";
CREATE SCHEMA           "world";

