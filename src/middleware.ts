export { default } from "next-auth/middleware";

export const config = {
    matcher: ["/", "/mesures", "/profil", "/api/me"],
};
