/**
 * Clip slots for the home reel. Leave a slot undefined to show the
 * code-generated footage; set it to a file under /public/reel to play a real clip.
 *
 * Clips are from Pexels (Pexels License, no attribution required):
 * - hero-build.mp4  "Close up of a Computer Screen with Javascript Code" by Raddy  pexels.com/video/11274341
 * - hero-teach.mp4  "Time Lapse Video of a Conference Hall in a School" by Mike Sangma  pexels.com/video/3977640
 * - end.mp4         "Close Up of a CPU" by MrColo  pexels.com/video/7140928
 */
export const REEL_CLIPS: Record<string, string | undefined> = {
    heroBuild: '/reel/hero-build.mp4',
    heroTeach: '/reel/hero-teach.mp4',
    end: '/reel/end.mp4',
}
