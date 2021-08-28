import { CanvasView } from "./view/CanvasView";
import { Ball } from "./sprites/Ball";
import { Brick } from "./sprites/Brick";
import { Paddle } from "./sprites/Paddle";
import { Collision } from "./collision";

// Images.
import PADDLE_IMAGE from './assets/images/paddle.png';
import BALL_IMAGE from './assets/images/ball.png';
import BRICK_IMAGE from './assets/images/brick.png';

// Level & colors.
import {
    PADDLE_SPEED,
    PADDLE_WIDTH,
    PADDLE_HEIGHT,
    PADDLE_STARTX,
    BALL_SPEED,
    BALL_SIZE,
    BALL_STARTX,
    BALL_STARTY
} from './setup';

// Helpers.
import { createBricks } from './helpers';

// Variables.
let gameOver = false;
let score = 0;

/**
 * Set the game to be over.
 * @param view The CanvasView object of the game.
 */
function setGameOver(view: CanvasView): void {
    view.drawInfo('Game Over!');
    gameOver = false;
}

/**
 * Set the game to won.
 * @param view The CanvasView object of the game.
 */
 function setGameWon(view: CanvasView): void {
    view.drawInfo('Game Won!');
    gameOver = false;
}

/**
 * Control the main game loop.
 * @param view 
 * @param bricks 
 * @param paddle 
 * @param ball 
 * @param collision
 */
function gameLoop(
    view: CanvasView,
    bricks: Brick[],
    paddle: Paddle,
    ball: Ball,
    collision: Collision
) {
    view.clear();
    view.drawBricks(bricks);
    view.drawSprite(paddle);
    view.drawSprite(ball);

    // Make sure the paddle doesn't exist the screen.
    if (
        (paddle.isMovingLeft && paddle.pos.x > 0) ||
        (paddle.isMovingRight && paddle.pos.x < view.canvas.width - paddle.width)
    ) {
        paddle.movePaddle();
    }

    // Move ball.
    ball.moveBall();

    // Detect collision.
    collision.checkBallCollision(ball, paddle, view);
    const collidingBrick = collision.isCollidingBricks(ball, bricks);
    if (collidingBrick) {
        score++;
        view.drawScore(score);
    }

    // Game over if ball exit screen.
    if (ball.pos.y > view.canvas.height) {
        gameOver = true;
        // Break the game loop.
        return setGameOver(view);
    }
    // If game won.
    if (bricks.length === 0) {
        // Clear canvas and redraw only the paddle and ball.
        view.clear();
        view.drawSprite(paddle);
        view.drawSprite(ball);
        return setGameWon(view);
    }

    // Loop the game.
    requestAnimationFrame(() => gameLoop(view, bricks, paddle, ball, collision));
}

/**
 * Start the game.
 * @param view The CanvasView object of the game.
 */
function startGame(view: CanvasView) {
    // Reset displays.
    score = 0;
    view.drawInfo('');
    view.drawScore(score);

    // Create collision instance.
    const collision = new Collision();

    // Create the paddle.
    const paddle = new Paddle(
        PADDLE_SPEED,
        PADDLE_WIDTH,
        PADDLE_HEIGHT,
        {
            x: PADDLE_STARTX, 
            y: view.canvas.height - PADDLE_HEIGHT - 5
        },
        PADDLE_IMAGE
    );

    // Create all bricks.
    const bricks = createBricks();
    const ball = new Ball(
        BALL_SIZE,
        {x: BALL_STARTX, y: BALL_STARTY},
        BALL_IMAGE,
        BALL_SPEED
    );
    gameLoop(view, bricks, paddle, ball, collision);

}


// Create a new view.
const view = new CanvasView('#playField');
view.initStartButton(startGame);
