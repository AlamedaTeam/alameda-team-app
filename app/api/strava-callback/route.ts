import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "No se recibió código OAuth." }, { status: 400 });
  }

  try {
    const response = await fetch("https://www.strava.com/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: process.env.STRAVA_CLIENT_ID,
        client_secret: process.env.STRAVA_CLIENT_SECRET,
        code,
        grant_type: "authorization_code",
      }),
    });

    const data = await response.json();

    return NextResponse.json({
      message: "Conexión Strava OK",
      athlete: data.athlete,
      access_token: data.access_token,
      expires_at: data.expires_at,
    });
  } catch (error) {
    console.error("Error OAuth Strava:", error);
    return NextResponse.json({ error: "Error al conectar con Strava." }, { status: 500 });
  }
}
