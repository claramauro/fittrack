import { mapUserDbToUser } from "@/libs/server/mappers/userMapper";
import { pool } from "./connection";
import { UserDb } from "@/libs/types/db/user";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { User } from "@/libs/types/user";

export async function getUserByEmail(email: string): Promise<User | null> {
    const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM user WHERE email = ?", [email]);
    const user = rows[0] as UserDb;
    if (!user) {
        return null;
    }
    return mapUserDbToUser(user);
}

export async function createUser(data: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}): Promise<number> {
    const [rows] = await pool.query<ResultSetHeader>(
        "INSERT INTO user (firstname, lastname, email, password) VALUES (?, ?, ?, ?)",
        [data.firstname, data.lastname, data.email, data.password]
    );
    return rows.insertId;
}

export async function verifyUser(userId: number) {
    await pool.query<ResultSetHeader>("UPDATE user SET is_verified = true WHERE id = ?", [userId]);
}

export async function updateUser(data: {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}) {
    const query = "UPDATE user SET firstname = ?, lastname = ?, email = ?, password = ? WHERE id = ?";
    const params = [data.firstname, data.lastname, data.email, data.password, data.id];
    await pool.query<ResultSetHeader>(query, params);
}
