import React from 'react';
import MeshGradient from '../MeshGradient';
import type { MeshGradientProps } from '../../types/component.types';

interface ChatPreviewProps {
  orbProps: Omit<MeshGradientProps, 'shape' | 'children'>;
  orbSize: number;
}

const ChatPreview: React.FC<ChatPreviewProps> = ({ orbProps, orbSize }) => {
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '24px',
      margin: '20px',
      minHeight: '400px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      border: '1px solid rgba(0, 0, 0, 0.1)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Chat Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        paddingBottom: '16px',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        marginBottom: '20px',
      }}>
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          backgroundColor: '#e9ecef',
          marginRight: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '16px',
        }}>
          🤖
        </div>
        <div>
          <div style={{ fontWeight: '600', color: '#333', fontSize: '16px' }}>
            AI Assistant
          </div>
          <div style={{ fontSize: '12px', color: '#666' }}>
            Online
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div style={{ marginBottom: '80px' }}>
        {/* User Message */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          marginBottom: '16px' 
        }}>
          <div style={{
            backgroundColor: '#007bff',
            color: 'white',
            padding: '12px 16px',
            borderRadius: '18px',
            maxWidth: '70%',
            fontSize: '14px',
          }}>
            Hi there! How can you help me today?
          </div>
        </div>

        {/* AI Response */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'flex-start', 
          marginBottom: '16px' 
        }}>
          <div style={{
            backgroundColor: '#f8f9fa',
            color: '#333',
            padding: '12px 16px',
            borderRadius: '18px',
            maxWidth: '70%',
            fontSize: '14px',
            border: '1px solid rgba(0, 0, 0, 0.1)',
          }}>
            Hello! I'm here to assist you with any questions or tasks you might have. What can I help you with?
          </div>
        </div>
      </div>

      {/* Floating Orb in Bottom Right */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        right: '20px',
        width: `${orbSize}px`,
        height: `${orbSize}px`,
        borderRadius: '50%',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
        border: '2px solid rgba(255, 255, 255, 0.3)',
      }}>
        <MeshGradient
          {...orbProps}
          shape="orb"
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </div>

      {/* Input Area */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '24px',
        right: `${orbSize + 60}px`, // Leave space for orb
        display: 'flex',
        gap: '12px',
        alignItems: 'center',
      }}>
        <div style={{
          flex: 1,
          padding: '12px 16px',
          backgroundColor: '#f8f9fa',
          borderRadius: '24px',
          border: '1px solid rgba(0, 0, 0, 0.1)',
          fontSize: '14px',
          color: '#666',
        }}>
          Type your message...
        </div>
      </div>
    </div>
  );
};

export default ChatPreview; 