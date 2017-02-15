#  sh ./public/test/dumpCreateDB.sh && DEV_MODE="test" node readWriteAPIPostgres.js


dropdb -U vibhugulati testdb
createdb -U vibhugulati testdb
pg_dump -U vibhugulati vibhugulati -f ./public/test/excercise.sql
psql -U vibhugulati -d testdb -f ./public/test/excercise.sql