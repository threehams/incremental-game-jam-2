import { useStore } from "@botnet/store";
import { Box } from "@botnet/ui";
import { css } from "@emotion/react";
import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { HeldItemPanel, InventoryPanel, UpgradePanel } from "../components";
import { CustomDragLayer } from "../components/DragLayer";
import { Progress } from "../components/Progress";
import { useGameLoop } from "../hooks/gameLoop";

const fullQuotes = [
  "I can't carry any more.",
  "I am overburdened.",
  "Where would I put this?",
  "My bag is too heavy.",
];

export const Index = () => {
  const store = useStore();
  const {
    storeHeldItem,
    addSlot,
    availableItems,
    availableUpgrades,
    buyContainerUpgrade,
    buyUpgrade,
    heldItem,
    inventory,
    moneys,
    moveSlot,
    pack,
    purchasedUpgrades,
    sell,
    loot,
    sort,
    adventure,
    arrive,
    playerAction,
    playerLocation,
    playerDestination,
    sellItem,
    travel,
  } = store;
  const progress = useGameLoop({
    adventure,
    storeHeldItem,
    arrive,
    playerAction,
    playerLocation,
    sellItem,
    travel,
    inventory,
    sort,
    availableItems,
    heldItem,
    pack,
    purchasedUpgrades,
    loot,
    sell,
  });
  const {
    killProgress,
    packProgress,
    autoSellProgress,
    sellProgress,
    travelProgress,
    autoKillProgress,
    autoPackProgress,
    autoTravelProgress,
  } = progress;
  const [debug, setDebug] = useState(false);

  return (
    <DndProvider backend={HTML5Backend}>
      <Box
        css={css`
          display: grid;
          grid-template-areas:
            "header header header"
            "inventory inventory hand"
            "upgrades upgrades upgrades";
          grid-template-columns: 1fr 1fr 1fr;
          grid-template-rows: auto auto 1fr;
          align-items: flex-start;
          justify-content: center;
          min-height: 100vh;
          max-width: 1280px;
          margin-right: auto;
          margin-left: auto;
        `}
      >
        <>
          <CustomDragLayer />
          <div
            css={css`
              grid-area: header;
              display: flex;
              justify-content: space-between;
            `}
          >
            <div
              css={css`
                margin-right: 40px;
              `}
            >
              ${Math.floor(moneys)}
            </div>
            <div
              css={css`
                flex: 1 1 auto;
              `}
            >
              {!!autoTravelProgress && (
                <Progress percent={autoTravelProgress}>
                  Deciding where to travel
                </Progress>
              )}
              {!!travelProgress && (
                <Progress percent={travelProgress}>
                  Travelling to{" "}
                  {playerDestination === "TOWN" ? "Town" : "the Killing Fields"}
                </Progress>
              )}
              {!!autoSellProgress && (
                <Progress percent={autoSellProgress}>
                  Looking for a vendor
                </Progress>
              )}
              {!!autoKillProgress && (
                <Progress percent={autoKillProgress}>
                  Searching for something to kill...
                </Progress>
              )}
              {!!autoPackProgress && (
                <Progress percent={autoPackProgress}>
                  Searching for storage...
                </Progress>
              )}
              {!!packProgress && (
                <Progress percent={packProgress}>
                  Storing {heldItem?.name}
                </Progress>
              )}
            </div>
            <div
              css={css`
                margin-left: 40px;
              `}
            >
              Location: {playerLocation}
            </div>
          </div>{" "}
          <Box
            css={css`
              width: 100%;
              grid-area: inventory;
              justify-self: flex-end;
            `}
          >
            <InventoryPanel
              buyContainerUpgrade={buyContainerUpgrade}
              inventory={inventory}
              addSlot={addSlot}
              moveSlot={moveSlot}
            />
          </Box>
          <Box
            css={css`
              grid-area: hand;
              width: 100%;
            `}
          >
            <HeldItemPanel
              addSlot={addSlot}
              moveSlot={moveSlot}
              item={heldItem}
            />
            {heldItem && <div>{fullQuotes[1]}</div>}
          </Box>
          <Box
            css={css`
              grid-area: upgrades;
            `}
          >
            <div
              css={css`
                display: flex;
                flex: row nowrap;
              `}
            >
              <div
                css={css`
                  width: 50%;
                  & > * {
                    margin-bottom: 10px;
                  }
                `}
              >
                <h1>Actions</h1>
                <Progress
                  button
                  disabled={playerAction === "TRAVELLING"}
                  percent={travelProgress}
                  css={css`
                    display: block;
                  `}
                  onClick={() => {
                    travel({
                      destination:
                        playerLocation === "TOWN" ? "KILLING_FIELDS" : "TOWN",
                    });
                  }}
                >
                  Travel to{" "}
                  {playerLocation === "KILLING_FIELDS"
                    ? "Town"
                    : "the Killing Fields"}
                </Progress>
                <Progress
                  button
                  percent={killProgress}
                  disabled={
                    !(
                      playerLocation === "KILLING_FIELDS" &&
                      playerAction === "IDLE" &&
                      !heldItem
                    )
                  }
                  css={css`
                    display: block;
                  `}
                  onClick={() => {
                    adventure();
                  }}
                >
                  Kill something
                </Progress>
                <Progress
                  button
                  percent={sellProgress}
                  disabled={
                    !(
                      playerLocation === "TOWN" &&
                      playerAction !== "TRAVELLING" &&
                      !!inventory.slots.length
                    )
                  }
                  css={css`
                    display: block;
                  `}
                  onClick={() => {
                    sell();
                  }}
                >
                  Sell Item
                </Progress>
                {!!purchasedUpgrades.PACK.level && (
                  <Progress
                    button
                    disabled={
                      !(heldItem && playerAction === "IDLE" && !inventory.full)
                    }
                    percent={packProgress}
                    css={css`
                      display: block;
                    `}
                    onClick={() => {
                      pack();
                    }}
                  >
                    Store item
                  </Progress>
                )}
                {!!purchasedUpgrades.SORT.level && (
                  <Progress
                    button
                    percent={0}
                    onClick={() => {
                      sort({ containerId: inventory.id });
                    }}
                  >
                    Sort
                  </Progress>
                )}
              </div>
              <div
                css={css`
                  width: 50%;
                `}
              >
                <h1>Upgrades</h1>
                <UpgradePanel
                  buyUpgrade={buyUpgrade}
                  upgrades={availableUpgrades}
                />
              </div>
            </div>
          </Box>
        </>
      </Box>
      <button
        onClick={() => {
          setDebug((current) => !current);
        }}
      >
        debug do not press
      </button>
      {debug && <div>{JSON.stringify(store)}</div>}
      {debug && <div>{JSON.stringify(progress)}</div>}
    </DndProvider>
  );
};

export default Index;
