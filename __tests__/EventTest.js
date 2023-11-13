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
});
