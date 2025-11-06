FROM denoland/deno:alpine-2.1.9

ENV WORKSPACES_FILE=/data/workspaces.csv \
	DENO_ENV=production

RUN mkdir -p /app /data

WORKDIR /app

COPY . .
RUN deno cache main.ts

EXPOSE 8000

CMD ["run", \
	"--allow-read", \
	"--allow-write", \
	"--allow-env", \
	"--allow-net", \
	"main.ts"]
