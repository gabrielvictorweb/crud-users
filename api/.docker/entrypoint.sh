#!/bin/sh

npx prisma generate
npx prisma db push
npm run db-seed
npm run test:cov
npm run start:dev