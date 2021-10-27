import stringHash from 'string-hash';
import { bakeCookieResponse } from './cookie';
import { newDBConnection } from '../../db';

const db = newDBConnection();

export async function post({ body }) {
    const {
        email,
        password,
        name,
    } = body;

    if (!email || !password || !name) {
        return {
            status: 500,
            body: {
                message: 'Missing input',
            }
        }
    }

    const user = JSON.parse(await db.get(email));

    if (user) {
        return {
            status: 409, // conflict
            body: {
                message: 'User with that email already registered',
            },
        };
    }

    await db.set(
        email,
        JSON.stringify({
            email,
            password: stringHash(password),
            name,
        }),
    );

    return await bakeCookieResponse(email);
};
