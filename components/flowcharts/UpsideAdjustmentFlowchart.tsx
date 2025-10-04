
import React from 'react';
import { FlowchartNode } from './FlowchartNode';

interface UpsideAdjustmentFlowchartProps {
    activeNode: string;
}

export const UpsideAdjustmentFlowchart: React.FC<UpsideAdjustmentFlowchartProps> = ({ activeNode }) => {
    return (
        <div className="flex flex-col items-center space-y-8 p-4">
            <FlowchartNode id="start_upside" activeNode={activeNode} type="start_end">Start</FlowchartNode>
            <FlowchartNode id="upside_big_gap" activeNode={activeNode} type="decision">Big Gap between BWB & Adjustment?</FlowchartNode>
            
            <div className="flex items-start space-x-24">
                {/* No path */}
                <div className="flex flex-col items-center space-y-8">
                    <p className="font-bold">No</p>
                    <FlowchartNode id="upside_t5_lt_be_in_adj" activeNode={activeNode} type="decision">T+5 &lt; Breakeven in Adjustment</FlowchartNode>
                    <FlowchartNode id="upside_adjust_no_gap" activeNode={activeNode} type="action">SELL Q/2 @ U<br/>BUY Q/2 @ U-5</FlowchartNode>
                </div>

                {/* Yes path */}
                 <div className="flex flex-col items-center space-y-8">
                    <p className="font-bold">Yes</p>
                    <FlowchartNode id="upside_t5_lt_be_in_gap" activeNode={activeNode} type="decision">T+5 &lt; Breakeven in Big Gap</FlowchartNode>
                    <FlowchartNode id="upside_adjust_big_gap" activeNode={activeNode} type="action">SELL Q/2 @ A<br/>BUY Q/2 @ A</FlowchartNode>
                </div>
            </div>
            <FlowchartNode id="upside_hold" activeNode={activeNode} type="start_end">Hold</FlowchartNode>
        </div>
    );
};
