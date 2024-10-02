```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

mysql database, add this to .env.local :

```bash
DATABASE_URL=mysql://<username>:<password>@localhost:5432/<db_name>
NEXTAUTH_SECRET=smart-tourism
```

set up prisma, import database first

```bash
pnpm i
npx prisma db pull
npx prisma generate
```
