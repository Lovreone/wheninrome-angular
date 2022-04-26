/** Disables insertion of forbidden characters  
 *  Usage example: <input type="number" (keydown)="blockForbiddenChars($event)"/>
 */
export function blockForbiddenChars(event: KeyboardEvent): void {
    if (['e', 'E', '+', '-'].includes(event.key)) {
        event.preventDefault();
    }
}

/* Helper interface for Select box options */
export interface SelectOption {
    id: string;
    value: string
}
