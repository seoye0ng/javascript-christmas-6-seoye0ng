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

  // 혜택 내역
  printBenefitList(benefitList) {
    const isEmptyBenefit = Object.values(benefitList).every((benefit) => {
      return benefit === 0;
    });

    if (isEmptyBenefit) Console.print('없음');
    else
      Object.entries(benefitList)
        .filter(([key, value]) => value !== 0)
        .forEach(([key, value]) => {
          Console.print(`${key}: -${Number(value).toLocaleString()}원`);
        });
  },

  // 총혜택 금액
  printBenefitPrice(price) {
    Console.print(`-${Number(price).toLocaleString()}원`);
  },
};

export default OutputView;
