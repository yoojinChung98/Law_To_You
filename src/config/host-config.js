// 브라우저에서 현재 클라이언트의 호스트 이름 얻어오기
const clientHostName = window.location.hostname;

// // let backEndHostName = 'http://localhost:80';
let backEndHostName = 'http://54.180.52.142'; // 백엔드 서버 호스트 이름

// if (clientHostName === 'localhost') {
//   console.log('clientHostName는 : ', clientHostName);
//   // 개발 중
//   backEndHostName = 'http://localhost:8183';
// } else if (
//   // console.log('clientHostName는 : ', clientHostName);
//   // s3 정적호스팅 도메인이 들어와야함
//   clientHostName ===
//   'http://law-to-me.site.s3-website.ap-northeast-2.amazonaws.com'
// ) {
//   // 여기에 리액트의 도메인 주소값으로 비교하는 것임.
// //   // 배포해서 서비스 중
// //   backEndHostName = 'http://15.164.178.169'; // ec2 의 도메인주소가 들어와야 함.
// }

export const API_BASE_URL = backEndHostName + '/api';
// export const USER = "/api/user";
// export const LAWYER = "/api/lawyer";
// export const MYPAGE = "/api/mypage";
// export const FBoard = "/api/freeboard";
// export const COUNSEL = "/api/counsel";
// export const REPLY = "/api/reply";
// export const ANSWER = "/api/answer";
// export const FAQ = "/api/faq";
