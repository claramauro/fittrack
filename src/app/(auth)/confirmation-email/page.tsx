import ConfirmationEmailClient from "./confirmationEmailClient";

type PageProps = {
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function ConfirmationEmailPage({ searchParams }: PageProps) {
    const resolvedSearchParams = await searchParams;
    const status = resolvedSearchParams?.status;

    return <ConfirmationEmailClient status={Array.isArray(status) ? status[0] : status} />;
}
