export function phoneOnlyNumbers(phone: string): string {
  const replaceExp = /[^\d]/g;
  const newPhone = phone.replace(replaceExp, '');
  return newPhone;
}
