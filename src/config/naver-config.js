const CLIENT_ID = 'xeSxPPA08Xu5qwsg5krk';

// const REDIRECT_URI = 'http://localhost:3000/naverLogin/redirect';

const REDIRECT_URI = 'http://law-to-me.site/naverLogin/redirect'; // 서버연결시

export const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${CLIENT_ID}&state=STATE_STRING&redirect_uri=${REDIRECT_URI}`;
