import { test, expect } from "bun:test";
import { randomUUID } from "crypto";
import DAPTimer from "../models/dap-timer";

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

test("DAPTimer initialized correctly", () => {
  const timer = new DAPTimer();
  expect(timer.start).toBe(null);
  expect(timer.end).toBe(null);
  expect(timer.times).toBeInstanceOf(Map);
  expect(timer.times.size).toBe(0);
});

test("DAPTimer measures elapsed time with no label", async () => {
  const timer = new DAPTimer();
  timer.time();
  expect(timer.start).toBeNumber();

  await sleep(1_000);

  const elapsed = timer.timeEnd();
  expect(elapsed).toBeObject();

  const { string, number } = elapsed;
  expect(number).toBeNumber();
  expect(string).toBe(`${number.toFixed(2)}s`);
  expect(timer.start).toBeNull();
  expect(timer.end).toBeNull();
});

test("DAPTimer measures elapsed time with label", async () => {
  const timer = new DAPTimer();
  const uuid = randomUUID();
  timer.time(uuid);
  expect(timer.times.get(uuid)).toBeNumber();

  await sleep(1_000);

  const elapsed = timer.timeEnd(uuid);
  expect(elapsed).toBeObject();

  const { string, number } = elapsed;
  expect(number).toBeNumber();
  expect(string).toBe(`${number.toFixed(2)}s`);
  expect(timer.times.has(uuid)).toBeFalse();
});

test("DAPTimer fails with no associated DAPTimer.time() w/o label", () => {
  try {
    const timer = new DAPTimer();
    timer.timeEnd();
    expect().fail("Expected timeEnd to throw an error");
  } catch (e) {
    expect(e).toBeInstanceOf(Error);
    expect(e.message).toBe("There is no associated start time");
  }
});

test("DAPTimer fails with no associated DAPTimer.time() w/ label", () => {
  const uuid = randomUUID();
  try {
    const timer = new DAPTimer();
    timer.timeEnd(uuid);
    expect().fail("Expected timeEnd to throw an error");
  } catch (e) {
    expect(e).toBeInstanceOf(Error);
    expect(e.message).toBe(
      `The label provided: ${uuid} does not have an associated start time`
    );
  }
});

test("DAPTimer deletes label from times map", () => {
  const uuid = randomUUID();
  const timer = new DAPTimer();
  timer.time(uuid);
  expect(timer.times.get(uuid)).toBeNumber();
  timer.clear(uuid);
  expect(timer.times.has(uuid)).toBeFalse();
});

test("DAPTimer clears map of all labels", () => {
  const timer = new DAPTimer();
  timer.time(randomUUID());
  timer.time(randomUUID());
  timer.clear();
  expect(timer.times.size).toBe(0);
});
