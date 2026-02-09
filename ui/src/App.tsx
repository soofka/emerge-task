import React, { useCallback, useEffect, useMemo, useState } from "react";
import { type AppEvent } from "./types.js";
import { Filters } from "./Filters.js";
import { Table } from "./Table.js";

export function App() {
  const [from, setFrom] = useState<string>();
  const [to, setTo] = useState<string>();
  const [level, setLevel] = useState<number>();

  const [events, setEvents] = useState<AppEvent[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchUrl = useMemo(
    () => createFetchUrl(from, to, level),
    [from, to, level],
  );

  const fetchData = useCallback(() => {
    setLoading(true);
    const controller = new AbortController();
    fetch(fetchUrl, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) {
          setError(res.statusText);
          throw new Error(`HTTP ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setEvents(data))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [fetchUrl]);

  useEffect(() => {
    const timer = setTimeout(() => fetchData(), 300);
    return () => clearTimeout(timer);
  }, [fetchData]);

  return (
    <>
      {error && <p>Error: {JSON.stringify(error)}</p>}
      {loading && <p>Loading...</p>}
      <Filters
        from={from}
        setFrom={setFrom}
        to={to}
        setTo={setTo}
        level={level}
        setLevel={setLevel}
      />
      <Table events={events} />
    </>
  );
}

function createFetchUrl(from?: string, to?: string, level?: number): string {
  const query = new URLSearchParams();
  if (from) {
    query.set("from", from);
  }
  if (to) {
    query.set("to", to);
  }
  if (level !== undefined) {
    query.set("level", String(level));
  }
  return `http://localhost:3000?${query.toString()}`;
}
