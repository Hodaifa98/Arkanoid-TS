/// Imports.
import { Brick } from "../sprites/Brick";
import { Paddle } from "../sprites/Paddle";
import { Ball } from "../sprites/Ball";

export class CanvasView {
    public canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D | null;
    private scoreDisplay: HTMLObjectElement | null;
    private startBtn: HTMLObjectElement | null;
    private info: HTMLObjectElement | null;
    
    constructor(canvasName: string) {
        this.canvas = document.querySelector(canvasName) as HTMLCanvasElement;
        this.context = this.canvas.getContext('2d');
        this.scoreDisplay = document.querySelector('#score');
        this.startBtn = document.querySelector('#start');
        this.info = document.querySelector('#info');
    }

    /**
     * Clear the canvas board.
     */
    clear(): void {
        this.context?.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Initialize the start by attaching an event listener to the start button.
     * @param startFunction A function to attach to the start button.
     */
    initStartButton(startFunction: (view: CanvasView) => void): void {
        this.startBtn?.addEventListener('click', () => {
            startFunction(this)
        });
    }

    /**
     * Draw score on the display element.
     * @param score The score to draw.
     */
    drawScore(score: number): void {
        if (this.scoreDisplay) {
            this.scoreDisplay.innerHTML = score.toString();
        }
    }

    /**
     * Write information on the info display.
     * @param text The string to write.
     */
    drawInfo(text: string): void {
        if (this.info) {
            this.info.innerHTML = text;
        }
    }

    /**
     * Draw a sprite on the canvas.
     * @param sprite The sprite to draw.
     */
    drawSprite(sprite: Brick | Paddle | Ball): void {
        if (!sprite) {
            return;
        }
        this.context?.drawImage(
            sprite.image,
            sprite.pos.x,
            sprite.pos.y,
            sprite.width,
            sprite.height
        );
    }

    /**
     * Draw bricks on the screen.
     * @param bricks An array of Brick objects.
     */
    drawBricks(bricks: Brick[]): void {
        bricks.forEach(b => {
            this.drawSprite(b);
        });
    }
}