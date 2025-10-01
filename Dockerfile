FROM oven/bun:1.2.23 AS final
WORKDIR /app

# Args
ARG PROGRAM_DIR
ARG PORT=8080

# Common
COPY ./node_modules ./node_modules
COPY ./lib ./lib

# Specific
COPY ./${PROGRAM_DIR}/package.json ./${PROGRAM_DIR}/package.json
COPY ./${PROGRAM_DIR}/tsconfig.json ./${PROGRAM_DIR}/tsconfig.json
COPY ./${PROGRAM_DIR} ./${PROGRAM_DIR} 

# CD into program and run
WORKDIR /app/${PROGRAM_DIR}

ENV NODE_ENV=production
ENV PORT=${PORT}

EXPOSE ${PORT}
CMD ["bun", "run", "start:prod"]