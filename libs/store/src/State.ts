import {
  ContainerMap,
  ItemMap,
  PlayerLocation,
  PlayerAction,
  PurchasedContainerMap,
  PurchasedUpgradeMapState,
  SlotMap,
  Upgrade,
} from "@botnet/messages";
import {
  Array,
  Record,
  Static,
  String,
  Number,
  Undefined,
  Union,
  Dictionary,
} from "runtypes";

export const State = Record({
  playerLocation: PlayerLocation,
  messages: Array(String),
  heldItemId: Union(String, Undefined),
  purchasedContainerIds: Array(String),
  purchasedContainerMap: PurchasedContainerMap,
  containerMap: ContainerMap,
  currentContainerId: String,
  itemMap: ItemMap,
  slotMap: SlotMap,
  moneys: Number,
  upgradeMap: Dictionary(Upgrade),
  purchasedUpgradeMap: PurchasedUpgradeMapState,
  playerAction: PlayerAction,
  playerDestination: Union(PlayerLocation, Undefined),
  highestMoneys: Number,
  sellableItems: Number,
});
export type State = Static<typeof State>;
