export class FormError extends Error {
    errors?: { field: string; message: string }[];
    type?: string;

    constructor(message: string, errors?: { field: string; message: string }[], type?: string) {
        super(message);
        this.name = "FormError";
        this.errors = errors;
        this.type = type;
    }
}
