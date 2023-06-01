export const environment = {
  production: true,
  apiKey: 'https://mockapi.io/clone/645c2b23a8f9e4d6e77cc141', // <-- Enter your own key here!'
  apiUrl: 'https://gu76282.ap-southeast-2.snowflakecomputing.com/api/v2/statements/',
  authUrl: 'https://gu76282.ap-southeast-2.snowflakecomputing.com/oauth/authorize',
  snfDatabase: 'DATAWORX',
  snfSchema: "BABYLON",
  snfWarehouse: 'COMPUTE_WH',
  snfTimeout: '20',
  // OAUTH_CLIENT: 'F+3HwRPalzBYXq7bDcP8rIGhaaY=',
  // OAUTH_SECRET: '95mjt5CMjS16/KUbP+VV+M3DCCcMfXk+nRDaelULWaw=',
  OAUTH_CLIENT: 'z5CT+sTu9PNkTpvHVbkswKpXKww=',
  OAUTH_SECRET: 'K5XVcJ9o57pNBentc04/Y/XEdbHP1zDtMs9tzPOJtdM=',
  redirectUri: "http://localhost:4200/",
  tokenUrl: '/oauth/token-request'
};
