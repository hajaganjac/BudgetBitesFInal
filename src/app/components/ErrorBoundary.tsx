import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            background: '#F8F9FF',
            padding: '32px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              background: 'white',
              borderRadius: 24,
              padding: '48px 40px',
              maxWidth: 480,
              boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
              border: '1px solid rgba(0,0,0,0.04)',
            }}
          >
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                background: 'rgba(242,78,111,0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
              }}
            >
              <AlertCircle size={36} color="#F24E6F" />
            </div>

            <h1
              style={{
                color: '#111',
                fontSize: 24,
                fontWeight: 800,
                marginBottom: 12,
              }}
            >
              Oops! Something went wrong
            </h1>

            <p
              style={{
                color: '#6b7280',
                fontSize: 15,
                lineHeight: 1.6,
                marginBottom: 24,
              }}
            >
              We encountered an unexpected error. Don't worry, your data is safe!
            </p>

            {this.state.error && (
              <details
                style={{
                  background: '#f8f9ff',
                  borderRadius: 12,
                  padding: 16,
                  marginBottom: 24,
                  textAlign: 'left',
                  fontSize: 13,
                  color: '#374151',
                  border: '1px solid #e5e7eb',
                }}
              >
                <summary style={{ cursor: 'pointer', fontWeight: 600, marginBottom: 8 }}>
                  Error details
                </summary>
                <code style={{ fontSize: 12, color: '#F24E6F', display: 'block', wordBreak: 'break-word' }}>
                  {this.state.error.message}
                </code>
              </details>
            )}

            <button
              onClick={this.handleReset}
              style={{
                padding: '14px 28px',
                borderRadius: 14,
                border: 'none',
                cursor: 'pointer',
                background: 'linear-gradient(135deg, #F24E6F 0%, #29B6C5 100%)',
                color: 'white',
                fontSize: 15,
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                boxShadow: '0 4px 16px rgba(242,78,111,0.28)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.boxShadow = '0 6px 24px rgba(242,78,111,0.35)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(242,78,111,0.28)';
              }}
            >
              <RefreshCcw size={16} />
              Return to Dashboard
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
