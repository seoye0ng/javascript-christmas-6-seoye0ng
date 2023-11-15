import InputView from './InputView.js';
import OutputView from './OutputView.js';
import Event from './Event.js';
import { CONTENT_TYPE, PRINT_MESSAGE } from './constants/OutputViewConstant.js';

class App {
  async run() {
    this.printWelcomeMessage();

    const date = await InputView.readDate();
    const orderMenuList = await InputView.readMenu();
    const eventResult = this.applyEvent(date, orderMenuList);

    this.printPreviewMessage(date);
    this.printOrderDetails(orderMenuList, eventResult);
  }

  applyEvent(date, orderMenuList) {
    const totalPrice = this.calculateTotalPrice(orderMenuList);
    const benefitList = this.checkBenefit(date, orderMenuList, totalPrice);
    const benefitPrice = this.calculateBenefitPrice(benefitList);
    const discountedTotalPrice = this.calculateDiscountedTotalPrice(
      totalPrice,
      benefitPrice,
    );
    const badge = this.checkBadge(benefitPrice);

    return {
      totalPrice,
      benefitList,
      benefitPrice,
      discountedTotalPrice,
      badge,
    };
  }

  // 할인 전 총주문 금액 계산
  calculateTotalPrice(orderMenuList) {
    const menuType = ['appetizer', 'main', 'dessert', 'drink'];

    return Object.entries(orderMenuList).reduce(
      (totalPrice, [menu, quantity]) => {
        return (
          totalPrice + this.calculateOneMenuPrice(menuType, menu, quantity)
        );
      },
      0,
    );
  }

  // 각 메뉴별 가격 계산
  calculateOneMenuPrice(menuType, menu, quantity) {
    return menuType.reduce((menuPrice, type) => {
      return menuPrice + (Event.menu[type][menu] || 0) * Number(quantity);
    }, 0);
  }

  // 각각의 혜택을 확인해서 혜택 값을 객체로 반환
  checkBenefit(date, orderMenuList, totalPrice) {
    const isWeekDay = [3, 4, 5, 6].includes(Number(date) % 7);
    const isSpecialDay = date % 7 === 3 || date === Event.period.christmas;
    const benefitList = {};
    const type = Event.benefitType;
    benefitList[type.christmas] = Event.benefit.christmas(date);
    isWeekDay
      ? (benefitList[type.weekday] = Event.benefit.weekday(orderMenuList))
      : (benefitList[type.weekend] = Event.benefit.weekend(orderMenuList));
    if (isSpecialDay) benefitList[type.special] = Event.benefit.special();
    benefitList[type.gift] = Event.benefit.gift(totalPrice);

    return benefitList;
  }

  // 총 혜택 금액
  calculateBenefitPrice(benefitList) {
    return Object.values(benefitList).reduce((totalPrice, currentPrice) => {
      return totalPrice + currentPrice;
    }, 0);
  }

  // 할인 후 예상 결제 금액
  calculateDiscountedTotalPrice(totalPrice, benefitPrice) {
    return totalPrice - benefitPrice;
  }

  // 이벤트 배지 부여하기
  checkBadge(benefitPrice) {
    if (benefitPrice >= 20000) return Event.badge[20000];
    if (benefitPrice >= 10000) return Event.badge[10000];
    if (benefitPrice >= 5000) return Event.badge[5000];
    return null;
  }

  printWelcomeMessage() {
    OutputView.printGuideMessage(PRINT_MESSAGE.greeting);
  }

  printPreviewMessage(date) {
    OutputView.printGuideMessage(PRINT_MESSAGE(date).preview);
  }

  printOrderDetails(orderMenuList, eventResult) {
    const sections = [
      { type: CONTENT_TYPE.orderMenu, data: orderMenuList },
      { type: CONTENT_TYPE.totalPrice, data: eventResult.totalPrice },
      {
        type: CONTENT_TYPE.giftMenu,
        data: eventResult.benefitList[Event.benefitType.gift],
      },
      { type: CONTENT_TYPE.benefitList, data: eventResult.benefitList },
      { type: CONTENT_TYPE.benefitPrice, data: eventResult.benefitPrice },
      {
        type: CONTENT_TYPE.discountedTotalPrice,
        data: eventResult.discountedTotalPrice,
      },
      { type: CONTENT_TYPE.eventBadge, data: eventResult.badge },
    ];

    sections.forEach((section) => {
      OutputView.printSection(section.type, section.data);
    });
  }
}

export default App;
