import { UserDb } from "@/libs/types/db/user";
import { User } from "@/libs/types/user";

export function mapUserDbToUser(userDb: UserDb): User {
    return {
        id: userDb.id,
        email: userDb.email,
        password: userDb.password,
        firstname: userDb.firstname,
        lastname: userDb.lastname,
        createdAt: userDb.created_at,
        updatedAt: userDb.updated_at,
    };
}
