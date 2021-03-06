import { Vector } from '../types';

export class Ball {
    private ballImage: HTMLImageElement = new Image();
    private speed: Vector;

    constructor(
        private ballSize: number,
        private position: Vector,
        image: string,
        speed: number
    ) {
        this.ballSize = ballSize;
        this.position = position;
        // -speed so that the ball goes up initially.
        this.speed = {x: speed, y: -speed};
        this.ballImage.src = image;
    }

    // Getters.
    get width(): number { return this.ballSize; }
    get height(): number { return this.ballSize; }
    get pos(): Vector { return this.position; }
    get image(): HTMLImageElement { return this.ballImage; }


    /**
     * Change the Y direction of the ball.
     */
    changeYDirection(): void {
        this.speed.y = -this.speed.y;
    }

    /**
     * Change the X direction of the ball.
     */
    changeXDirection(): void {
        this.speed.x = -this.speed.x;
    }

    /**
     * Move the ball in its appropriate direction.
     */
    moveBall(): void {
        this.pos.x += this.speed.x;
        this.pos.y += this.speed.y;
    }
}