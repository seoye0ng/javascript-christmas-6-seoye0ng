import { Console } from '@woowacourse/mission-utils';

const OutputView = {
  // 주문메뉴
  printOrderMenu(orderMenuList) {
    Object.entries(orderMenuList).forEach(([key, value]) => {
      Console.print(`${key} ${value}개`);
    });
  },

  // 할인 전 총주문 금액, 할인 후 예상 결제 금액
  printTotalOrderPrice(price) {
    Console.print(`${Number(price).toLocaleString()}원`);
  },

  // 증정 메뉴
  printGiftMenu(price) {
    Console.print(price !== 0 ? Number(price).toLocaleString() : '없음');
  },
};

export default OutputView;
