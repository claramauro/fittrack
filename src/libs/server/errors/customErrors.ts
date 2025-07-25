export class ValidationError extends Error {
    public statusCode: number;

    constructor(message: string = "Donnée invalide", statusCode: number = 400) {
        super(message);
        this.name = "ValidationError";
        this.statusCode = statusCode;
    }
}
