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
});
