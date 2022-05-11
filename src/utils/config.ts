/* Url where NestJS server is running */
export const baseApiUrl = 'http://localhost:3000'

/** Mock timeout for Loader gif tests (multiple pages) 
 *  TODO: Remove before deploying the application
*/
export function mockResDelay(
    fn: Function
): void {
    setTimeout(fn, 300);
}
