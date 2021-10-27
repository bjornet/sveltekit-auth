import stringHash from 'string-hash';
import { bakeCookieResponse } from './cookie';
import { newDBConnection } from '../../db';

const db = newDBConnection();

export async function post({ body }) {
    const {
        email,
        password,
    } = body;

    const user = JSON.parse(await db.get(email));

    const erroneousResponse = {
        status: 401,
        body: {
            message: 'Wrong email or password.',
        },
    };

    if (!user) {
        console.log('401: User not found in DB');
        return erroneousResponse;
    }

    if (user.password !== stringHash(password)) {
        console.log('401: Wrong password');
        return erroneousResponse;
    }

    return await bakeCookieResponse(email);
};
