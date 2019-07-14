export { };

let observable = {
    subscribe: (observer) => {
        let i = 0;
        let interval = setInterval(() => {
            i++;
            if (i !== 3) {
                observer.next(i);
            } else {
                observer.error(i);
            }
        }, 1000);

        let subscription = {
            unsubscribe: () => {
                clearInterval(interval);
                observer.complete();
            }
        }

        return subscription;
    }
}

let observer = {
    next: (x) => {
        console.log('Next:  ' + x);
    },
    error: (err) => {
        console.error('Error: ' + err);
    },
    complete: () => {
        console.log('completed!');
    }
}

let subscription = observable.subscribe(observer);

setTimeout(() => {
    subscription.unsubscribe();
}, 10000);