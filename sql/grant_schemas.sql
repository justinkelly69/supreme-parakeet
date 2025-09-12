GRANT USAGE ON SCHEMA world TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA world TO anon, authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA world TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA world TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA world GRANT ALL ON TABLES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA world GRANT ALL ON ROUTINES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA world GRANT ALL ON SEQUENCES TO anon, authenticated, service_role;

GRANT USAGE ON SCHEMA iso TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA iso TO anon, authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA iso TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA iso TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA iso GRANT ALL ON TABLES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA iso GRANT ALL ON ROUTINES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA iso GRANT ALL ON SEQUENCES TO anon, authenticated, service_role;
