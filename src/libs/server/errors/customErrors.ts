export class ValidationError extends Error {
    public statusCode: number;

    constructor(message: string = "Donnée invalide") {
        super(message);
        this.name = "ValidationError";
        this.statusCode = 400;
    }
}
