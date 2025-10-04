
import React from 'react';
import { FlowchartNode } from './FlowchartNode';

interface DownsideAdjustmentFlowchartProps {
    activeNode: string;
}

export const DownsideAdjustmentFlowchart: React.FC<DownsideAdjustmentFlowchartProps> = ({ activeNode }) => {
    return (
        <div className="flex flex-col items-center space-y-8 p-4">
            <FlowchartNode id="start_downside" activeNode={activeNode} type="start_end">Start</FlowchartNode>
            <FlowchartNode id="downside_spx_lt_u" activeNode={activeNode} type="decision">SPX &lt; U</FlowchartNode>
            <FlowchartNode id="downside_num_adjustments" activeNode={activeNode} type="decision">No. of Downside Adjustments Made?</FlowchartNode>

            <div className="flex items-start space-x-16">
                 {/* Path for 1 adjustment */}
                <div className="flex flex-col items-center space-y-8">
                    <p className="font-bold">1</p>
                    <FlowchartNode id="downside_is_conservative" activeNode={activeNode} type="decision">Conservative Trader?</FlowchartNode>
                    <div className="flex space-x-8">
                         <div className="flex flex-col items-center space-y-4">
                             <p>Yes</p>
                             <FlowchartNode id="downside_exit_conservative" activeNode={activeNode} type="start_end">EXIT Contract</FlowchartNode>
                         </div>
                         <div className="flex flex-col items-center space-y-4">
                             <p>No</p>
                             <FlowchartNode id="downside_adjust_1" activeNode={activeNode} type="action">CLOSE existing<br/>SELL/BUY new</FlowchartNode>
                         </div>
                    </div>
                </div>

                {/* Path for 2 adjustments */}
                <div className="flex flex-col items-center space-y-8">
                    <p className="font-bold">2</p>
                    <FlowchartNode id="downside_exit_2" activeNode={activeNode} type="start_end">EXIT Contract</FlowchartNode>
                </div>
            </div>
            <FlowchartNode id="downside_hold" activeNode={activeNode} type="start_end">Hold</FlowchartNode>
        </div>
    );
}
