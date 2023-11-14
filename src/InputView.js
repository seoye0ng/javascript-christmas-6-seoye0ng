import { Console } from '@woowacourse/mission-utils';
import { validateDate, validateMenu } from './utils/validation';

const InputView = {
  async readDate() {
    try {
      const date = await Console.readLineAsync(
        '12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)',
      );
      return validateDate(date);
    } catch (error) {
      Console.print(error.message);
      return this.readDate(); // 재귀적으로 함수 호출
    }
  },

  async readMenu() {
    try {
      const input = await Console.readLineAsync(
        '주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)',
      );
      const orderMenus = input.split(',');
      return validateMenu(orderMenus);
    } catch (error) {
      Console.print(error.message);
      return this.readMenu();
    }
  },
};
export default InputView;
