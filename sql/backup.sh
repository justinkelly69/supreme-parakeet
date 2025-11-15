pg_dump --host 127.0.0.1 --port 54322 --username postgres --format plain --verbose --file "/Users/jk/Desktop/snaptrip.sql" postgres

pg_dump --host 127.0.0.1 --port 54322 --username postgres --format plain --verbose --file "/Users/jk/Desktop/attractions.sql" --table world.attractions postgres