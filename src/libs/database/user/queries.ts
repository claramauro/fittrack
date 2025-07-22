import { pool } from "../connection";

export async function getUserByEmail(email: string) {
    const [rows] = await pool.query("SELECT * FROM user WHERE email = ?", [email]);
    console.log(rows);
}
