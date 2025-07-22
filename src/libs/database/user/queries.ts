import { mapUserDbToUser } from "@/libs/mappers/userMapper";
import { pool } from "../connection";
import { UserDb } from "@/types/db/user";
import { RowDataPacket } from "mysql2";

export async function getUserByEmail(email: string) {
    const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM user WHERE email = ?", [email]);
    const user = rows[0] as UserDb;
    if (!user) {
        return null;
    }
    return mapUserDbToUser(user);
}
