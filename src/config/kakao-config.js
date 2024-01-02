const CLIENT_ID = "dd45287507d47f84c26bd0102482ab88";
const REDIRECT_URI = "http://localhost:3000/login?type=kakao";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
