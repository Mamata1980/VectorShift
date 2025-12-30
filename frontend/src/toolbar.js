// toolbar.js - Enhanced with all node types

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
    const nodeCategories = [
      {
        name: 'Basic',
        nodes: [
          { type: 'customInput', label: 'Input', icon: '📥', color: '#10b981' },
          { type: 'customOutput', label: 'Output', icon: '📤', color: '#f59e0b' },
          { type: 'text', label: 'Text', icon: '📝', color: '#3b82f6' },
        ]
      },
      {
        name: 'AI',
        nodes: [
          { type: 'llm', label: 'LLM', icon: '🤖', color: '#8b5cf6' },
        ]
      },
      {
        name: 'Logic',
        nodes: [
          { type: 'filter', label: 'Filter', icon: '🔍', color: '#ec4899' },
          { type: 'conditional', label: 'Conditional', icon: '🔀', color: '#a855f7' },
          { type: 'math', label: 'Math', icon: '🧮', color: '#06b6d4' },
        ]
      },
      {
        name: 'Integration',
        nodes: [
          { type: 'api', label: 'API', icon: '🌐', color: '#f97316' },
          { type: 'timer', label: 'Timer', icon: '⏱️', color: '#14b8a6' },
        ]
      },
      {
        name: 'Utility',
        nodes: [
          { type: 'note', label: 'Note', icon: '📌', color: '#fbbf24' },
        ]
      }
    ];

    return (
        <div 
          style={{ 
            padding: '16px 20px',
            background: 'linear-gradient(180deg, #1e1e2e 0%, #151521 100%)',
            borderBottom: '1px solid #2d2d44'
          }}
          data-testid="pipeline-toolbar"
        >
            {/* Header */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              marginBottom: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px'
                }}>
                  ⚡
                </div>
                <div>
                  <h1 style={{ 
                    color: '#ffffff', 
                    fontSize: '20px', 
                    fontWeight: 700,
                    margin: 0,
                    letterSpacing: '-0.5px'
                  }}>
                    VectorShift Pipeline
                  </h1>
                  <p style={{ 
                    color: '#6b7280', 
                    fontSize: '12px',
                    margin: 0 
                  }}>
                    Drag nodes to build your workflow
                  </p>
                </div>
              </div>
            </div>

            {/* Node Categories */}
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '20px',
              alignItems: 'flex-start'
            }}>
              {nodeCategories.map((category) => (
                <div key={category.name}>
                  <div style={{ 
                    color: '#6b7280', 
                    fontSize: '10px', 
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    marginBottom: '8px'
                  }}>
                    {category.name}
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: '8px' 
                  }}>
                    {category.nodes.map((node) => (
                      <DraggableNode 
                        key={node.type}
                        type={node.type} 
                        label={node.label} 
                        icon={node.icon}
                        color={node.color}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
        </div>
    );
};
