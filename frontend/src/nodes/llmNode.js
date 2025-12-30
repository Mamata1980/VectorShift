// llmNode.js - Refactored to use BaseNode abstraction

import { useState } from 'react';
import { BaseNode, NodeSelect, NodeInput } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  const [model, setModel] = useState(data?.model || 'gpt-4');
  const [temperature, setTemperature] = useState(data?.temperature || '0.7');

  return (
    <BaseNode
      id={id}
      data={data}
      title="LLM"
      icon="🤖"
      color="#8b5cf6"
      inputs={[
        { id: 'system', label: 'System', position: 33 },
        { id: 'prompt', label: 'Prompt', position: 66 }
      ]}
      outputs={[{ id: 'response', label: 'Response' }]}
    >
      <NodeSelect
        label="Model"
        value={model}
        onChange={(e) => setModel(e.target.value)}
        options={[
          { value: 'gpt-4', label: 'GPT-4' },
          { value: 'gpt-4-turbo', label: 'GPT-4 Turbo' },
          { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
          { value: 'claude-3', label: 'Claude 3' },
          { value: 'gemini-pro', label: 'Gemini Pro' }
        ]}
      />
      <NodeInput
        label="Temperature"
        type="number"
        value={temperature}
        onChange={(e) => setTemperature(e.target.value)}
        placeholder="0.0 - 2.0"
      />
      <div style={{ 
        marginTop: '8px', 
        padding: '8px', 
        background: '#8b5cf620', 
        borderRadius: '6px',
        fontSize: '11px',
        color: '#a78bfa'
      }}>
        💡 Connect System & Prompt inputs
      </div>
    </BaseNode>
  );
};
