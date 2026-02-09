export type AppEvent = {
  id: string;
  timestamp: number;
  content: string;
  level: AppEventLevel;
};

export enum AppEventLevel {
  DEBUG,
  INFO,
  WARNING,
  ERROR,
}
