import React, { FC, useEffect, useRef } from "react";

import { Layout } from "layouts";
import { Container, Game } from "components";

export const GamePage: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isGameInitialized = useRef(false);

  useEffect(() => {
    const div = ref.current;

    if (div === null || isGameInitialized.current) {
      return;
    }

    new Game(div);
    isGameInitialized.current = true;
  }, [ref]);

  return (
    <Layout currentPage="game">
      <Container>
        <div ref={ref} />
      </Container>
    </Layout>
  );
};
