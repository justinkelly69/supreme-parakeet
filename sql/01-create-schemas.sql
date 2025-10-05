DROP SCHEMA IF EXISTS world CASCADE;
DROP SCHEMA IF EXISTS iso CASCADE;
CREATE SCHEMA iso;
CREATE SCHEMA world;

GRANT USAGE ON SCHEMA world TO public, anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA world TO anon, authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA world TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA world TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA world GRANT ALL ON TABLES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA world GRANT ALL ON ROUTINES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA world GRANT ALL ON SEQUENCES TO anon, authenticated, service_role;
GRANT SELECT ON ALL TABLES IN SCHEMA world TO public;


GRANT USAGE ON SCHEMA iso TO public, anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA iso TO anon, authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA iso TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA iso TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA iso GRANT ALL ON TABLES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA iso GRANT ALL ON ROUTINES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA iso GRANT ALL ON SEQUENCES TO anon, authenticated, service_role;
GRANT SELECT ON ALL TABLES IN SCHEMA iso TO public;

