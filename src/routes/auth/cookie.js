import * as cookie from 'cookie';
import { v4 as uuidv4 } from 'uuid';
import { newDBConnection } from '../../db';

const db = newDBConnection();

export const bakeCookieResponse = async (email) => {
    const cookieId = uuidv4();

    await db.set(
        cookieId,
        JSON.stringify({
            email,
        }),
    );

    const headers = {
        'Set-Cookie': cookie.serialize('session_id', cookieId, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7,
            sameSite: 'lax',
            path: '/',
        }),
    };

    return {
        status: 200,
        headers,
        body: {
            message: 'Cookie Auth Success',
        },
    };
};
