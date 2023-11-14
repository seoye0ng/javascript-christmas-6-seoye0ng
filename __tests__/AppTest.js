import App from '../src/App.js';

describe('기능 테스트', () => {
  test('할인 전 총주문 금액 계산 기능 테스트', () => {
    // given
    const orderMenuList = { 해산물파스타: '1', 초코케이크: '2' };

    // when
    const app = new App();
    const calTotalOrderPrice = app.calculateTotalOrderPrice(orderMenuList);

    // then
    expect(calTotalOrderPrice).toBe(65000);
  });

  test('각각의 혜택을 확인해서 혜택 값을 객체로 반환하는 기능 테스트', () => {
    // given
    const date = '3';
    const orderMenuList = { 해산물파스타: '1', 초코케이크: '1' };
    const totalOrderPrice = 65000;

    // when
    const app = new App();
    const checkEventBenefit = app.checkEventBenefit(
      date,
      orderMenuList,
      totalOrderPrice,
    );

    // then
    const eventBenefit = {
      '크리스마스 디데이 할인': 1200,
      '평일 할인': 2023,
      '특별 할인': 1000,
      '증정 이벤트': 0,
    };
    expect(checkEventBenefit).toEqual(eventBenefit);
  });

  test('총 혜택 금액 계산 기능 테스트', () => {
    // given
    const benefitList = {
      '크리스마스 디데이 할인': 1200,
      '평일 할인': 2023,
      '특별 할인': 1000,
      '증정 이벤트': 0,
    };

    // when
    const app = new App();
    const calBenefitPrice = app.calculateBenefitPrice(benefitList);

    // then
    expect(calBenefitPrice).toBe(4223);
  });

  test('할인 후 예상 결제 금액', () => {
    // given
    const totalOrderPrice = 65000;
    const totalBenefitPrice = 4223;

    // when
    const app = new App();
    const calDiscountedTotalOrderPrice = app.calculateDiscountedTotalOrderPrice(
      totalOrderPrice,
      totalBenefitPrice,
    );

    // then
    expect(calDiscountedTotalOrderPrice).toBe(60777);
  });

  test('이벤트 배지 부여 기능 테스트', () => {
    // given
    const totalBenefitPrice = 19999;

    // when
    const app = new App();
    const giveEventBadge = app.giveEventBadge(totalBenefitPrice);

    // then
    expect(giveEventBadge).toBe('트리');
  });
});
