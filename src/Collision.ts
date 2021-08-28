// Imports.
import { Brick } from "./sprites/Brick";
import { Paddle } from "./sprites/Paddle";
import { Ball } from "./sprites/Ball";
import { CanvasView } from "./view/CanvasView";

// Class.
export class Collision {
    /**
     * Check ball collision with various parts of the game.
     * @param ball The Ball object to check collision with.
     * @param paddle The paddle object.
     * @param view The CanvasView object of the game.
     */
    checkBallCollision(ball: Ball, paddle: Paddle, view: CanvasView): void {
        // Check collision with paddle.
        if (
            ball.pos.x + ball.width > paddle.pos.x &&
            ball.pos.x < paddle.pos.x + paddle.width &&
            ball.pos.y + ball.height === paddle.pos.y
        ) {
            ball.changeYDirection();
        }

        // Check collision with walls.
        // Ball X movement.
        if (
            ball.pos.x > view.canvas.width - ball.width ||
            ball.pos.x < 0
        ) {
            ball.changeXDirection();
        }
        // Ball Y movement.
        if (ball.pos.y < 0) {
            ball.changeYDirection();
        }
    }

    /**
     * Check if a Ball is touching a specific brick.
     * @param ball The Ball object to check with.
     * @param brick The Brick object to check on.
     * @returns A boolean value of whether a collision occurred.
     */
    isBallCollided(ball: Ball, brick: Brick): boolean {
        if (
            ball.pos.x < brick.pos.x + brick.width &&
            ball.pos.x + ball.width > brick.pos.x &&
            ball.pos.y < brick.pos.y + brick.height &&
            ball.pos.y + ball.height > brick.pos.y
        ) {
            return true;
        }
        return false;
    }

    /**
     * Check if a Ball is touching any brick.
     * @param ball The Ball object to check with.
     * @param bricks An array of Brick objects present in the game.
     * @returns A boolean value of whether a collision occurred.
     */
    isCollidingBricks(ball: Ball, bricks: Brick[]): boolean {
        let colliding = false;
        bricks.forEach((br, i) => {
            if (this.isBallCollided(ball, br)) {
                ball.changeYDirection();
                if (br.energy === 1) {
                    bricks.splice(i, 1);
                } else {
                    br.energy--;
                }
                colliding = true;
            }
        });
        return colliding;
    }
}