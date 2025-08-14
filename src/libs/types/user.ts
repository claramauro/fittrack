export type User = {
    id: string;
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    createdAt: Date;
    updatedAt: Date | null;
    isVerified: boolean;
};

export type UserClient = {
    id: string;
    email: string;
    firstname: string;
    lastname: string;
};
