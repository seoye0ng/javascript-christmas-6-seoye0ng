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
