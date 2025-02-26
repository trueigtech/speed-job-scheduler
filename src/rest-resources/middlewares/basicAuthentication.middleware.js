import config from "@src/configs/app.config";
import basicAuth from 'express-basic-auth';

export const basicAuthentication = basicAuth({
    users: { [config.get('basic.username')]: config.get('basic.password') },
    challenge: true
})
