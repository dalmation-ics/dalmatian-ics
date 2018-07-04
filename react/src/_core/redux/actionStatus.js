export const UNINITIALIZED = 'UNINITIALIZED';
export const STARTED = 'STARTED';
export const COMPLETE = 'COMPLETE';
export const ERROR = 'ERROR';
export const STOPPED = 'STOPPED';
export const CANCELLED = 'CANCELLED';
export const actionStatus = {
  UNINITIALIZED,
  STARTED,
  COMPLETE,
  ERROR,
  STOPPED,
  CANCELLED,
};
export type ActionStatus =
    UNINITIALIZED
    | STARTED
    | ERROR
    | STOPPED
    | CANCELLED;
