class Viewport{
    constructor(canvas){
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.zoom = 1;

        this.#addEventListeners();
        
    }

    #addEventListeners() {
        this.canvas.addEventListener("mousewheel", this.#handleMouseWheel.bind(this));
    }

    #handleMouseWheel(evt) {
        const dir = Math.sign(evt.deltaY);
        this.zoom += dir;
        console.log(evt.zoom)
    }
}