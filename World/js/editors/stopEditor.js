class StopEditor {
    constructor(viewport, world) {
        this.viewport=viewport;
        this.world=world;

        this.canvas = viewport.canvas;
        this.ctx = this.canvas.getContext("2d");

        this.intent= null;
        this.mouse = null;
    }
    enable() {
        this.#addEventListeners();
    }

    disable() {
        this.#removeEventListeners();
        
    }

    #addEventListeners() {
        this.boundMouseDown=this.#handleMouseDown.bind(this);
        this.boundMouseMove=this.#handleMouseMove.bind(this);
        this.boundContextMenu = (evt) => evt.preventDefault()
        this.canvas.addEventListener("mousedown", this.boundMouseDown);
        this.canvas.addEventListener("mousemove", this.boundMouseMove);
        this.canvas.addEventListener("contextmenu", this.boundContextMenu);
        
    }
    #removeEventListeners() {
        this.canvas.removeEventListener("mousedown", this.boundMouseDown);
        this.canvas.removeEventListener("mousemove", this.boundMouseMove);
        this.canvas.removeEventListener("contextmenu", this.boundContextMenu);
        
    }
    #handleMouseMove(evt) {
        this.mouse = this.viewport.getMouse(evt);
        const seg = getNearestSegment(
            this.mouse, 
            this.world.graph.segments,
            10 * this.viewport.zoom
            );
            if (seg) {
                const proj = seg.projectPoint(this.mouse);
                if (proj.offset >= 0 && proj.offset <=1){
                    this.intent=proj.point;
                } else{
                    this.intent=null;
                }

            } else{
                this.intent=null;
            }

    }
    #handleMouseDown(evt) {

    }
    display() {
        if (this.intent) {
            this.intent.draw(this.ctx);
        }
    }
}