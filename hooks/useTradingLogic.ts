
import { TradingLogicInputs, TradingLogicOutput } from '../types';

export const useTradingLogic = (inputs: TradingLogicInputs): TradingLogicOutput => {
  const { spxPrice, positionState, userFlags } = inputs;

  // --- ENTRY LOGIC ---
  if (!positionState.hasPosition) {
    if (!spxPrice) {
      return { recommendation: "Enter SPX price to calculate entry.", activeNode: 'start_entry' };
    }
    const A = Math.ceil(spxPrice / 10) * 10;
    const M = A - 40;
    const Z = M - 60;
    return {
      recommendation: `ENTRY: Setup BWB. Upper Wing (A): ${A}, Short Strike (M): ${M}, Lower Wing (Z): ${Z}. Expiration: Today + 14 Days. Adjust for Delta between 0 and -1.`,
      activeNode: 'entry_action'
    };
  }

  // If there's a position, but SPX price or BWB details are missing.
  if (!spxPrice || !positionState.bwb) {
    return { recommendation: 'Enter SPX price and full BWB details.', activeNode: 'start_adjustment' };
  }
  
  const { bwb, adjustment } = positionState;
  const { A, M, Z, Q, BE } = bwb;
  
  // --- INTRADAY EXIT LOGIC ---
  if (userFlags.profitPercent >= 5) {
      return { recommendation: "EXIT CONTRACT: Profit target of >= 5% reached.", activeNode: 'intraday_exit_profit5' };
  }
  if (userFlags.dte <= 2) {
      return { recommendation: "EXIT CONTRACT: DTE is <= 2.", activeNode: 'intraday_exit_dte' };
  }
  if (userFlags.profitPercent > 0 && userFlags.marketInTurmoil) {
      return { recommendation: "EXIT CONTRACT: Profit > 0% and Market is in Turmoil.", activeNode: 'intraday_exit_turmoil' };
  }
  if (userFlags.willAdjustmentsNoLongerHelp) {
      return { recommendation: "EXIT CONTRACT: Adjustments will no longer help.", activeNode: 'intraday_exit_nohelp' };
  }


  // --- ADJUSTMENT LOGIC ---
  if (adjustment) { // Existing Adjustment
    // DOWNSIDE ADJUSTMENT LOGIC
    if (adjustment.type === 'downside') {
      if (spxPrice < adjustment.U) {
        if (adjustment.count >= 2) {
          return { recommendation: "EXIT CONTRACT: 2nd Downside Adjustment triggered.", activeNode: 'downside_exit_2' };
        }
        if (adjustment.count === 1) {
          if (userFlags.isConservativeTrader) {
            return { recommendation: "EXIT CONTRACT: Conservative Trader, 1st Downside Adjustment triggered.", activeNode: 'downside_exit_conservative' };
          } else {
            return { recommendation: `CLOSE existing adjustment. SELL ${Q / 2} @ ${spxPrice - 20} for EXP, BUY ${Q / 2} @ ${spxPrice - 20} for EXP+7.`, activeNode: 'downside_adjust_1' };
          }
        }
      }
       return { recommendation: "Hold. Monitor position. SPX is not below Downside Adjustment strike U.", activeNode: 'downside_hold' };
    }
    
    // UPSIDE ADJUSTMENT LOGIC
    if (adjustment.type === 'upside') {
        if (spxPrice > adjustment.U) {
            return { recommendation: `CLOSE existing adjustment. Re-evaluate from main adjustment page as SPX > U.`, activeNode: 'adj_spx_gt_u' };
        }

        if (userFlags.bigGap) {
            if (userFlags.t5BreakevenInGap) {
                return { recommendation: `SELL ${Q / 2} @ ${A} for EXP, BUY ${Q / 2} @ ${A} for EXP+7.`, activeNode: 'upside_adjust_big_gap' };
            }
        } else if (userFlags.t5BreakevenInAdjustment) {
            return { recommendation: `SELL ${Q / 2} @ ${adjustment.U} for EXP+7, BUY ${Q / 2} @ ${adjustment.U - 5} for EXP+7.`, activeNode: 'upside_adjust_no_gap' };
        }
        return { recommendation: "Hold. Monitor Upside Adjustment.", activeNode: 'upside_hold' };
    }

  } else { // No Existing Adjustment
    if (spxPrice > A) {
      return { recommendation: `Go to UPSIDE Adjustment page. SELL ${Q / 2} @ ${spxPrice + 20} for EXP, BUY ${Q / 2} @ ${spxPrice + 20} for EXP+7.`, activeNode: 'no_adj_spx_gt_a' };
    }
    if (spxPrice < BE) {
      return { recommendation: `SELL ${Q / 2} @ ${spxPrice - 20} for EXP, BUY ${Q / 2} @ ${spxPrice - 20} for EXP+7.`, activeNode: 'no_adj_spx_lt_be' };
    }
    const threshold = A - (0.6 * (A - BE));
    if (spxPrice < threshold) {
      return { recommendation: `SELL ${Q / 2} @ ${Z} for EXP, BUY ${Q / 2} @ ${Z} for EXP+7.`, activeNode: 'no_adj_spx_lt_thresh' };
    }
    if (spxPrice < M) {
      return { recommendation: `Optional: SELL ${Q} @ ${Z} for EXP, BUY ${Q} @ ${Z + 10} for EXP.`, activeNode: 'no_adj_spx_lt_m' };
    }
  }

  return { recommendation: "No action required. Continue monitoring position.", activeNode: 'no_action' };
};
