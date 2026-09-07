# Source for JaxNode.com

![JaxNode Logo](https://www.jaxnode.com/images/jaxnodejs.png)

This is the source code for the JaxNode website, built with Next.js 16 (App Router).

The website can be viewed at [https://www.jaxnode.com](https://www.jaxnode.com).

## Development

```bash
npm install
npm run dev
```

## Production

```bash
npm run build
npm start
```

## Containers (Podman or Docker)

The Dockerfile builds a production Next.js standalone server using Node.js 22
and runs as a non-root user on port 3000. Local dependencies, build output, and
`.env` files are excluded from the build context.

Build for an AMD64 DigitalOcean host, including when building on an Apple Silicon
Mac:

```bash
podman build --platform linux/amd64 -t docker.io/davidfekke/jaxnode:latest .
podman image inspect docker.io/davidfekke/jaxnode:latest --format '{{.Os}}/{{.Architecture}}'
```

The inspection output should be `linux/amd64`. On macOS, the Podman machine must
be running (`podman machine start`; run `podman machine init` first if needed).
Cross-architecture builds require AMD64 emulation in the Podman VM and can be
slower. If a build reports `exec format error`, enable AMD64 emulation for your
Podman machine or build on an AMD64 Linux host.

Run and check the container locally:

```bash
podman run --rm --platform linux/amd64 --name jaxnode -p 3000:3000 docker.io/davidfekke/jaxnode:latest
```

Visit `http://localhost:3000`. To publish the image for DigitalOcean:

```bash
podman login docker.io
podman push docker.io/davidfekke/jaxnode:latest
```

Configure the deployment to use this image and container port 3000. On a Droplet,
publish that port behind your reverse proxy; on App Platform, set the HTTP port
to 3000. Pass any server environment variables at runtime, not through `.env`
files in the image. Changes to the JSON content in `data/` require a rebuild.

The same commands work with Docker by replacing `podman` with `docker` (Docker
does not need the Podman machine commands). The target architecture is selected
by `--platform`, rather than hard-coded in the Dockerfile.

## Tests

```bash
npm test
```

Copyright 2023 David Fekke
