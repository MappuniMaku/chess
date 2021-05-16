type Listener = (...args: any) => void;

class Observer {
    events: Record<string, Listener[]>

    constructor() {
        this.events = {};
    }

    subscribe(eventName: string, listener: Listener): void {
        if (this.events[eventName] === undefined) {
            this.events[eventName] = [listener];
        } else {
            this.events[eventName].push(listener);
        }
    }

    unsubscribe(eventName: string, listener: Listener): void {
        this.events[eventName].filter(item => item !== listener);
    }

    dispatch(eventName: string, ...args: any): void {
        const event = this.events[eventName];

        if (event !== undefined) {
            event.forEach(listener => listener(...args));
        }
    }
}

export const observer = new Observer();