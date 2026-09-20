import React from 'react';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, info: unknown) {
    console.error('ErrorBoundary caught:', error, info);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (!this.state.hasError) return this.props.children;
    if (this.props.fallback) return this.props.fallback;

    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-bg dark:bg-dark-bg text-brand-ink dark:text-dark-ink px-6 text-center transition-colors">
        <div className="max-w-md">
          <p className="text-xs uppercase tracking-[0.3em] font-bold text-brand-secondary dark:text-dark-secondary mb-4">
            Something went wrong
          </p>
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-brand-primary dark:text-dark-primary">
            We hit an unexpected hiccup.
          </h1>
          <p className="text-brand-ink/60 dark:text-dark-ink/60 mb-8 font-light leading-relaxed">
            Please reload the page. If the problem persists, check your connection or try again
            later.
          </p>
          <button
            onClick={this.handleReload}
            className="bg-brand-primary dark:bg-dark-primary text-white px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest shadow-lg hover:bg-opacity-90 transition-all"
          >
            Reload
          </button>
        </div>
      </div>
    );
  }
}
