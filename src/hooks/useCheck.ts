// 로그인, 회원가입 유효성 검사 파일

// 아이디 형식 검사
export const idCheck = (userId: string) => {
  let _reg = /^(?=.*[0-9a-zA-Z]).{4,15}$/;
  return _reg.test(userId);
};

//이메일 형식 검사
export const emailCheck = (email: string) => {
  let _reg =
    /^[0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.0-9a-zA-z])*.([a-zA-Z])*/;
  return _reg.test(email);
};

// 비밀번호 체크 특수문자 제외
export const passwordCheckF = (pw: string) => {
  let regPass = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,15}$/;
  return regPass.test(pw);
};

// 정규식
// ^ => 시작
// (?=.*\d) => 0~9까지의 숫자 표현
// (?=.*[a-zA-Z]) => 알파벳

// 숫자 영어 필수 4-15
// 비번 영어숫자특수문자 필수 4-20
