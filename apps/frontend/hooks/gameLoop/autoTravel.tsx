import { Updater } from "./updateProps";

export const autoTravel: Updater = ({
  delay,
  upgrades,
  allInventory,
  player,
  dispatch,
  playerId,
}) => {
  if (player.action === "TRAVELLING") {
    delay("travel", () => {
      dispatch({ type: "ARRIVE", payload: { playerId } });
    });
  }

  if (!upgrades.autoTravel.level || !upgrades.autoTravel.enabled) {
    return false;
  }

  if (player.location === "TOWN" && allInventory.slots === 0) {
    if (player.action === "IDLE") {
      dispatch({ type: "AUTO_TRAVEL", payload: { playerId } });
    } else if (player.action === "AUTO_TRAVELLING") {
      delay("autoTravel", () => {
        dispatch({
          type: "TRAVEL",
          payload: { destination: "KILLING_FIELDS", playerId },
        });
      });
    }
  } else if (player.location !== "TOWN" && allInventory.full) {
    if (player.action === "IDLE") {
      dispatch({ type: "AUTO_TRAVEL", payload: { playerId } });
    } else if (player.action === "AUTO_TRAVELLING") {
      delay("autoTravel", () => {
        dispatch({
          type: "TRAVEL",
          payload: { destination: "TOWN", playerId },
        });
      });
    }
  }
  return false;
};
