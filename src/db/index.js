import { Tedis } from 'tedis';

export const newDBConnection = (
    host = '127.0.0.1',
    port = '6379',
    password
) => {
    let config = {
        host,
        port,
    };

    if (password) {
        config = { ...config, password }
    }

    return new Tedis(config);
};

