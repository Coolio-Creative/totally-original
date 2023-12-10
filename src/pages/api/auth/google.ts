import type { APIRoute } from 'astro';

import oauth2Client from "../../../lib/auth/google-oauth-client";

export const GET: APIRoute = async () => {
    try {
        const authorizationUrl = oauth2Client.generateAuthUrl({
            access_type: "offline",
            scope: "openid email profile",
            promp: "consent",
        });
        return new Response(null, {
            status: 302,
            headers: {
                Location: authorizationUrl,
            },
        });
    } catch (error) {
        return new Response("Error with login.", {
            status: 500,
        });
    }
}