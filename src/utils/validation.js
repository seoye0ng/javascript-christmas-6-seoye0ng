import Event from '../Event';

function throwValidationError(message) {
  throw new Error(`[ERROR] ${message} 다시 입력해 주세요.`);
}

export function validateDate(date) {
  if (Number(date) < 1 || Number(date) > 31)
    throwValidationError('유효하지 않은 날짜입니다.');
  if (Number.isNaN(Number(date)))
    throwValidationError('유효하지 않은 날짜입니다.');

  return date;
}

function isValidMenuName(name, validMenus) {
  return validMenus.includes(name);
}

export function validateMenu(orderMenus) {
  if (!orderMenus) throwValidationError('유효하지 않은 주문입니다.');

  // 음료만 주문한 경우
  const isDrinkOnlyOrder = orderMenus.every((menu) => {
    const [name] = menu.split('-');
    return isValidMenuName(name, Object.keys(Event.menu.dessert));
  });

  if (isDrinkOnlyOrder && orderMenus.length > 0)
    throwValidationError('유효하지 않은 주문입니다.');

  const orderList = {};
  // '-'문자가 포함되지 않은 경우
  orderMenus.forEach((menu) => {
    if (!menu.includes('-'))
      throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.');

    const [name, quantity] = menu.split('-');
    const eventMenus = [
      ...Object.keys(Event.menu.appetizer),
      ...Object.keys(Event.menu.main),
      ...Object.keys(Event.menu.dessert),
      ...Object.keys(Event.menu.drink),
    ];
    // 메뉴판에 없는 메뉴일 경우
    if (!isValidMenuName(name, eventMenus))
      throwValidationError('유효하지 않은 주문입니다.');
    // 주문 갯수가 1이상의 숫자가 아닐 경우
    if (Number.isNaN(Number(quantity)) || Number(quantity) < 0)
      throwValidationError('유효하지 않은 주문입니다.');
    // 메뉴를 한 번에 최대 20개 초과로 주문한 경우
    const totalOrders = Object.values(orderList).reduce(
      (total, qty) => total + qty,
      0,
    );
    if (totalOrders + Number(quantity) > 20)
      throwValidationError('유효하지 않은 주문입니다.');
    // 중복 메뉴를 입력한 경우
    if (orderList[name]) throwValidationError('유효하지 않은 주문입니다.');

    orderList[name] = Number(quantity);
  });

  return orderList;
}
