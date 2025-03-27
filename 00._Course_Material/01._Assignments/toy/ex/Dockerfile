FROM postgres:latest

# Set default environment variables (change if needed)
ENV POSTGRES_USER=admin_user
ENV POSTGRES_PASSWORD=Admin123
ENV POSTGRES_DB=cia  

# Copy the backup SQL files into the Docker container
COPY roles.sql /docker-entrypoint-initdb.d/
COPY full_backup.sql /docker-entrypoint-initdb.d/

# Set file permissions
RUN chmod 644 /docker-entrypoint-initdb.d/*