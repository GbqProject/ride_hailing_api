FROM postgres
ENV POSTGRES_USER docker_psql
ENV POSTGRES_PASSWORD docker_psql
ENV POSTGRES_DB ride_hailing

#Comment for run docker-compose and uncomment for run docker build image 
#ADD InitialDB.sql /docker-entrypoint-initdb.d/
EXPOSE 5432
