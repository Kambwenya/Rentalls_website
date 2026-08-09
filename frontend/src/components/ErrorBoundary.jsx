import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App error boundary caught an error', error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 px-4 py-16 text-slate-100 flex items-center justify-center">
          <div className="max-w-md rounded-2xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
              Something went wrong
            </p>
            <h1 className="mt-4 text-2xl font-semibold">The app hit an unexpected error.</h1>
            <p className="mt-3 text-sm text-slate-400">
              Please try refreshing the page. If the problem continues, contact support.
            </p>
            <button
              type="button"
              onClick={this.resetError}
              className="mt-6 inline-flex items-center justify-center rounded-md bg-amber-500 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-amber-400"
            >
              Try again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
