import Event from '../src/Event.js';

describe('이벤트 혜택 기능 테스트', () => {
  test('크리스마스 할인 혜택을 반환하는 기능 테스트', () => {
    // given
    const date = '6';
    const date2 = '26';

    // when
    const christmas = Event.benefit.christmas(date);
    const christmas2 = Event.benefit.christmas(date2);

    // then
    expect(christmas).toBe(1500);
    expect(christmas2).toBe(0);
  });

  test('평일 할인 혜택을 반환하는 기능 테스트', () => {
    // given
    const menus = { 해산물파스타: '1', 초코케이크: '2' };
    const menus2 = { 양송이수프: '1', 바비큐립: '1' };

    // when
    const weekday = Event.benefit.weekday(menus);
    const weekday2 = Event.benefit.weekday(menus2);

    // then
    expect(weekday).toBe(4046);
    expect(weekday2).toBe(0);
  });

  test('주말 할인 혜택을 반환하는 기능 테스트', () => {
    // given
    const menus = { 해산물파스타: '1', 초코케이크: '2' };
    const menus2 = { 양송이수프: '1', 레드와인: '1' };

    // when
    const weekend = Event.benefit.weekend(menus);
    const weekend2 = Event.benefit.weekend(menus2);

    // then
    expect(weekend).toBe(2023);
    expect(weekend2).toBe(0);
  });

  test('특별 할인 혜택을 반환하는 기능 테스트', () => {
    // when
    const special = Event.benefit.special();

    // then
    expect(special).toBe(1000);
  });

  test('증정 이벤트 혜택을 반환하는 기능 테스트', () => {
    // given
    const totalOrderPrice = '280000';
    const totalOrderPrice2 = '16000';

    // when
    const gift = Event.benefit.gift(totalOrderPrice);
    const gift2 = Event.benefit.gift(totalOrderPrice2);

    // then
    expect(gift).toBe(25000);
    expect(gift2).toBe(0);
  });
});
