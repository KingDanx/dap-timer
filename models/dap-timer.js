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
  time(label) {
    const start = performance.now();
    if (label) {
      this.times.set(label, start);
    } else {
      this.start = start;
    }
  }

  /**
   *
   * @param {label} label - name associated with this timer
   */
  timeEnd(label) {
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

  toSeconds(start = this.start, end = this.end) {
    const elapsed = (end - start) / 1000;
    return {
      string: elapsed.toFixed(2) + "s",
      number: Number(elapsed.toFixed(2)),
    };
  }

  clear(label) {
    if (label) {
      return this.times.delete(label);
    }
    this.times.clear();
  }
}
