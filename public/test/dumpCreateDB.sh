#  sh ./public/test/dumpCreateDB.sh && DEV_MODE="test" node readWriteAPIPostgres.js

# pg_dump -U vibhugulati vibhugulati -f excercise.sql

dropdb -U vibhugulati testdb
createdb -U vibhugulati testdb
psql -U vibhugulati -d testdb -f ./public/test/excercise.sql