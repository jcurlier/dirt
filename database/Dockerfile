FROM postgres

ENV POSTGRES_USER dirt
ENV POSTGRES_PASSWORD password
ENV POSTGRES_DB dirt

COPY ./sql/create.sql /docker-entrypoint-initdb.d/
