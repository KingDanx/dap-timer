/**
 * A timer class for tracking start and end times, similar to console.time/console.timeEnd.
 * @class
 * @constructor
 */
export default class DAPTimer {
    /**
     * The start time of the timer.
     * @type {number | null}
     */
    start: number | null;
    /**
     * The end time of the timer.
     * @type {number | null}
     */
    end: number | null;
    /**
     * A map of time entries.
     * @type {Map<string, number>}
     */
    times: Map<string, number>;
    /**
     *
     * @param {string | null} label - name associated with this timer
     */
    time(label?: string | null): void;
    /**
     *
     * @param {string|null} label - name associated with this timer
     */
    timeEnd(label?: string | null): {
        string: string;
        number: number;
    };
    /**
     * @param {string|null} label - name associated with this timer
     * @param {"log"|"info"|"warn"|"error"|null} logType - log type
     * @returns {string}
     */
    timeLog(label?: string | null, logType?: "log" | "info" | "warn" | "error" | null): string;
    /**
     *
     * @param {number|null} start
     * @param {number|null} end
     * @returns
     * @throws {Error}
     */
    toSeconds(start?: number | null, end?: number | null): {
        string: string;
        number: number;
    };
    /**
     *
     * @param {string|null} label
     * @returns
     */
    clear(label?: string | null): boolean | undefined;
}
