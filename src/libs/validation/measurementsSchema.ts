import z from "zod";

export const measurementsSchema = z.strictObject({
    measuredAt: z.coerce
        .date()
        .min(new Date("1900-01-01"), "La date ne peut pas être antérieur au 01/01/1900")
        .max(new Date(), "La date ne peut pas être dans le futur"),
    chest: z.coerce.number("Donnée non valide").gte(0, "La valeur doit être supérieure ou égale à 0").nullable(),
    underbust: z.coerce.number("Donnée non valide").gte(0, "La valeur doit être supérieure ou égale à 0").nullable(),
    waist: z.coerce.number("Donnée non valide").gte(0, "La valeur doit être supérieure ou égale à 0").nullable(),
    belly: z.coerce.number("Donnée non valide").gte(0, "La valeur doit être supérieure ou égale à 0").nullable(),
    hips: z.coerce.number("Donnée non valide").gte(0, "La valeur doit être supérieure ou égale à 0").nullable(),
    thigh: z.coerce.number("Donnée non valide").gte(0, "La valeur doit être supérieure ou égale à 0").nullable(),
    arm: z.coerce.number("Donnée non valide").gte(0, "La valeur doit être supérieure ou égale à 0").nullable(),
    weight: z.coerce.number("Donnée non valide").gte(0, "La valeur doit être supérieure ou égale à 0").nullable(),
});
