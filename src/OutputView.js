import { Console } from '@woowacourse/mission-utils';

const OutputView = {
  // 주문메뉴
  printOrderMenu(orderMenuList) {
    Object.entries(orderMenuList).forEach(([key, value]) => {
      Console.print(`${key} ${value}개`);
    });
  },
};

export default OutputView;
