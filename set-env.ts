const targetPath = './src/environments/environment.prod.ts';
const fs = require('fs')
const envConfigFile = `export const environment = {
    apiUrl: '${process.env.API_ENDPOINT}',
    production: true,
    appVersion: 'v717demo1',
    USERDATA_KEY: 'authf649fc9a5f55',
    isMockEnabled: false,
};
`;
fs.writeFile(targetPath, envConfigFile, function (err) {
    if (err) {
        throw console.error(err);
    } else {
        console.log(`Angular environment.prod.ts file generated correctly at ${targetPath} \n`);
    }
});