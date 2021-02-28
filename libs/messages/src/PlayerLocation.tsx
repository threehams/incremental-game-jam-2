import { Union, Literal, Static } from "runtypes";

export const PlayerLocation = Union(Literal("TOWN"), Literal("KILLING_FIELDS"));
export type PlayerLocation = Static<typeof PlayerLocation>;
