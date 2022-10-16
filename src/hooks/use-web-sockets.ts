import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

import { LOCAL_BACKEND_ADDRESS, PRODUCTION_BACKEND_ADDRESS } from 'consts';
import {
  updateConnectedUsers,
  updateSearchingForGameUsers,
  updateActiveGame,
  updateBannedPlayers,
} from 'store/slices';
import { useAppDispatch, useAppSelector } from './store';
import { IBannedPlayer, IGame, IUser } from 'types';
import { WsEvents } from 'enums';

export const socket = io(
  process.env.NODE_ENV === 'development' ? LOCAL_BACKEND_ADDRESS : PRODUCTION_BACKEND_ADDRESS,
  { transports: ['websocket'] },
);

let isSocketInitialized = false;

export const useWebSockets = () => {
  const dispatch = useAppDispatch();

  const [isWsConnected, setWsConnected] = useState(false);

  const { value: user } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (isSocketInitialized) {
      throw new Error('useWebSockets hook can be called only once');
    }
    isSocketInitialized = true;

    socket.on(WsEvents.Connect, () => {
      console.log('ws connected');
      socket.emit(WsEvents.Join, { user });
      setWsConnected(true);
    });

    socket.on(WsEvents.Disconnect, () => {
      console.log('ws disconnectedd');
      setWsConnected(false);
    });

    socket.on(
      WsEvents.UpdateLobby,
      ({
        users,
        searchingForGameUsers,
        bannedPlayers,
      }: {
        users?: IUser[];
        searchingForGameUsers?: IUser[];
        bannedPlayers?: IBannedPlayer[];
      }) => {
        if (users !== undefined) {
          dispatch(updateConnectedUsers(users));
        }
        if (searchingForGameUsers !== undefined) {
          dispatch(updateSearchingForGameUsers(searchingForGameUsers));
        }
        if (bannedPlayers !== undefined) {
          dispatch(updateBannedPlayers(bannedPlayers));
        }
      },
    );

    socket.on(
      WsEvents.UpdateGame,
      ({ game, isDeclinedByOpponent }: { game?: IGame; isDeclinedByOpponent?: boolean }) => {
        dispatch(updateActiveGame(game));
        if (isDeclinedByOpponent) {
          socket.emit(WsEvents.StartSearching);
        }
      },
    );

    return () => {
      socket.off(WsEvents.Connect);
      socket.off(WsEvents.UpdateLobby);
      socket.off(WsEvents.Disconnect);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user === undefined || !isWsConnected) {
      return;
    }
    socket.emit(WsEvents.Join, { user });
  }, [user, isWsConnected]);
};
