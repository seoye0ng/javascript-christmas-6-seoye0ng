import { validateDate, validateMenu } from '../src/utils/validation.js';

describe('입력값 예외처리 테스트', () => {
  test.each([
    ['특수문자 포함', '!3'],
    ['빈 문자열', ''],
    ['31일 초과', '32'],
    ['1일 미만', '0'],
    ['한글 입력', '삼일'],
    ['공백 문자열', ' '],
  ])('날짜 유효성 검사 테스트', (_, input) => {
    const errorMessage =
      '[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.';
    expect(() => validateDate(input)).toThrowError(errorMessage);
  });

  test.each([
    ['- 문자 미포함', ['해산물파스타 1']],
    ['- 문자 대신 다른 특수문자 포함', ['해산물파스타*1']],
    ['빈 문자열', ['']],
    ['중복 메뉴', ['해산물파스타-1', '해산물파스타-2']],
    ['음료만 주문', ['레드와인-2']],
    ['없는 메뉴', ['트러플오일해산물파스타-2']],
    ['20개 이상 주문', ['해산물파스타-15', '초코케이크-15']],
    ['주문갯수 미입력', ['해산물파스타-']],
    ['주문메뉴 미입력', ['-1']],
  ])('메뉴 유효성 검사 테스트', (_, input) => {
    const errorMessage =
      '[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.';
    expect(() => validateMenu(input)).toThrowError(errorMessage);
  });
});
