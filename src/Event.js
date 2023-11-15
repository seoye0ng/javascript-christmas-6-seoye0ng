const Event = {
  period: {
    start: 1,
    christmas: 25,
    end: 31,
  },

  menu: {
    appetizer: {
      양송이수프: 6000,
      타파스: 5500,
      시저샐러드: 8000,
    },
    main: {
      티본스테이크: 55000,
      바비큐립: 54000,
      해산물파스타: 35000,
      크리스마스파스타: 25000,
    },
    dessert: { 초코케이크: 15000, 아이스크림: 5000 },
    drink: {
      제로콜라: 3000,
      레드와인: 60000,
      샴페인: 25000,
    },
  },

  benefitType: {
    christmas: '크리스마스 디데이 할인',
    weekday: '평일 할인',
    weekend: '주말 할인',
    special: '특별 할인',
    gift: '증정 이벤트',
  },

  benefit: {
    christmas(date) {
      if (Number(date) <= Event.period.christmas) {
        const basePrice = 1000;
        const discountUnit = 100;
        return date * discountUnit + basePrice - discountUnit;
      }
      return 0;
    },

    weekday(menus) {
      const discountPrice = 2023;
      const discountNumbers = Object.entries(menus)
        .filter(
          ([key, value]) =>
            Object.keys(Event.menu.dessert).includes(key) && Number(value),
        )
        .map(([, value]) => Number(value));
      const totalDiscountNumber = discountNumbers.reduce(
        (totalCount, currentCount) => {
          return totalCount + currentCount;
        },
        0,
      );

      return totalDiscountNumber * discountPrice;
    },

    weekend(menus) {
      const discountPrice = 2023;
      const discountNumbers = Object.entries(menus)
        .filter(
          ([key, value]) =>
            Object.keys(Event.menu.main).includes(key) && Number(value),
        )
        .map(([, value]) => Number(value));
      const totalDiscountNumber = discountNumbers.reduce(
        (totalCount, currentCount) => {
          return totalCount + currentCount;
        },
        0,
      );

      return totalDiscountNumber * discountPrice;
    },

    special() {
      const discountPrice = 1000;
      return discountPrice;
    },

    gift(totalOrderPrice) {
      const requiredPrice = 120000;
      const giftPrice = 25000;
      return Number(totalOrderPrice) >= requiredPrice ? giftPrice : 0;
    },
  },

  badge: {
    5000: '별',
    10000: '트리',
    20000: '산타',
  },
};

export default Event;
