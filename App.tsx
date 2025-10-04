
import React, { useState, useMemo } from 'react';
import { InputForm } from './components/InputForm';
import { Recommendation } from './components/Recommendation';
import { AdjustmentFlowchart } from './components/flowcharts/AdjustmentFlowchart';
import { useTradingLogic } from './hooks/useTradingLogic';
import { PositionState, UserFlags } from './types';
import { DownsideAdjustmentFlowchart } from './components/flowcharts/DownsideAdjustmentFlowchart';
import { UpsideAdjustmentFlowchart } from './components/flowcharts/UpsideAdjustmentFlowchart';
import { IntradayFlowchart } from './components/flowcharts/IntradayFlowchart';
import { EntryFlowchart } from './components/flowcharts/EntryFlowchart';

type View = 'ENTRY' | 'ADJUSTMENT' | 'DOWNSIDE' | 'UPSIDE' | 'INTRADAY';

const App: React.FC = () => {
  const [spxPrice, setSpxPrice] = useState<number | null>(null);
  const [positionState, setPositionState] = useState<PositionState>({
    hasPosition: false,
    bwb: null,
    adjustment: null,
  });
  const [userFlags, setUserFlags] = useState<UserFlags>({
    isConservativeTrader: false,
    marketInTurmoil: false,
    willAdjustmentsNoLongerHelp: false,
    bigGap: false,
    t5BreakevenInGap: false,
    t5BreakevenInAdjustment: false,
    dte: 14,
    profitPercent: 0,
  });
  const [activeView, setActiveView] = useState<View>('ENTRY');

  const decision = useTradingLogic({ spxPrice, positionState, userFlags });

  const renderActiveFlowchart = () => {
    switch (activeView) {
      case 'ENTRY':
        return <EntryFlowchart activeNode={decision.activeNode} spxPrice={spxPrice} />;
      case 'ADJUSTMENT':
        return <AdjustmentFlowchart activeNode={decision.activeNode} />;
      case 'DOWNSIDE':
        return <DownsideAdjustmentFlowchart activeNode={decision.activeNode} />;
      case 'UPSIDE':
        return <UpsideAdjustmentFlowchart activeNode={decision.activeNode} />;
      case 'INTRADAY':
        return <IntradayFlowchart activeNode={decision.activeNode} />;
      default:
        return <EntryFlowchart activeNode={decision.activeNode} spxPrice={spxPrice} />;
    }
  };
  
  const navButtons = [
    { id: 'ENTRY', label: 'Entry' },
    { id: 'ADJUSTMENT', label: 'Adjustments' },
    { id: 'DOWNSIDE', label: 'Downside Adj.' },
    { id: 'UPSIDE', label: 'Upside Adj.' },
    { id: 'INTRADAY', label: 'Intraday' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-cyan-400">SPX Options Trading Assistant</h1>
          <p className="text-gray-400 mt-2">Decision support tool based on the BWB trading system.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <InputForm
              spxPrice={spxPrice}
              setSpxPrice={setSpxPrice}
              positionState={positionState}
              setPositionState={setPositionState}
              userFlags={userFlags}
              setUserFlags={setUserFlags}
            />
          </div>
          <div className="lg:col-span-8">
            <Recommendation recommendation={decision.recommendation} />
            <div className="mt-6 bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg">
                <div className="mb-4 border-b border-gray-600">
                    <nav className="-mb-px flex space-x-6 overflow-x-auto">
                        {navButtons.map(button => (
                             <button
                                key={button.id}
                                onClick={() => setActiveView(button.id as View)}
                                className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                                    activeView === button.id
                                    ? 'border-cyan-400 text-cyan-400'
                                    : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'
                                }`}
                            >
                                {button.label}
                            </button>
                        ))}
                    </nav>
                </div>
                <div className="overflow-x-auto p-4">
                    {renderActiveFlowchart()}
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
