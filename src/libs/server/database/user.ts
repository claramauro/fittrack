import { mapUserDbToUser } from "@/libs/server/mappers/userMapper";
import { pool } from "./connection";
import { UserDb } from "@/libs/types/db/user";
import { RowDataPacket } from "mysql2";

export async function getUserByEmail(email: string) {
    const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM user WHERE email = ?", [email]);
    const user = rows[0] as UserDb;
    if (!user) {
        return null;
    }
    return mapUserDbToUser(user);
}

export async function createUser(data: { firstname: string; lastname: string; email: string; password: string }) {
    await pool.query("INSERT INTO user (firstname, lastname, email, password) VALUES (?, ?, ?, ?)", [
        data.firstname,
        data.lastname,
        data.email,
        data.password,
    ]);
    return;
}
