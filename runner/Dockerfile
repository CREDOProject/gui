FROM ghcr.io/credoproject/core:v0.19.0-amd64 AS builder

WORKDIR /credo_env
COPY credo_install.sh /credo_env/credo_install.sh
COPY dependencies.txt  /credo_env/dependencies.txt
RUN chmod +x credo_install.sh && ./credo_install.sh
