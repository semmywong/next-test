/*
 * @Author: Semmy Wong
 * @Date: 2024-12-27 23:41:25
 * @LastEditors: Semmy Wong
 * @LastEditTime: 2024-12-28 00:49:15
 * @Description: Description
 */
import { defineConfig } from 'drizzle-kit';

import env from '@/env';

export default defineConfig({
    dialect: 'mysql',
    verbose: true,
    strict: true,
    schema: './src/db/schema/*',
    out: 'drizzle',
    dbCredentials: {
        host: env.DB_HOST,
        user: env.DB_USER,
        password: env.DB_PASSWORD,
        database: env.DB_DATABASE,
        port: Number(env.DB_PORT),
        ssl: {
            minVersion: 'TLSv1.2',
            rejectUnauthorized: true,
        },
    },
});
