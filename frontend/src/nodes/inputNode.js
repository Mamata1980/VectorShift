// inputNode.js - Refactored to use BaseNode abstraction

import { useState } from 'react';
import { BaseNode, NodeInput, NodeSelect } from './BaseNode';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType || 'Text');

  return (
    <BaseNode
      id={id}
      data={data}
      title="Input"
      icon="📥"
      color="#10b981"
      outputs={[{ id: 'value', label: 'Output' }]}
    >
      <NodeInput
        label="Name"
        value={currName}
        onChange={(e) => setCurrName(e.target.value)}
        placeholder="Enter input name"
      />
      <NodeSelect
        label="Type"
        value={inputType}
        onChange={(e) => setInputType(e.target.value)}
        options={[
          { value: 'Text', label: 'Text' },
          { value: 'File', label: 'File' },
          { value: 'Number', label: 'Number' },
          { value: 'Boolean', label: 'Boolean' }
        ]}
      />
    </BaseNode>
  );
};
