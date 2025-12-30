// outputNode.js - Refactored to use BaseNode abstraction

import { useState } from 'react';
import { BaseNode, NodeInput, NodeSelect } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  return (
    <BaseNode
      id={id}
      data={data}
      title="Output"
      icon="📤"
      color="#f59e0b"
      inputs={[{ id: 'value', label: 'Input' }]}
    >
      <NodeInput
        label="Name"
        value={currName}
        onChange={(e) => setCurrName(e.target.value)}
        placeholder="Enter output name"
      />
      <NodeSelect
        label="Type"
        value={outputType}
        onChange={(e) => setOutputType(e.target.value)}
        options={[
          { value: 'Text', label: 'Text' },
          { value: 'Image', label: 'Image' },
          { value: 'File', label: 'File' },
          { value: 'JSON', label: 'JSON' }
        ]}
      />
    </BaseNode>
  );
};
