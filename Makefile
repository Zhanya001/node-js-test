reset:
	rm -rf node_modules pnpm-lock.yaml ; pnpm i ; pnpm build ; docker compose up --build -d
up-dev:
	docker compose up --build -d
migrate-inside-container:
	npx prisma db push --accept-data-loss && npx prisma db pull && pnpm build
migrate:
	docker exec test_node_api bash -c "npx prisma db push --accept-data-loss && npx prisma db pull && pnpm build";
env-sample:
	cat .env.example > .env
sql-dump:
	docker exec test_node_api bash -c "mysqldump -u root -p123456 opratel_db >  /var/lib/mysql/test_db.sql";
test:
	docker exec test_node_api bash -c "pnpm test"
