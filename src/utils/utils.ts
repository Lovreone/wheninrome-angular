import { LOADER_TIME } from './enum';

/** Disables insertion of forbidden characters  
 *  Usage example: <input type="number" (keydown)="blockForbiddenChars($event)"/>
 */
export function blockForbiddenChars(
    event: KeyboardEvent
): void {
    if (['e', 'E', '+', '-'].includes(event.key)) {
        event.preventDefault();
    }
}

/** Mock timeout for Loader gif tests (multiple pages) 
 *  TODO: Remove before deploying the application
*/
export function mockResDelay(
    fn: Function, 
    delayMs = LOADER_TIME
): void {
    setTimeout(fn, delayMs);
}

/* Helper interface for Select box options */
export interface SelectOption {
    id: string;
    value: string
}
