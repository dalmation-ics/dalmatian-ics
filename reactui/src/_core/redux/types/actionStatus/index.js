//@flow

// NOTE FOR THE FUTURE, THESE CONSTANTS MUST LINE UP WITH THE STRINGS IN ActionStatus' type

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
	'UNINITIALIZED'
	| 'STARTED'
	| 'ERROR'
	| 'COMPLETE'
	| 'STOPPED'
	| 'CANCELLED';


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
});
