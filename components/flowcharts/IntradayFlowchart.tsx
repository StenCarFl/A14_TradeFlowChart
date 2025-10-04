
import React from 'react';
import { FlowchartNode } from './FlowchartNode';

interface IntradayFlowchartProps {
    activeNode: string;
}

export const IntradayFlowchart: React.FC<IntradayFlowchartProps> = ({ activeNode }) => {
    return (
        <div className="flex flex-col items-center space-y-8 p-4">
            <FlowchartNode id="start_intraday" activeNode={activeNode} type="start_end">Start</FlowchartNode>
            <FlowchartNode id="intraday_profit_check" activeNode={activeNode} type="decision">Current Profit &gt;= 5%</FlowchartNode>
            <FlowchartNode id="intraday_exit_profit5" activeNode={activeNode} type="start_end">EXIT Contract</FlowchartNode>
            
            <FlowchartNode id="intraday_dte_check" activeNode={activeNode} type="decision">DTE &lt;= 2</FlowchartNode>
            <FlowchartNode id="intraday_exit_dte" activeNode={activeNode} type="start_end">EXIT Contract</FlowchartNode>

            <FlowchartNode id="intraday_turmoil_check" activeNode={activeNode} type="decision">Profit &gt; 0% AND Market in Turmoil?</FlowchartNode>
             <FlowchartNode id="intraday_exit_turmoil" activeNode={activeNode} type="start_end">EXIT Contract</FlowchartNode>

            <FlowchartNode id="intraday_nohelp_check" activeNode={activeNode} type="decision">Will Adjustments no longer help?</FlowchartNode>
            <FlowchartNode id="intraday_exit_nohelp" activeNode={activeNode} type="start_end">EXIT Contract</FlowchartNode>

        </div>
    );
}
