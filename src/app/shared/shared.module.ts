import { CommonModule, CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule
	],
	providers: [DatePipe, CurrencyPipe, DecimalPipe],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {



}
