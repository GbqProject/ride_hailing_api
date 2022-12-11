FROM postgres
ENV POSTGRES_USER docker_psql
ENV POSTGRES_PASSWORD docker_psql
ENV POSTGRES_DB ride_hailing

ADD InitialDB.sql /docker-entrypoint-initdb.d/
EXPOSE 5432
