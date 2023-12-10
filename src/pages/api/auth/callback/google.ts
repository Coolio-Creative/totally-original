import type { APIRoute } from 'astro';

import type { APIContext } from "astro";
import jwt from "jsonwebtoken";

import oauth2Client from "../../../../lib/auth/google-oauth-client";

export const GET: APIRoute = async ({ request }: APIContext) => {
  const code = new URL(request.url).searchParams?.get("code");
  try {
    const { tokens } = await oauth2Client.getToken(code!);
    oauth2Client.setCredentials(tokens);
    const fetchUserInfo = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: { Authorization: `Bearer ${tokens.access_token}` },
      }
    );
    const userInfo = await fetchUserInfo.json();

    const { email, name, picture } = userInfo;

    // store the info in db if required
    const cookie = jwt.sign(
      { email, name, picture },
      import.meta.env.SECRET_KEY,
      {
        expiresIn: "1 hour",
      }
    );
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/",
        "Set-Cookie": `app_auth_token=${cookie}; Path=/; HttpOnly`,
      },
    });
  } catch (error) {
    console.error("Error in callback", error);
    return new Response("Error while login. Please try again later.");
  }
}