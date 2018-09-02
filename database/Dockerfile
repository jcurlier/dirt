FROM postgres

# Create the database and the user
ENV POSTGRES_USER dirt
ENV POSTGRES_PASSWORD password
ENV POSTGRES_DB dirt

# Create the tables
COPY ./sql/create.sql /docker-entrypoint-initdb.d/
