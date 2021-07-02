const fs = require('fs')
const devEnv = process.argv[process.argv.length - 1] === "dev"
const targetFileName = `environment.${devEnv ? "" : "prod."}ts`
const targetPath = `./src/environments/${targetFileName}`;
// temporarily disabled auth on deployment until it's fixed
const envConfigFile = `
export const environment = {
    apiUrl: '${process.env.API_ENDPOINT}',
    authDomain: '${process.env.AUTH_DOMAIN || "api"}', 
    identityPoolId: '${process.env.IDENTITY_POOL_ID}',
    region: '${process.env.REGION}',
    identityPoolRegion: '${process.env.REGION}',
    userPoolId: '${process.env.USER_POOL_ID}',
    userPoolWebClientId: '${process.env.USER_POOL_CLIENT_ID}',
    ${(devEnv ?
        `production: false,
    appVersion: 'v717demo1',
    USERDATA_KEY: 'authf649fc9a5f55',
    isMockEnabled: true`
        :
        `production: true,
    appVersion: 'v717demo1',
    USERDATA_KEY: 'authf649fc9a5f55',
    isMockEnabled: true`)}
};`;
fs.writeFile(targetPath, envConfigFile, function (err) {
    if (err) {
        throw console.error(err);
    } else {
        console.log(`Environment file generated correctly at ${targetPath} \n ${envConfigFile}`);
    }
});