// submit.js - With backend integration

import { useStore } from './store';
import { useState } from 'react';

export const SubmitButton = () => {
    // Use individual selectors
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
      if (nodes.length === 0) {
        alert('⚠️ No nodes in the pipeline!\n\nPlease add some nodes to your pipeline before submitting.');
        return;
      }

      setIsLoading(true);

      try {
        // Get the backend URL from environment variable
        const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
        
        // Send nodes and edges to backend
        const response = await fetch(`${backendUrl}/api/pipelines/parse`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nodes, edges }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Display alert with pipeline analysis results
        const dagStatus = data.is_dag 
          ? '✅ Yes - Valid DAG' 
          : '❌ No - Contains cycles';
        
        alert(
          `📊 Pipeline Analysis Results\n` +
          `${'='.repeat(30)}\n\n` +
          `🟢 Number of Nodes: ${data.num_nodes}\n` +
          `🟡 Number of Edges: ${data.num_edges}\n` +
          `🔄 Is DAG (Directed Acyclic Graph): ${dagStatus}\n\n` +
          `${data.is_dag 
            ? '✨ Your pipeline is valid and ready for execution!' 
            : '⚠️ Warning: Your pipeline contains cycles which may cause infinite loops.'}`
        );
      } catch (error) {
        console.error('Error submitting pipeline:', error);
        alert(
          `❌ Error Submitting Pipeline\n\n` +
          `Failed to analyze the pipeline.\n\n` +
          `Error: ${error.message}\n\n` +
          `Please ensure the backend server is running.`
        );
      } finally {
        setIsLoading(false);
      }
    };

    return (
        <div 
          style={{
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            padding: '16px 20px',
            background: 'linear-gradient(180deg, #151521 0%, #1e1e2e 100%)',
            borderTop: '1px solid #2d2d44'
          }}
          data-testid="submit-container"
        >
            <button 
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              style={{
                padding: '12px 32px',
                background: isLoading 
                  ? '#4b5563' 
                  : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: isLoading 
                  ? 'none' 
                  : '0 4px 14px rgba(99, 102, 241, 0.4)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                letterSpacing: '0.3px'
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(99, 102, 241, 0.5)';
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 14px rgba(99, 102, 241, 0.4)';
              }}
              data-testid="submit-button"
            >
              {isLoading ? (
                <>
                  <span style={{ 
                    width: '16px', 
                    height: '16px', 
                    border: '2px solid #ffffff40',
                    borderTopColor: '#ffffff',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
                  Analyzing...
                </>
              ) : (
                <>
                  <span>🚀</span>
                  Submit Pipeline
                </>
              )}
            </button>
            
            {/* Node/Edge count display */}
            <div style={{ 
              marginLeft: '20px',
              display: 'flex',
              gap: '16px',
              color: '#6b7280',
              fontSize: '12px'
            }}>
              <span data-testid="node-count">
                <span style={{ color: '#10b981', fontWeight: 600 }}>{nodes.length}</span> nodes
              </span>
              <span data-testid="edge-count">
                <span style={{ color: '#f59e0b', fontWeight: 600 }}>{edges.length}</span> edges
              </span>
            </div>
        </div>
    );
};
