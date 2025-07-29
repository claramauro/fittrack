export type UserDb = {
    id: number;
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    created_at: Date;
    updated_at: Date | null;
    is_verified: boolean;
};
