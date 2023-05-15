import React from 'react';

interface Props {
  FallbackComponent: React.ComponentType<{ errorMessage: string }>;
}
interface State {
  error?: Error;
}
export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: undefined };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { error };
  }

  componentDidCatch(error, info) {
    // Example "componentStack":
    //   in ComponentThatThrows (created by App)
    //   in ErrorBoundary (created by App)
    //   in div (created by App)
    //   in App
    // eslint-disable-next-line no-console
    console.error(error, info.componentStack);
  }

  render() {
    const { error } = this.state;
    const { FallbackComponent, children } = this.props;
    if (error) {
      // You can render any custom fallback UI
      return <FallbackComponent errorMessage={error.message} />;
    }

    return children;
  }
}
