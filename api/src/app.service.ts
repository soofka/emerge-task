import { Injectable, BadRequestException } from '@nestjs/common';
import type { AppEvent, AppEventLevel } from './types';

@Injectable()
export class AppService {
  private readonly events: AppEvent[] = Array.from(
    { length: 100 },
    createRandomEvent,
  );

  getEvents(from?: string, to?: string, level?: AppEventLevel): AppEvent[] {
    let events = this.events;

    if (from) {
      if (!validateDate(from)) {
        throw new BadRequestException(`Invalid date: ${from} is not a date.`);
      }
      const dateFrom = new Date(from);
      events = events.filter((event) => new Date(event.timestamp) >= dateFrom);
    }

    if (to) {
      if (!validateDate(to)) {
        throw new BadRequestException(`Invalid date: ${to} is not a date.`);
      }
      const dateTo = new Date(to);
      events = events.filter((event) => new Date(event.timestamp) <= dateTo);
    }

    if (level !== undefined) {
      if (isNaN(level)) {
        throw new BadRequestException(
          `Invalid level: ${level} is not a number.`,
        );
      } else if (level > 3) {
        throw new BadRequestException(`Invalid level: ${level} is too high.`);
      }
      events = events.filter((event) => event.level >= level);
    }

    return events;
  }
}

function createRandomEvent(): AppEvent {
  const start = new Date(Date.now() - 10 * 365 * 24 * 60 * 60 * 1000).getTime();
  const end = Date.now();
  const timestamp = Math.floor(Math.random() * (end - start + 1)) + start;
  return {
    id: crypto.randomUUID(),
    timestamp,
    content: `test content #${Math.round(Math.random() * 100)}`,
    level: Math.round(Math.random() * 3),
  };
}

function validateDate(date: string): boolean {
  return !Number.isNaN(new Date(date).getTime());
}
