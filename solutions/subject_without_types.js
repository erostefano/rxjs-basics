/*
Exercise: 
- Create your own example of an Subject

Steps:
- Create an Observer
- Create a Subject
*/

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

let subject = {
    observer: {},
    subscribe: observer => {
        this.observer = observer;
    },
    next: x => {
        this.observer.next(x);
    }
}

subject.subscribe(observer);
subject.next(1);
subject.next(2);
