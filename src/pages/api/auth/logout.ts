import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
    return new Response(null, {
      headers: {
        Location: "/",
        "Set-Cookie": `app_auth_token=""; expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/; HttpOnly`,
      },
    });
  }