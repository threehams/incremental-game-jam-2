import { StoreProvider, useStore } from "@botnet/store";
import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useGameLoop } from "../hooks/gameLoop";
import { ProgressProvider } from "../hooks/ProgressContext";
import { Layout } from "./Layout";

export const Game = () => {
  const store = useStore();
  const progress = useGameLoop(store);

  return (
    <StoreProvider value={store}>
      <ProgressProvider value={progress}>
        <DndProvider backend={HTML5Backend}>
          <Layout />
        </DndProvider>
      </ProgressProvider>
    </StoreProvider>
  );
};