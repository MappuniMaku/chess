import React, { FC, useEffect, useRef } from "react";

import { Game } from "components";

export const App: FC = () => {
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

  return <div ref={ref} />;
};
