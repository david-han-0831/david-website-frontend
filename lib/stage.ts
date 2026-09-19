/**
 * Shared, non-reactive state between the DOM and the WebGL stage.
 * Both sides read and write it inside their own frame loops, so it stays out of React.
 */
export const stage = {
    /** Colour currently flooding the page, mirrored into the glass so it refracts the right backdrop */
    bg: '#f6f4ef',
    /** Hand tracking input from the Live Lab, normalised 0..1 in camera space */
    hand: { active: false, x: 0.5, y: 0.5, pinch: 0 },
}
