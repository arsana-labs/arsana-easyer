// app/actions.ts
"use server";
import { neon } from "@neondatabase/serverless";

export async function getData() {
    const sql = (process.env.DATABASE_URL);
    // const data = await sql`...`;
    // return data;
}