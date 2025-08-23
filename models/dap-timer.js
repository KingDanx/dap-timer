import { prototype } from "events";
import { performance } from "perf_hooks";

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
  start = null;

  /**
   * The end time of the timer.
   * @type {number | null}
   */
  end = null;

  /**
   * A map of time entries.
   * @type {Map<string, number>}
   */
  times = new Map();

  /**
   *
   * @param {string | null} label - name associated with this timer
   */
  time(label = null) {
    const start = performance.now();
    if (label) {
      this.times.set(label, start);
    } else {
      this.start = start;
    }
  }

  /**
   *
   * @param {string|null} label - name associated with this timer
   */
  timeEnd(label = null) {
    const end = performance.now();
    if (label) {
      if (!this.times.has(label)) {
        throw new Error(
          `The label provided: ${label} does not have an associated start time`
        );
      }
      const time = this.toSeconds(this.times.get(label), end);
      this.times.delete(label);
      return time;
    } else if (this.start === null) {
      throw new Error("There is no associated start time");
    } else {
      this.end = end;
      const time = this.toSeconds();
      this.start = null;
      this.end = null;
      return time;
    }
  }

  /**
   * @param {string|null} label - name associated with this timer
   * @param {"log"|"info"|"warn"|"error"|null} logType - log type
   * @returns {string}
   */
  timeLog(label = null, logType = null) {
    const duration = this.timeEnd(label);
    const message = `${label} has completed with a duration of ${duration.string}`;
    if (logType && typeof console[logType] === "function") {
      console[logType](message);
    }
    return message;
  }

  /**
   *
   * @param {number|null} start
   * @param {number|null} end
   * @returns
   * @throws {Error}
   */
  toSeconds(start = this.start, end = this.end) {
    if (!start || !end) {
      throw new Error("start and end values cannot be null");
    }
    const elapsed = (end - start) / 1000;
    return {
      string: elapsed.toFixed(2) + "s",
      number: Number(elapsed.toFixed(2)),
    };
  }

  /**
   *
   * @param {string|null} label
   * @returns
   */
  clear(label = null) {
    if (label) {
      return this.times.delete(label);
    }
    this.times.clear();
  }
}
