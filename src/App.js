import InputView from './InputView.js';

class App {
  async run() {
    const date = await InputView.readDate();
    const orderMenuList = await InputView.readMenu();
  }
}

export default App;
