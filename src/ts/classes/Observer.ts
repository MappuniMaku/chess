import { ObserverEvent } from '../types';

type Listener = (...args: any) => void;

type EventsList = Record<ObserverEvent, Listener[]>;

class Observer {
    events: EventsList = {} as EventsList;

    subscribe(eventName: ObserverEvent, listener: Listener): void {
        if (this.events[eventName] === undefined) {
            this.events[eventName] = [listener];
        } else {
            this.events[eventName].push(listener);
        }
    }

    unsubscribe(eventName: ObserverEvent, listener: Listener): void {
        this.events[eventName].filter(item => item !== listener);
    }

    dispatch(eventName: ObserverEvent, ...args: any): void {
        const event = this.events[eventName];

        if (event !== undefined) {
            event.forEach(listener => listener(...args));
        }
    }
}

export const observer = new Observer();