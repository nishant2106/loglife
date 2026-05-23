# LogLife Postman

Import the collection and one environment from this folder:

- `loglife-crud.collection.json`
- `loglife-local.postman_environment.json`
- `loglife-staging.postman_environment.json`
- `loglife-prod.postman_environment.json`

How to use:

1. Import the collection file into Postman.
2. Import one or more environment files.
3. Set the active environment in Postman.
4. Update `baseUrl` if your API URL differs.
5. After creating records, copy returned IDs into the matching environment variables like `usersId`, `logsId`, or `moodsId`.

Notes:

- Local default base URL is `http://localhost:3001`.
- Staging and prod URLs are placeholders and should be replaced with real endpoints.
- Request bodies are starter payloads and can be extended as your schema evolves.
