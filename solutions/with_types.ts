export { };

/**
 * Interface Observer with three methods.
 */
interface IObserver {
    /**
     * For the next correct event in the stream
     * @param x event
     */
    next(x): any;

    /**
     * When an error occures
     * @param err error event
     */
    error(err): any;

    /**
     * When the stream has finished
     */
    complete(): void;
}

/**
 * An implementation of the interface IObserver
 */
class ObserverImpl implements IObserver {
    next(x: any) {
        console.log('Next:  ' + x);
    }

    error(err: any) {
        console.error('Error: ' + err);
    }

    complete() {
        console.log('completed!');
    }
}

/**
 * The subscription is returned by the observable when subscribing to it.
 */
class Subscription {
    private observer;
    private interval;

    constructor(interval, observer) {
        this.interval = interval;
        this.observer = observer;
    }

    /**
     * Unsubscribes by clearing the interval
     */
    unsubscribe() {
        clearInterval(this.interval);
        this.observer.complete();
    }
}

/**
 * Observable which has the data
 */
class Observable {

    /**
     * The observer is passed as an callback and reacts
     * @param observer ObserverImpl
     */
    subscribe(observer: IObserver) {
        let i = 0;

        let interval = setInterval(() => {
            i++;
            if (i !== 3) {
                observer.next(i);
            } else {
                observer.error(i);
            }
        }, 1000);

        return new Subscription(interval, observer);
    }
}

let subscription = new Observable().subscribe(new ObserverImpl);

setTimeout(() => {
   subscription.unsubscribe();
}, 10000);