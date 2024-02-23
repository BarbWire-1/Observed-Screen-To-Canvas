// TODO add add/remove observer
export class MutationObserverHandler {
    constructor(config, elements, ...callbacks) {
        this.callbacks = callbacks;
        this.config = config;
        this.elements = elements;
        this.observers = [];
    }

    startObserving() {
        console.log("Start observing");
        this.elements.forEach(element => {
            const observer = new MutationObserver(this.handleMutations.bind(this));
            observer.observe(element, this.config);
            this.observers.push(observer);
        });
    }

    stopObserving() {
        console.log("Stop observing");
        this.observers.forEach(observer => observer.disconnect());
        this.observers = [];
    }

    handleMutations(mutationsList, observer) {
        //console.log("Handling mutations");
        this.callbacks.forEach(callback => {
            if (typeof callback === 'function') {
                callback(mutationsList, observer);
            }
        });
    }
}
