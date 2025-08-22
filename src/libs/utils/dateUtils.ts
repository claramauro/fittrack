export function formatDateToShortUsString(date: Date) {
    console.log(date);

    const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return offsetDate.toISOString().slice(0, 10);
}

export function formatDateToShortFrString(date: Date) {
    return new Intl.DateTimeFormat("fr-FR", { dateStyle: "short" }).format(date);
}
