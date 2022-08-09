import React, { FC, useEffect, useRef } from "react";

import { Layout } from "layouts";
import { Container, Game } from "components";
import { useAppSelector } from "hooks";

export const GamePage: FC = () => {
  const isUserLoading = useAppSelector((state) => state.user.isLoading);

  const ref = useRef<HTMLDivElement>(null);
  const isGameInitialized = useRef(false);

  useEffect(() => {
    const div = ref.current;

    if (div === null || isGameInitialized.current || isUserLoading) {
      return;
    }

    new Game(div);
    isGameInitialized.current = true;
  }, [ref, isUserLoading]);

  return (
    <Layout currentPage="game">
      <Container>
        <div ref={ref} />
      </Container>
    </Layout>
  );
};
