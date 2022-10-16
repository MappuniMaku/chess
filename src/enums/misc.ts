export const VALIDATION_ERRORS = [
  "isNotEmpty",
  "isString",
  "isAlphanumeric",
  "isLength",
  "isNumber",
  "isNotUnique",
  "min",
  "max",
] as const;

export enum WsEvents {
  Connect = "connect",
  Join = "join",
  UpdateLobby = "update-lobby",
  Disconnect = "disconnect",
  StartSearching = "start-searching",
  CancelSearching = "cancel-searching",
  UpdateGame = "update-game",
}
