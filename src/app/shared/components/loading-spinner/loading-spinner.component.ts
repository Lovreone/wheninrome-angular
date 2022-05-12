import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  template: `<div class="align-center"><div class="lds-default"><div></div><div></div><div></div><div></div><div>
  </div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>`,
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent { }
// Pure CSS Loader https://loading.io/css/
