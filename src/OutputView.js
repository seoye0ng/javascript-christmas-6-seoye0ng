import { Console } from '@woowacourse/mission-utils';
import {
  CONTENT_TYPE,
  EMPTY_VALUE,
  MONETARY_UNIT,
} from './constants/OutputViewConstant.js';

const OutputView = {
  printGuideMessage(message) {
    Console.print(message);
  },

  printSection(contentType, output) {
    this.printTitle(contentType);
    this.printContent(contentType, output);
  },

  printTitle(title) {
    Console.print(title);
  },

  printContent(contentType, output) {
    if (CONTENT_TYPE.orderMenu === contentType) this.printOrderMenu(output);
    else if (CONTENT_TYPE.totalOrderPrice === contentType)
      this.printTotalOrderPrice(output);
    else if (CONTENT_TYPE.giftMenu === contentType) this.printGiftMenu(output);
    else if (CONTENT_TYPE.benefitList === contentType)
      this.printBenefitList(output);
    else if (CONTENT_TYPE.benefitPrice === contentType)
      this.printBenefitPrice(output);
    else if (CONTENT_TYPE.discountedTotalPrice === contentType)
      this.printTotalOrderPrice(output);
    else if (CONTENT_TYPE.eventBadge === contentType)
      this.printEventBadge(output);
  },

  // 주문메뉴
  printOrderMenu(orderMenuList) {
    Object.entries(orderMenuList).forEach(([key, value]) => {
      Console.print(`${key} ${value}개`);
    });
  },

  // 할인 전 총주문 금액, 할인 후 예상 결제 금액
  printTotalOrderPrice(price) {
    Console.print(`${Number(price).toLocaleString()}${MONETARY_UNIT}`);
  },

  // 증정 메뉴
  printGiftMenu(price) {
    Console.print(price !== 0 ? Number(price).toLocaleString() : EMPTY_VALUE);
  },

  // 혜택 내역
  printBenefitList(benefitList) {
    const isEmptyBenefit = Object.values(benefitList).every((benefit) => {
      return benefit === 0;
    });

    if (isEmptyBenefit) Console.print(EMPTY_VALUE);
    else
      Object.entries(benefitList)
        .filter(([key, value]) => value !== 0)
        .forEach(([key, value]) => {
          Console.print(
            `${key}: -${Number(value).toLocaleString()}${MONETARY_UNIT}`,
          );
        });
  },

  // 총혜택 금액
  printBenefitPrice(price) {
    Console.print(`-${Number(price).toLocaleString()}${MONETARY_UNIT}`);
  },

  // 12월 이벤트 배지
  printEventBadge(badge) {
    Console.print(badge !== null ? badge : EMPTY_VALUE);
  },
};

export default OutputView;
