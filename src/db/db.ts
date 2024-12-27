/*
 * @Author: Semmy Wong
 * @Date: 2024-12-27 23:41:25
 * @LastEditors: Semmy Wong
 * @LastEditTime: 2024-12-28 00:38:57
 * @Description: Description
 */
import { drizzle } from 'drizzle-orm/mysql2';
// import { drizzle } from 'drizzle-orm/tidb-serverless';
import mysql from 'mysql2/promise';

import env from '@/env';


/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
    conn: mysql.Connection | undefined;
};

export const clientConfig = {
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    host: env.DB_HOST,
    port: Number(env.DB_PORT),
    database: env.DB_DATABASE,
};

async function getDatabaseConnection() {
    const conn =
        globalForDb.conn ??
        (await mysql.createConnection({
            ...clientConfig,
            ssl: env.NODE_ENV === 'production' ? { rejectUnauthorized: true } : undefined,
        }));
    if (env.NODE_ENV !== 'production') globalForDb.conn = conn;
    return conn;
}

export const dbPromise = getDatabaseConnection().then((conn) => drizzle(conn, { schema, mode: 'default' }));
