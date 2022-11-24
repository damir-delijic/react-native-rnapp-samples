function initializeCognito(){
    global._config = {
        cognito: {
            userPoolId: 'eu-central-1_sPnoK6KE4',
            userPoolClientId: '2ad275qs5deqkrhldfdpgjlnic',
            region: 'eu-central-1'
        },
        api: {
            invokeUrl: '' // e.g. https://rc7nyt4tql.execute-api.us-west-2.amazonaws.com/prod',
        }
    }

    var poolData = {
        UserPoolId: _config.cognito.userPoolId,
        ClientId: _config.cognito.userPoolClientId
    }

    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    if (typeof AWSCognito !== 'undefined') {
        AWSCognito.config.region = _config.cognito.region;
    }

    global.signOut = function signOut() {
        userPool.getCurrentUser().signOut();
    };

    global.authToken = new Promise(function fetchCurrentAuthToken(resolve, reject) {
        var cognitoUser = userPool.getCurrentUser();

        if (cognitoUser) {
            cognitoUser.getSession(function sessionCallback(err, session) {
                if (err) {
                    reject(err);
                } else if (!session.isValid()) {
                    resolve(null);
                } else {
                    resolve(session.getIdToken().getJwtToken());
                }
            });
        } else {
            resolve(null);
        }
    });

    global.register = function(args){
        var username = args.username;
        var password = args.password;
        var name = args.name;
        var onSuccess = args.onSuccess;
        var onFailure = args.onFailure;

        var dataName = {
            Name: 'name',
            Value: name
        };

        var attributeName = new AmazonCognitoIdentity.CognitoUserAttribute(dataName);

        userPool.signUp(username, password, [attributeName], null,
            function signUpCallback(err, result) {
                if (!err) {
                    onSuccess(result);
                } else {
                    onFailure(err);
                }
            }
        );
    }

    global.signIn = function(args){
        var username = args.username;
        var password = args.password;
        var onSuccess = args.onSuccess;
        var onFailure = args.onFailure;

        var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
            Username: username,
            Password: password
        });

        var cognitoUser = createCognitoUser(username);
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: onSuccess,
            onFailure: onFailure
        });

    }

    global.createCognitoUser = function(username){
        return new AmazonCognitoIdentity.CognitoUser({
            Username: toUsername(username),
            Pool: userPool
        });
    }

}
