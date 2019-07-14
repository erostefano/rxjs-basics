export { };

/**
 * An interface with three methods
 */
interface IObserver {
    next(x): any;
    error(err): any;
    complete(): void;
}

/**
 * A class which implements the interface IObserver
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
 * Observable which has the data streams
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

        //TODO: create type for subscription

        let subscription = {
            unsubscribe: () => {
                clearInterval(interval);
                observer.complete();
            }
        }

        return subscription;
    }
}

let subscription = new Observable().subscribe(new ObserverImpl);

setTimeout(() => {
    subscription.unsubscribe();
}, 10000);