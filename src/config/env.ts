/**
 * Centralized, environment-driven frontend configuration.
 * Keeps deployment-specific URLs out of UI components and provides
 * a single boundary for future backend API integration.
 */
export interface AppConfig {
  appName: string;
  apiBaseUrl: string;
  isProduction: boolean;
}

export const appConfig: AppConfig = {
  appName: import.meta.env.VITE_APP_NAME?.trim() || 'ArcCross',
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL?.trim() || '/api',
  isProduction: import.meta.env.PROD,
};
