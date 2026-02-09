import React, { useCallback, useMemo, useState } from "react";
import { type AppEvent } from "./types.js";

type TableProps = {
  events: AppEvent[];
};

type SortOrder = "ASC" | "DESC";

export function Table({ events }: TableProps) {
  const [sortColumnKey, setSortColumnKey] =
    useState<keyof AppEvent>("timestamp");
  const [sortOrder, setSortOrder] = useState<SortOrder>("ASC");

  const sortedEvents = useMemo(() => {
    return [...events].sort((a, b) => {
      const aVal = a[sortColumnKey];
      const bVal = b[sortColumnKey];

      if (aVal > bVal) {
        return sortOrder === "ASC" ? 1 : -1;
      }
      if (aVal < bVal) {
        return sortOrder === "ASC" ? -1 : 1;
      }
      return 0;
    });
  }, [events, sortColumnKey, sortOrder]);

  const sortColumn = useCallback(
    (column: keyof AppEvent) => {
      if (column === sortColumnKey) {
        setSortOrder((prev) => (prev === "ASC" ? "DESC" : "ASC"));
      } else {
        setSortColumnKey(column);
        setSortOrder("ASC");
      }
    },
    [sortColumnKey],
  );

  const renderColumnHeader = useCallback(
    (column: keyof AppEvent) => (
      <th key={column} onClick={() => sortColumn(column)}>
        {column}{" "}
        {sortColumnKey === column ? (sortOrder === "ASC" ? "↑" : "↓") : ""}
      </th>
    ),
    [sortColumn, sortColumnKey, sortOrder],
  );

  return (
    <table>
      <thead>
        <tr>
          {renderColumnHeader("id")}
          {renderColumnHeader("timestamp")}
          {renderColumnHeader("content")}
          {renderColumnHeader("level")}
        </tr>
      </thead>
      <tbody>
        {sortedEvents.map((event) => {
          return (
            <tr key={event.id}>
              <td>{event.id}</td>
              <td>{new Date(event.timestamp).toLocaleDateString()}</td>
              <td>{event.content}</td>
              <td>{event.level}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
