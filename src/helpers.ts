/// Imports.
import { Brick } from "./sprites/Brick";
import {
    BRICK_IMAGES,
    LEVEL,
    STAGE_COLS,
    STAGE_PADDING,
    BRICK_WIDTH,
    BRICK_HEIGHT,
    BRICK_PADDING,
    BRICK_ENERGY
} from './setup';


export function createBricks(): Brick[] {
    return LEVEL.reduce((accumulator, element, i) => {
        // i+1 since we start with 0.
        // Get current row of this specific brick.
        const row = Math.floor((i+1) / STAGE_COLS);
        const col = i % STAGE_COLS;

        // Calculate the position of the brick depending on its info.
        const x = STAGE_PADDING + col * (BRICK_WIDTH + BRICK_PADDING);
        const y = STAGE_PADDING + row * (BRICK_HEIGHT + BRICK_PADDING);

        // If Brick is 0, return the accumulator (old values) since we don't need to do anything.
        if (element === 0) {
            return accumulator;
        }

        // Return an array of the bricks with their new properties.
        return [
            ...accumulator, 
            new Brick(
                BRICK_WIDTH,
                BRICK_HEIGHT,
                {x, y},
                BRICK_ENERGY[element],
                BRICK_IMAGES[element]
            )
        ];
    }, [] as Brick[]);
}