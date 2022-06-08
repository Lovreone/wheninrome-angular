
/* Angulars Validators.email allows a@b, while we need a@b.c */
export const EMAIL_REGEX = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

export const URL_REGEX = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

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

/** Creates a simple date string 'dd-mm-yyyy' from a passed Date
 *  <input type="date"> requires this format to display the date
 */
export function getSimpleDateString(date: Date): string {
    const mm = (date.getMonth() + 1).toString();
    const dd = date.getDate().toString();
    return [ 
      date.getFullYear(), 
      mm.length === 2 ? '' + mm : '0' + mm,
      dd.length === 2 ? '' + dd : '0' + dd 
    ].join('-');
}

/* Helper interface for Select box options */
export interface SelectOption {
    id: string;
    value: string
}
