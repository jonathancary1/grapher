import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';

// AWS configuration variables
const aws = {
  userPoolId: 'ap-northeast-1_cCS5gSeUQ',
  clientId: '6uepkp04av1if5mrjhndsh59aa',
};

export function logIn(username, password) {
  const authenticationDetails = new AuthenticationDetails({
    Username: username,
    Password: password,
  });
  const userPool = new CognitoUserPool({
    UserPoolId: aws.userPoolId,
    ClientId: aws.clientId,
  });
  const cognitoUser = new CognitoUser({
    Username: username,
    Pool: userPool,
  });
  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: resolve,
      onFailure: reject,
    });
  });
}

export function signUp(username, email, password) {
  const userPool = new CognitoUserPool({
    UserPoolId: aws.userPoolId,
    ClientId: aws.clientId,
  });
  const attributes = [
    new CognitoUserAttribute({ Name: 'email', Value: email }),
  ];
  return new Promise((resolve, reject) => {
    userPool.signUp(username, password, attributes, null, (error, result) => {
      if (error) { reject(error); } else { resolve(result); }
    });
  });
}
