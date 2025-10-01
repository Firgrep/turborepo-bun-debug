# Debugging Turborepo with Bun catalogs

Dependency graph doesn't appear to work correctly?

Only 1 of the apps use dayjs, so only 1 should deploy if dayjs version is changed in the main `package.json`

## Steps to Reproduce

-   Fork repo.
-   Change dayjs version `"dayjs": "1.11.0"` to `"dayjs": "1.10.0"`
-   Hit `bun install` and push the `package.json` **and** `bun.lock` changes.
-   Observe that both apps deploy, instead of just the one that dependes on dayjs.
