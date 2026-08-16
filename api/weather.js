export const runtime = "nodejs";

export async function GET(request) {
    const url = new URL(request.url);
    const city = url.searchParams.get("city");

    if (!city) {
        return Response.json(
            { error: "City is required" },
            { status: 400 }
        );
    }

    const API_KEY = process.env.WEATHER_API_KEY;

    if (!API_KEY) {
        return Response.json(
            { error: "Weather API key is not configured" },
            { status: 500 }
        );
    }

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
        );

        const data = await response.json();

        if (!response.ok) {
            return Response.json(
                {
                    error: data.message || "Weather data not found"
                },
                { status: response.status }
            );
        }

        return Response.json(data);

    } catch (error) {
        console.error(error);

        return Response.json(
            { error: "Failed to fetch weather data" },
            { status: 500 }
        );
    }
}