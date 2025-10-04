
export interface Butterfly {
  A: number; // Upper Wing Strike
  M: number; // Short Strike
  Z: number; // Lower Wing Strike
  Q: number; // Lot Quantity
  BE: number; // Breakeven
  EXP: string; // Expiration Date as string
}

export interface Adjustment {
  U: number; // Adjustment Strike Price
  type: 'upside' | 'downside';
  count: number;
}

export interface PositionState {
  hasPosition: boolean;
  bwb: Butterfly | null;
  adjustment: Adjustment | null;
}

export interface UserFlags {
    isConservativeTrader: boolean;
    marketInTurmoil: boolean;
    willAdjustmentsNoLongerHelp: boolean;
    bigGap: boolean;
    t5BreakevenInGap: boolean;
    t5BreakevenInAdjustment: boolean;
    dte: number;
    profitPercent: number;
}

export interface TradingLogicInputs {
  spxPrice: number | null;
  positionState: PositionState;
  userFlags: UserFlags;
}

export interface TradingLogicOutput {
  recommendation: string;
  activeNode: string;
}
