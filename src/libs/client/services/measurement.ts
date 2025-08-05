export async function fetchMeasurements() {
    const response = await fetch("/api/measurements");
    if (!response.ok) {
        throw new Error("Error lors du chargement des données, veuillez réessayer.");
    }
    return response.json();
}
