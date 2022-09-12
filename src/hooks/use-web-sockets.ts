import { useEffect, useState } from "react";
import { io } from "socket.io-client";

import {
  LOCAL_BACKEND_ADDRESS,
  PRODUCTION_BACKEND_ADDRESS,
  WS_EVENTS,
} from "consts";
import { updateConnectedUsers } from "store/slices";
import { useAppDispatch, useAppSelector } from "./store";
import { IUser } from "types";

const socket = io(
  process.env.NODE_ENV === "development"
    ? LOCAL_BACKEND_ADDRESS
    : PRODUCTION_BACKEND_ADDRESS,
  { transports: ["websocket"] }
);

export const useWebSockets = () => {
  const dispatch = useAppDispatch();

  const [isWsConnected, setWsConnected] = useState(false);

  const { value: user } = useAppSelector((state) => state.user);

  useEffect(() => {
    socket.on(WS_EVENTS.CONNECT, () => {
      console.log("ws connected");
      socket.emit(WS_EVENTS.JOIN, { user });
      setWsConnected(true);
    });

    socket.on(WS_EVENTS.DISCONNECT, () => {
      console.log("ws disconnectedd");
      setWsConnected(false);
    });

    socket.on(WS_EVENTS.UPDATE_LOBBY, (data: IUser[]) => {
      dispatch(updateConnectedUsers(data));
    });

    return () => {
      socket.off(WS_EVENTS.CONNECT);
      socket.off(WS_EVENTS.UPDATE_LOBBY);
      socket.off(WS_EVENTS.DISCONNECT);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user === undefined || !isWsConnected) {
      return;
    }
    console.log("sent user");
    socket.emit(WS_EVENTS.JOIN, { user });
  }, [user, isWsConnected]);
};
