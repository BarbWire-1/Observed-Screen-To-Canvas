export class MutationObserverHandler {
     constructor(config, ...callbacks) {
          this.callbacks = callbacks;
          this.config = config;
          this.observer = new MutationObserver(this.handleMutations.bind(this));
     }

    startObserving() {
         console.log("start observing")
          this.observer.observe(document.body, this.config);
     }

    handleMutations(mutationsList, observer) {
         ('handling mutation')
          this.callbacks.forEach(callback => {
               if (typeof callback === 'function') {
                    callback(mutationsList, observer);
               }
          });
     }
}