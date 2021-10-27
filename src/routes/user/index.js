import { newDBConnection } from '../../db';
import * as cookie from 'cookie';

const db = newDBConnection();

export const get = async ({ headers }) => {
    /**
     * BUG/FLAW
     * Why can we not use context here
     * it is really repetitive and annoying
     * to have to check the cookie again...
     * it requires us to make 2 requests to the DB.. not nice!
     */

    const rawCookie = headers?.cookie;

    if (!rawCookie) {
        return {
            status: 401,
            body: {
                message: 'Unauthorized',
            },
        };
    }

    const cookies = cookie.parse(rawCookie || '');

    if (!cookies.session_id) {
        return {
            status: 401,
            body: {
                message: 'Unauthorized',
            },
        };
    }

    const userSession = JSON.parse(await db.get(cookies.session_id));

    if (!userSession) {
        return {
            status: 401,
            body: {
                message: 'Unauthorized',
            },
        };
    }

    const user = JSON.parse(await db.get(userSession.email));

    // get rid of hashed password
    delete user.password;

    return {
        status: 200,
        body: user,
    };
};
