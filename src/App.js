import InputView from './InputView.js';
import Event from './Event.js';

class App {
  async run() {
    const date = await InputView.readDate();
    const orderMenuList = await InputView.readMenu();
    const totalOrderPrice = this.calculateTotalOrderPrice(orderMenuList);
  }

  // 할인 전 총주문 금액계산
  calculateTotalOrderPrice(orderMenuList) {
    let totalOrderPrice = 0;
    const menuType = ['appetizer', 'main', 'dessert', 'drink'];

    Object.entries(orderMenuList).forEach(([menu, quantity]) => {
      for (let i = 0; i < menuType.length; i++) {
        totalOrderPrice += this.calculateMenuPrice(menuType, i, menu, quantity);
      }
    });

    return totalOrderPrice;
  }

  calculateOneMenuPrice(menuType, i, menu, quantity) {
    return Event.menu[menuType[i]][menu]
      ? Event.menu[menuType[i]][menu] * Number(quantity)
      : 0;
  }
}

export default App;
