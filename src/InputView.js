import { Console } from '@woowacourse/mission-utils';
import { validateDate, validateMenu } from './utils/validation';
import { REQUEST_MESSAGE } from './constants/InputViewConstant.js';

const InputView = {
  async readDate() {
    try {
      const date = await Console.readLineAsync(REQUEST_MESSAGE.date);
      return validateDate(date);
    } catch (error) {
      Console.print(error.message);
      return this.readDate(); // 재귀적으로 함수 호출
    }
  },

  async readMenu() {
    try {
      const input = await Console.readLineAsync(REQUEST_MESSAGE.menu);
      const orderMenus = input.split(',');
      return validateMenu(orderMenus);
    } catch (error) {
      Console.print(error.message);
      return this.readMenu();
    }
  },
};
export default InputView;
