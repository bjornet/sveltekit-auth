import * as cookie from 'cookie';
import { newDBConnection } from './db';

const db = newDBConnection();

// export async function handle({ request, resolve }) {
//     console.log('request in Handle');
//     console.log(request);
//     console.log('END: request in Handle');

//     return resolve(request);
// }

export async function getSession(request) {
    /**
     * Im probably doing too much here,
     * I should rather move all the cookie juggling into a `handle` function and
     * then put authenticated status on the request
     */
    const rawCookie = request?.headers?.cookie;

    console.log(request);

    if (!rawCookie) {
        console.log('!rawCookie');
        return {
            authenticated: false,
        };
    }

    const cookies = cookie.parse(rawCookie || '');

    if (!cookies.session_id) {
        console.log('!cookies.session_id');

        return {
            authenticated: false,
        };
    }

    const userSession = JSON.parse(await db.get(cookies.session_id));

    if (!userSession) {
        console.log('!userSession');

        return {
            authenticated: false,
        };
    }

    return {
        authenticated: true,
        email: userSession.email,
    };
};
