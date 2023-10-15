import { NgModule } from '@angular/core';
import { PrimeModules } from './prime-modules.module';

@NgModule({
  imports: [PrimeModules],
  exports: [PrimeModules]
})
export class SharedModule {}
