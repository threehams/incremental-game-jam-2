import {
  ItemMap,
  PurchasedContainerMap,
  PurchasedUpgradeMapState,
  SlotMap,
  FloorContainerMap,
} from "@botnet/messages";
import { Array, Record, Static, String, Number } from "runtypes";

export const InventoryState = Record({
  currentContainerId: String,
  floorIds: FloorContainerMap,
  handContainerId: String,
  highestMoneys: Number,
  itemMap: ItemMap,
  moneys: Number,
  purchasedContainerIds: Array(String),
  purchasedContainerMap: PurchasedContainerMap,
  purchasedUpgradeMap: PurchasedUpgradeMapState,
  sellableItems: Number,
  slotMap: SlotMap,
});
export type InventoryState = Static<typeof InventoryState>;