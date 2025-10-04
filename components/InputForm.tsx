
import React from 'react';
import { PositionState, UserFlags } from '../types';

interface InputFormProps {
  spxPrice: number | null;
  setSpxPrice: (price: number | null) => void;
  positionState: PositionState;
  setPositionState: (state: PositionState) => void;
  userFlags: UserFlags;
  setUserFlags: (flags: UserFlags) => void;
}

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input
    className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-100 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition"
    {...props}
  />
);

const Label: React.FC<{htmlFor: string; children: React.ReactNode; tooltip?: string}> = ({ htmlFor, children, tooltip }) => (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-300 mb-1">
        {children}
        {tooltip && <span className="text-gray-400 ml-1" title={tooltip}>?</span>}
    </label>
);

const Checkbox: React.FC<{id: string; checked: boolean; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; children: React.ReactNode}> = ({ id, checked, onChange, children }) => (
    <div className="flex items-center">
        <input id={id} type="checkbox" checked={checked} onChange={onChange} className="h-4 w-4 rounded border-gray-500 bg-gray-700 text-cyan-600 focus:ring-cyan-500"/>
        <label htmlFor={id} className="ml-2 block text-sm text-gray-300">{children}</label>
    </div>
);


export const InputForm: React.FC<InputFormProps> = ({
  spxPrice,
  setSpxPrice,
  positionState,
  setPositionState,
  userFlags,
  setUserFlags,
}) => {
  const handlePositionChange = (key: keyof PositionState, value: any) => {
    setPositionState({ ...positionState, [key]: value });
  };

  const handleBwbChange = (key: string, value: string) => {
    if (positionState.bwb) {
      const numValue = value ? parseInt(value, 10) : 0;
      handlePositionChange('bwb', { ...positionState.bwb, [key]: numValue });
    }
  };

  const handleAdjustmentChange = (key: string, value: any) => {
      if (positionState.adjustment) {
          handlePositionChange('adjustment', {...positionState.adjustment, [key]: value});
      }
  };
  
  const handleFlagChange = (key: keyof UserFlags, value: any) => {
    setUserFlags({ ...userFlags, [key]: value });
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg space-y-6">
      <h2 className="text-2xl font-bold text-white">Inputs</h2>

      <div>
        <Label htmlFor="spxPrice">Current SPX Price</Label>
        <Input id="spxPrice" type="number" placeholder="e.g., 5305" value={spxPrice ?? ''} onChange={(e) => setSpxPrice(e.target.value ? parseFloat(e.target.value) : null)} />
      </div>

      <div className="space-y-2">
          <p className="text-sm font-medium text-gray-300">Position Status</p>
          <div className="flex gap-4">
            <Checkbox id="no-position" checked={!positionState.hasPosition} onChange={() => handlePositionChange('hasPosition', false)}>No Position</Checkbox>
            <Checkbox id="has-position" checked={positionState.hasPosition} onChange={() => {
                handlePositionChange('hasPosition', true);
                if (!positionState.bwb) {
                    handlePositionChange('bwb', { A: 0, M: 0, Z: 0, Q: 2, BE: 0, EXP: '' });
                }
            }}>Has Position</Checkbox>
          </div>
      </div>
      
      {positionState.hasPosition && (
        <div className="border-t border-gray-700 pt-6 space-y-4">
            <h3 className="text-lg font-semibold text-cyan-400">BWB Details</h3>
            <div>
                <Label htmlFor="bwb-a" tooltip="Upper Wing Strike Price">A</Label>
                <Input id="bwb-a" type="number" value={positionState.bwb?.A ?? ''} onChange={e => handleBwbChange('A', e.target.value)} />
            </div>
            <div>
                <Label htmlFor="bwb-m" tooltip="Short Strike Price">M</Label>
                <Input id="bwb-m" type="number" value={positionState.bwb?.M ?? ''} onChange={e => handleBwbChange('M', e.target.value)} />
            </div>
             <div>
                <Label htmlFor="bwb-z" tooltip="Lower Wing Strike Price">Z</Label>
                <Input id="bwb-z" type="number" value={positionState.bwb?.Z ?? ''} onChange={e => handleBwbChange('Z', e.target.value)} />
            </div>
            <div>
                <Label htmlFor="bwb-q" tooltip="BWB Lot Quantity (even number)">Q</Label>
                <Input id="bwb-q" type="number" step="2" value={positionState.bwb?.Q ?? ''} onChange={e => handleBwbChange('Q', e.target.value)} />
            </div>
            <div>
                <Label htmlFor="bwb-be" tooltip="SPX price where tent's left slope crosses breakeven">BE</Label>
                <Input id="bwb-be" type="number" value={positionState.bwb?.BE ?? ''} onChange={e => handleBwbChange('BE', e.target.value)} />
            </div>
            <div className="pt-4 border-t border-gray-700">
                 <Checkbox id="has-adjustment" checked={!!positionState.adjustment} onChange={(e) => {
                     handlePositionChange('adjustment', e.target.checked ? { U: 0, type: 'downside', count: 1 } : null);
                 }}>Has Existing Adjustment</Checkbox>
            </div>

            {positionState.adjustment && (
                 <div className="pl-4 border-l-2 border-cyan-500 space-y-4">
                    <h4 className="text-md font-semibold text-cyan-400">Adjustment Details</h4>
                     <div>
                        <Label htmlFor="adj-u" tooltip="Existing Adjustment's Strike Price">U</Label>
                        <Input id="adj-u" type="number" value={positionState.adjustment.U} onChange={e => handleAdjustmentChange('U', parseInt(e.target.value, 10) || 0)} />
                    </div>
                     <div>
                        <Label htmlFor="adj-type">Type</Label>
                        <select id="adj-type" value={positionState.adjustment.type} onChange={e => handleAdjustmentChange('type', e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-100 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition">
                            <option value="downside">Downside</option>
                            <option value="upside">Upside</option>
                        </select>
                    </div>
                    {positionState.adjustment.type === 'downside' && (
                        <div>
                            <Label htmlFor="adj-count"># Downside Adjustments</Label>
                            <Input id="adj-count" type="number" min="1" max="2" value={positionState.adjustment.count} onChange={e => handleAdjustmentChange('count', parseInt(e.target.value, 10) || 1)} />
                        </div>
                    )}
                </div>
            )}
        </div>
      )}
      
       <div className="border-t border-gray-700 pt-6 space-y-4">
        <h3 className="text-lg font-semibold text-cyan-400">Context Flags</h3>
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             <div>
                <Label htmlFor="dte">DTE</Label>
                <Input id="dte" type="number" value={userFlags.dte} onChange={e => handleFlagChange('dte', parseInt(e.target.value, 10) || 0)} />
             </div>
             <div>
                <Label htmlFor="profit">Profit %</Label>
                <Input id="profit" type="number" value={userFlags.profitPercent} onChange={e => handleFlagChange('profitPercent', parseFloat(e.target.value) || 0)} />
             </div>
        </div>
        <div className="space-y-2">
            <Checkbox id="isConservative" checked={userFlags.isConservativeTrader} onChange={e => handleFlagChange('isConservativeTrader', e.target.checked)}>Conservative Trader?</Checkbox>
            <Checkbox id="marketTurmoil" checked={userFlags.marketInTurmoil} onChange={e => handleFlagChange('marketInTurmoil', e.target.checked)}>Market in Turmoil?</Checkbox>
            <Checkbox id="noHelp" checked={userFlags.willAdjustmentsNoLongerHelp} onChange={e => handleFlagChange('willAdjustmentsNoLongerHelp', e.target.checked)}>Adjustments no longer help?</Checkbox>
            <Checkbox id="bigGap" checked={userFlags.bigGap} onChange={e => handleFlagChange('bigGap', e.target.checked)}>Big Gap between BWB & Adj.?</Checkbox>
            <Checkbox id="t5Gap" checked={userFlags.t5BreakevenInGap} onChange={e => handleFlagChange('t5BreakevenInGap', e.target.checked)}>T+5 &lt; Breakeven in Big Gap?</Checkbox>
            <Checkbox id="t5Adj" checked={userFlags.t5BreakevenInAdjustment} onChange={e => handleFlagChange('t5BreakevenInAdjustment', e.target.checked)}>T+5 &lt; Breakeven in Adj.?</Checkbox>
        </div>
       </div>
    </div>
  );
};
