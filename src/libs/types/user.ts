export type User = {
    id: number;
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    createdAt: Date;
    updatedAt: Date | null;
};
