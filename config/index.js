export const cognito = {
  testId: process.env.REACT_APP_TEST_ID,
  assignmentId: process.env.REACT_APP_ASSIGNMENT_TEST_ID,
  domainInterviewer: process.env.REACT_APP_INTERVIEWER_DOMAIN,
  region: process.env.REACT_APP_COGNITO_REGION,
  userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
  externalUserPoolId: process.env.REACT_APP_COGNITO_EXTERNAL_USER_POOL_ID,
  userPoolWebClientId: process.env.REACT_APP_COGNITO_WEB_CLIENT_ID,
  authenticationFlowType: process.env.REACT_APP_COGNITO_AUTHENTICATION_FLOW,
  cloudFrontURL: process.env.REACT_APP_COGNITO_CLOUDFRONT_URL,
  oauth: {
    domain: process.env.REACT_APP_COGNITO_OAUTH_DOMAIN,
    scope: process.env.REACT_APP_COGNITO_OAUTH_SCOPE?.split(",") || [],
    redirectSignIn: process.env.REACT_APP_COGNITO_OAUTH_REDIRECT_LOGIN,
    redirectSignOut: process.env.REACT_APP_COGNITO_OAUTH_REDIRECT_LOGOUT,
    responseType: process.env.REACT_APP_COGNITO_OAUTH_RESPONSE_TYPE,
  },
  // ,
  //region: "ap-south-1"
  //userPoolId: "ap-south-1_08cpdw82l",
  //userPoolWebClientId: "4fo536a7ag4uqbd80amu68msai",
  //authenticationFlowType: "USER_SRP_AUTH",
  // oauth: {
  //  domain: "admin.auth.ap-south-1.amazoncognito.com",
  // scope:
  //    "aws.cognito.signin.user.admin,email,openid,profile"?.split(",") || [],
  //  redirectSignIn: "http://localhost:3000/callback",
  //redirectSignOut: "http://localhost:3000/logout",
  //responseType: "code",
  //},
  //    ,
  //    region: 'ap-south-1',
  //    userPoolId: 'ap-south-1_08cpdw82l',
  //    userPoolWebClientId: '5co6brifj9ubd4a8gr3r2gsubi',
  //    authenticationFlowType: 'USER_SRP_AUTH',
  //    oauth: {
  //      domain: 'admin.auth.ap-south-1.amazoncognito.com',
  //      scope: 'aws.cognito.signin.user.admin,email,openid,profile'.split(',') || [],
  //      redirectSignIn: 'https://devclever-india-dev-lyc-web-admin-0-4.0de945bd.lowtouch.cloud/callback',
  //      redirectSignOut: 'https://devclever-india-dev-lyc-web-admin-0-4.0de945bd.lowtouch.cloud/logout',
  //      responseType: 'code',
  //    }
};
export const apiURL = {
  // apiEndpoint: process.env.REACT_APP_WEB_ADMIN
  // apiEndpoint: process.env.REACT_APP_WEB_ADMIN
  apiEndpoint:
    process.env.REACT_APP_WEB_ADMIN,
  apiEndpointV2: process.env.REACT_APP_WEB_ADMIN_V2,
  apiEndpointNew: process.env.REACT_APP_WEB_ADMIN_NEW,
  adminDataApiEndpointV1: process.env.REACT_APP_WEB_ADMIN_DATA_V1,
  apiEndpointBypass: process.env.REACT_APP_WEB_ADMIN_BYPASS
};

export const counsellorProfile = [
  { value: "IGNITOR", label: "IGNITOR" },
  { value: "PATHWAY", label: "PATHWAY" },
  { value: "PURSUIT", label: "PURSUIT" }
]

export const counsellotPayRollType = {
  "status": true,
  "message": "Success.",
  "data": [
    {
      "PayrollId": 1,
      "PayrollSName": "MG-1",
      "PayrollLName": "Minimum Guarantee 1",
      "AgrementId": "1.3",
      "Status": "A"
    },
    {
      "PayrollId": 2,
      "PayrollSName": "MG-2",
      "PayrollLName": "Minimum Guarantee 2",
      "AgrementId": "1.3",
      "Status": "A"
    },
    {
      "PayrollId": 3,
      "PayrollSName": "MG-3",
      "PayrollLName": "Minimum Guarantee 3",
      "AgrementId": "1.3",
      "Status": "A"
    },
    {
      "PayrollId": 4,
      "PayrollSName": "AP",
      "PayrollLName": "Actual Payout",
      "AgrementId": "1.3",
      "Status": "A"
    },
    {
      "PayrollId": 5,
      "PayrollSName": "IH",
      "PayrollLName": "In-House",
      "AgrementId": "1.3",
      "Status": "A"
    }
  ]
}