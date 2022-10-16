import React, { FC, useEffect, useRef, useState } from "react";

import { Game } from "components";

export const GameLauncher: FC = () => {
  const [isGameInitialized, setIsGameInitialized] = useState(false);

  const gameContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = gameContainerRef.current;
    if (container === null || isGameInitialized) {
      return;
    }
    new Game(container);
    setIsGameInitialized(true);
  }, [gameContainerRef, isGameInitialized]);

  return <div ref={gameContainerRef} />;
};
