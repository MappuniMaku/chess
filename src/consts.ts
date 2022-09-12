export const LOCAL_BACKEND_ADDRESS = "http://localhost:3001";
export const PRODUCTION_BACKEND_ADDRESS =
  "https://chess-backend-nest.herokuapp.com";

export const NUMBER_REGEXP = /^\d*$/;

export const FAILED_VALIDATION_ERROR_CODE = "VALIDATION_FAILED";

export const WS_EVENTS = {
  CONNECT: "connect",
  JOIN: "join",
  UPDATE_LOBBY: "update-lobby",
  DISCONNECT: "disconnect",
};
