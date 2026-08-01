"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode | ((error: Error, reset: () => void) => ReactNode);
}

interface ErrorBoundaryState {
  error: Error | null;
}

/**
 * Widget-level error boundary for isolating a specific piece of UI (e.g. the
 * mega menu or search modal) so a bug there can't take down the header or
 * the rest of the page. Distinct from `app/error.tsx`, which only catches
 * errors thrown during a route segment's own render - this catches errors
 * from any subtree it wraps, anywhere in the app, and can be reset locally
 * without a full route re-render.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  reset = () => this.setState({ error: null });

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    if (typeof this.props.fallback === "function") return this.props.fallback(error, this.reset);
    if (this.props.fallback) return this.props.fallback;

    return null;
  }
}
