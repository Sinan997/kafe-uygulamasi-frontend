import { NgModule } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@NgModule({
  exports:[CardModule,InputTextModule,ButtonModule],
  imports:[],
})

export class PrimeModule { }