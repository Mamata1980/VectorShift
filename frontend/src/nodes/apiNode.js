// apiNode.js - New Node demonstrating abstraction (Part 1)

import { useState } from 'react';
import { BaseNode, NodeInput, NodeSelect, NodeTextArea } from './BaseNode';

export const APINode = ({ id, data }) => {
  const [method, setMethod] = useState(data?.method || 'GET');
  const [url, setUrl] = useState(data?.url || '');
  const [headers, setHeaders] = useState(data?.headers || '{"Content-Type": "application/json"}');

  return (
    <BaseNode
      id={id}
      data={data}
      title="API Request"
      icon="🌐"
      color="#f97316"
      inputs={[
        { id: 'body', label: 'Body', position: 35 },
        { id: 'trigger', label: 'Trigger', position: 65 }
      ]}
      outputs={[
        { id: 'response', label: 'Response', position: 35 },
        { id: 'error', label: 'Error', position: 65 }
      ]}
      minWidth={280}
    >
      <NodeSelect
        label="Method"
        value={method}
        onChange={(e) => setMethod(e.target.value)}
        options={[
          { value: 'GET', label: 'GET' },
          { value: 'POST', label: 'POST' },
          { value: 'PUT', label: 'PUT' },
          { value: 'PATCH', label: 'PATCH' },
          { value: 'DELETE', label: 'DELETE' }
        ]}
      />
      <NodeInput
        label="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://api.example.com/endpoint"
      />
      <NodeTextArea
        label="Headers (JSON)"
        value={headers}
        onChange={(e) => setHeaders(e.target.value)}
        placeholder='{"Authorization": "Bearer token"}'
        rows={2}
      />
      <div style={{ 
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        marginTop: '8px', 
        padding: '8px', 
        background: method === 'GET' ? '#22c55e20' : '#f9731620', 
        borderRadius: '6px',
        fontSize: '11px',
        color: method === 'GET' ? '#4ade80' : '#fb923c'
      }}>
        <span style={{ 
          padding: '2px 6px', 
          background: method === 'GET' ? '#22c55e' : '#f97316',
          color: '#fff',
          borderRadius: '4px',
          fontWeight: 600,
          fontSize: '10px'
        }}>
          {method}
        </span>
        <span>{url || 'No URL set'}</span>
      </div>
    </BaseNode>
  );
};
