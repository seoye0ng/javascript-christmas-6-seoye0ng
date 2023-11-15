import Event from '../Event';
import { ERROR_MESSAGE } from '../constants/InputViewConstant.js';

function throwValidationError(message) {
  throw new Error(`${message} ${ERROR_MESSAGE.AGAIN}`);
}

export function validateDate(date) {
  const parsedDate = Number(date);
  if (!date || Number.isNaN(parsedDate))
    throwValidationError(ERROR_MESSAGE.INVALID_DATE);
  if (parsedDate < 1 || parsedDate > 31)
    throwValidationError(ERROR_MESSAGE.INVALID_DATE);

  return date;
}

function isValidMenuName(name) {
  const eventMenus = [
    ...Object.keys(Event.menu.appetizer),
    ...Object.keys(Event.menu.main),
    ...Object.keys(Event.menu.dessert),
    ...Object.keys(Event.menu.drink),
  ];

  return eventMenus.includes(name);
}

function transformOrderMenuFormat(menu) {
  if (!menu.includes('-')) throwValidationError(ERROR_MESSAGE.INVALID_ORDER);

  const [name, quantity] = menu.split('-');
  return { name, quantity: Number(quantity) };
}

function isDrinkOnlyOrder(orderMenus) {
  const isDrinkOnly = orderMenus.every((menu) => {
    const { name } = transformOrderMenuFormat(menu);
    return Object.keys(Event.menu.drink).includes(name);
  });

  return isDrinkOnly;
}

function isInvalidQuantity(quantity) {
  return Number.isNaN(quantity) || quantity < 0;
}

function isOrderLimitOver(orderList, quantity) {
  const totalOrders = Object.values(orderList).reduce(
    (total, currentQuantity) => total + currentQuantity,
    0,
  );
  return totalOrders + quantity > 20;
}

export function validateMenu(orderMenus) {
  if (!orderMenus || orderMenus.length < 0 || isDrinkOnlyOrder(orderMenus))
    throwValidationError(ERROR_MESSAGE.INVALID_ORDER);

  const orderList = {};
  orderMenus.forEach((menu) => {
    const { name, quantity } = transformOrderMenuFormat(menu);

    if (!isValidMenuName(name) || orderList[name] || !quantity || !name)
      throwValidationError(ERROR_MESSAGE.INVALID_ORDER);
    if (isInvalidQuantity(quantity) || isOrderLimitOver(orderList, quantity))
      throwValidationError(ERROR_MESSAGE.INVALID_ORDER);

    orderList[name] = quantity;
  });

  return orderList;
}
