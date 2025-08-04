export type User = {
    id: number;
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    createdAt: Date;
    updatedAt: Date | null;
    isVerified: boolean;
};

export type UserClient = {
    id: number;
    email: string;
    firstname: string;
    lastname: string;
};
