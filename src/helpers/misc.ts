export const clearCookie = (cookieName: string): void => {
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
};
