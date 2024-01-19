import { cognito } from '../../config';

const handleLogin = () => {
    const URL = `https://${cognito.oauth.domain}/login?client_id=${cognito.userPoolWebClientId}&response_type=${cognito.oauth.responseType}&scope=${cognito.oauth.scope.join('+')}&redirect_uri=${cognito.oauth.redirectSignIn}`;
    window.location.href = URL;
}

export { handleLogin };