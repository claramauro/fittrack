export class UserError extends Error {
    statusCode: number;
    constructor(message: string, statusCode: number = 400) {
        super(message);
        this.name = "UserError";
        this.statusCode = statusCode;
    }
}

export class ValidationError extends UserError {
    errors?: { field: string; message: string }[];

    constructor(
        message: string = "Donnée invalide",
        statusCode: number = 400,
        errors?: { field: string; message: string }[]
    ) {
        super(message, statusCode);
        this.name = "ValidationError";
        this.errors = errors;
    }
}

export class AuthorizationError extends UserError {
    constructor(message: string = "Accès refusé", statusCode: number = 403) {
        super(message, statusCode);
        this.name = "AuthorizationError";
    }
}
