import React, { FC, useEffect, useRef, useState } from "react";

import { Layout } from "layouts";
import { Container, Game } from "components";
import { useAppSelector } from "hooks";

export const GamePage: FC = () => {
  const isUserLoading = useAppSelector((state) => state.user.isLoading);

  const gameContainerRef = useRef<HTMLDivElement>(null);
  const [isGameInitialized, setIsGameInitialized] = useState(false);

  useEffect(() => {
    const container = gameContainerRef.current;
    if (container === null || isGameInitialized || isUserLoading) {
      return;
    }
    new Game(container);
    setIsGameInitialized(true);
  }, [gameContainerRef, isGameInitialized, isUserLoading]);

  return (
    <Layout currentPage="game">
      <Container>
        <div ref={gameContainerRef} />
      </Container>
    </Layout>
  );
};
