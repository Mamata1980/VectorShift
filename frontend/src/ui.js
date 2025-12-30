// ui.js
// Displays the drag-and-drop UI with professional styling
// --------------------------------------------------

import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { FilterNode } from './nodes/filterNode';
import { TimerNode } from './nodes/timerNode';
import { APINode } from './nodes/apiNode';
import { ConditionalNode } from './nodes/conditionalNode';
import { MathNode } from './nodes/mathNode';
import { NoteNode } from './nodes/noteNode';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };

const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  filter: FilterNode,
  timer: TimerNode,
  api: APINode,
  conditional: ConditionalNode,
  math: MathNode,
  note: NoteNode,
};

export const PipelineUI = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    
    // Use individual selectors to avoid shallow comparison issues
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);
    const getNodeID = useStore((state) => state.getNodeID);
    const addNode = useStore((state) => state.addNode);
    const onNodesChange = useStore((state) => state.onNodesChange);
    const onEdgesChange = useStore((state) => state.onEdgesChange);
    const onConnect = useStore((state) => state.onConnect);

    const getInitNodeData = (nodeID, type) => {
      let nodeData = { id: nodeID, nodeType: `${type}` };
      return nodeData;
    }

    const onDrop = useCallback(
        (event) => {
          event.preventDefault();
    
          if (event?.dataTransfer?.getData('application/reactflow')) {
            const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
            const type = appData?.nodeType;
      
            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
              return;
            }
      
            // Use screenToFlowPosition instead of deprecated project method
            const position = reactFlowInstance.screenToFlowPosition({
              x: event.clientX,
              y: event.clientY,
            });

            const nodeID = getNodeID(type);
            const newNode = {
              id: nodeID,
              type,
              position,
              data: getInitNodeData(nodeID, type),
            };
      
            addNode(newNode);
          }
        },
        [reactFlowInstance, getNodeID, addNode]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    return (
        <div 
          ref={reactFlowWrapper} 
          style={{
            width: '100%', 
            height: 'calc(100vh - 180px)',
            background: '#0a0a0f',
            borderRadius: '12px',
            overflow: 'hidden',
            border: '1px solid #1f2937'
          }}
          data-testid="pipeline-canvas"
        >
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onInit={setReactFlowInstance}
                nodeTypes={nodeTypes}
                proOptions={proOptions}
                snapGrid={[gridSize, gridSize]}
                connectionLineType='smoothstep'
                defaultEdgeOptions={{
                  type: 'smoothstep',
                  animated: true,
                  style: { stroke: '#6366f1', strokeWidth: 2 }
                }}
                fitView
                style={{ background: '#0a0a0f' }}
            >
                <Background 
                  color="#1f2937" 
                  gap={gridSize} 
                  variant="dots"
                  size={1}
                />
                <Controls 
                  style={{ 
                    background: '#1e1e2e', 
                    borderRadius: '8px',
                    border: '1px solid #374151'
                  }}
                />
                <MiniMap 
                  nodeColor={(node) => {
                    const colorMap = {
                      customInput: '#10b981',
                      customOutput: '#f59e0b',
                      llm: '#8b5cf6',
                      text: '#3b82f6',
                      filter: '#ec4899',
                      timer: '#14b8a6',
                      api: '#f97316',
                      conditional: '#a855f7',
                      math: '#06b6d4',
                      note: '#fbbf24'
                    };
                    return colorMap[node.type] || '#6366f1';
                  }}
                  maskColor="rgba(0, 0, 0, 0.7)"
                  style={{ 
                    background: '#1e1e2e',
                    borderRadius: '8px',
                    border: '1px solid #374151'
                  }}
                />
            </ReactFlow>
        </div>
    )
};
