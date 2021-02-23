class Timer {
    #time = undefined;
    #cb = undefined;

    #counter = 1;
    #timeout = undefined;
    #interval = undefined;
    #done = false;
    #paused = false;
    #started = false;

    #common = (value) => {
        clearTimeout(this.#timeout);
        clearInterval(this.#interval);

        this.#interval = setInterval(() => {
            this.#counter++;
        }, 1 * 1000);

        this.#timeout = setTimeout(() => {
            this.#cb();
            clearTimeout(this.#timeout);
            clearInterval(this.#interval);
            this.#done = true;
            this.#counter = 0;
        }, value * 1000);
    };

    constructor (seconds = undefined, callback = undefined) {
        // if (seconds === undefined || callback === undefined) {
        //     throw new Error("Cannot leave constructor parameters empty");
        // }
        this.#time = seconds;
        this.#cb = callback;
    }

    start() {
        if (this.#time === undefined || this.#cb === undefined) {
            return undefined;
        }
        if (this.#started) {
            throw new Error("Timer was already started!");
        }

        const timer = this.#time - this.#counter;
        this.#common(timer);
        this.#started = true;
    }

    pause() {
        if (this.#time === undefined || this.#cb === undefined) {
            return undefined;
        }
        if (!this.#started || this.#paused) {
            throw new Error("Timer was not started!");
        }

        clearTimeout(this.#timeout);
        clearInterval(this.#interval);
        this.#paused = true;
    };

    continue() {
        if (this.#time === undefined || this.#cb === undefined) {
            return undefined;
        }
        if (!this.#started || !this.#paused) {
            throw new Error("Timer was either not started or not paused!");
        }

        const timer = this.#time - this.#counter;
        this.#common(timer);
        this.#paused = false;
    };

    isPaused() { return this.#paused };

    canPause() { return this.#started && !this.#paused };

    canContinue() { return this.#started && this.#paused };

    isDone() { return this.#done };
};

module.exports = Timer;