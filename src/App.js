import InputView from './InputView.js';
import Event from './Event.js';

class App {
  async run() {
    const date = await InputView.readDate();
    const orderMenuList = await InputView.readMenu();
    const totalOrderPrice = this.calculateTotalOrderPrice(orderMenuList);
    const benefitList = this.checkEventBenefit(
      date,
      orderMenuList,
      totalOrderPrice,
    );
    const totalBenefitPrice = this.calculateBenefitPrice(benefitList);
    const discountedTotalOrderPrice = this.calculateDiscountedTotalOrderPrice(
      totalOrderPrice,
      totalBenefitPrice,
    );
  }

  // 할인 전 총주문 금액계산
  calculateTotalOrderPrice(orderMenuList) {
    let totalOrderPrice = 0;
    const menuType = ['appetizer', 'main', 'dessert', 'drink'];

    Object.entries(orderMenuList).forEach(([menu, quantity]) => {
      for (let i = 0; i < menuType.length; i++) {
        totalOrderPrice += this.calculateOneMenuPrice(
          menuType,
          i,
          menu,
          quantity,
        );
      }
    });

    return totalOrderPrice;
  }

  calculateOneMenuPrice(menuType, i, menu, quantity) {
    return Event.menu[menuType[i]][menu]
      ? Event.menu[menuType[i]][menu] * Number(quantity)
      : 0;
  }

  // 각각의 혜택을 확인해서 혜택 값을 객체로 반환
  checkEventBenefit(date, orderMenuList, totalOrderPrice) {
    const isWeekDay = [3, 4, 5, 6].includes(Number(date) % 7);
    const isSpecialDay = date % 7 === 3 || date === Event.period.christmas;
    const benefitList = {};

    benefitList['크리스마스 디데이 할인'] = Event.benefit.christmas(date);
    isWeekDay
      ? (benefitList['평일 할인'] = Event.benefit.weekday(orderMenuList))
      : (benefitList['주말 할인'] = Event.benefit.weekend(orderMenuList));
    if (isSpecialDay) benefitList['특별 할인'] = Event.benefit.special();
    benefitList['증정 이벤트'] = Event.benefit.gift(totalOrderPrice);

    return benefitList;
  }

  // 총 혜택 금액
  calculateBenefitPrice(benefitList) {
    return Object.values(benefitList).reduce((totalPrice, currentPrice) => {
      return totalPrice + currentPrice;
    }, 0);
  }

  // 할인 후 예상 결제 금액
  calculateDiscountedTotalOrderPrice(totalOrderPrice, totalBenefitPrice) {
    return totalOrderPrice - totalBenefitPrice;
  }
}

export default App;
