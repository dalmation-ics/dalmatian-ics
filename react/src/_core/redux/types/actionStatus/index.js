const UNINITIALIZED = 'UNINITIALIZED';
const STARTED = 'STARTED';
const COMPLETE = 'COMPLETE';
const ERROR = 'ERROR';
const STOPPED = 'STOPPED';
const CANCELLED = 'CANCELLED';

/**
 * The Flow/TS type for actionstatus codes.
 * This is a string containing one of the included status codes
 */
export type ActionStatus =
    UNINITIALIZED
    | STARTED
    | ERROR
    | STOPPED
    | CANCELLED;

/**
 *  The list of usable status codes.
 *  To regard these as a type, also import {ActionStatus}
 */
export default ({
  UNINITIALIZED,
  STARTED,
  COMPLETE,
  ERROR,
  STOPPED,
  CANCELLED,
}: ActionStatus);
