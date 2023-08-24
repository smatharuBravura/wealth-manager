// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiKey: 'https://mockapi.io/clone/645c2b23a8f9e4d6e77cc141', // <-- Enter your own key here!'
 
  apiUrl: 'https://fl57652.ap-southeast-2.snowflakecomputing.com/api/v2/statements/',
  authUrl: 'https://fl57652.ap-southeast-2.snowflakecomputing.com/oauth/authorize',
  snfDatabase: 'DATAWORX',
  snfSchema: "BABYLON",
  snfWarehouse: 'COMPUTE_WH',
  snfTimeout: '20',

// has context menu
  // Surinder uses these 3 setting
  OAUTH_SECRET: 'VAY7AYAR05RWnDky3HzTNYQHLFkLnskGs6HmdWkUUGY=',
  OAUTH_CLIENT: 'oEHcihPjNyMxImIeb0ViNOKK8L0=',
  redirectUri: "http://localhost:8100/dashboard/",
  
  
  // //Aiden uses these 3 setting
  // OAUTH_CLIENT: 'KW2gOz9krqL87znpKZ1exKxPvzw=',
  // OAUTH_SECRET: 'e1/TULYaa66PjmBYaL5Q4SscLiPxVpcSzNaCrwcAvPg=',
  // redirectUri: "http://localhost:4200/",

  tokenUrl: '/oauth/token-request'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
 import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
