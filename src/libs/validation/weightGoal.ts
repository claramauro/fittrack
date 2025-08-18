import * as z from "zod";

export const targetWeightSchema = z.strictObject({
    targetWeight: z.number("Donnée non valide").gte(1, "Le poids cible doit être supérieur à 0"),
});
