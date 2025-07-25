export class FormError extends Error {
    errors?: { field: string; message: string }[];

    constructor(message: string, errors?: { field: string; message: string }[]) {
        super(message);
        this.name = "FormError";
        this.errors = errors;
    }
}
