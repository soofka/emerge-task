import React from "react";
import { AppEventLevel } from "./types.js";

type FiltersProps = {
  from?: string;
  setFrom: (from?: string) => void;
  to?: string;
  setTo: (to?: string) => void;
  level?: number;
  setLevel: (level?: number) => void;
};

export function Filters({
  from,
  setFrom,
  to,
  setTo,
  level,
  setLevel,
}: FiltersProps) {
  return (
    <>
      <input
        type="text"
        placeholder="From"
        value={from}
        onChange={(event) => setFrom(event.target.value)}
      />
      <input
        type="text"
        placeholder="To"
        value={to}
        onChange={(event) => setTo(event.target.value)}
      />
      <select
        value={level}
        onChange={(event) => setLevel(parseInt(event.target.value))}
      >
        {Object.values(AppEventLevel)
          .filter((v) => typeof v === "number")
          .map((level) => (
            <option key={level} value={level}>
              {AppEventLevel[level]}
            </option>
          ))}
      </select>
    </>
  );
}
