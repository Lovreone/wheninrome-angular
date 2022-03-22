import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    PageNotFoundComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ReactiveFormsModule,
    PageNotFoundComponent,
    HeaderComponent,
    FooterComponent,
  ]
})
export class SharedModule { }
