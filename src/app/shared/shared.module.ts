import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialsModule } from './../materials/materials.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StatePipe } from './state.pipe';

@NgModule({
  imports: [
    CommonModule,
    MaterialsModule,
    FlexLayoutModule,
    FormsModule
  ],
  exports: [
    MaterialsModule,
    FlexLayoutModule,
    FormsModule,
    StatePipe
  ],
  declarations: [StatePipe]
})
export class SharedModule { }
