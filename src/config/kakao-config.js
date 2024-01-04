const CLIENT_ID = '155365e0d141c1c75426c902d8b85cc0';
const REDIRECT_URI = 'http://www.law-to-me.site/oauth/redirected/kakao';

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
