import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialsModule } from './../materials/materials.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
    FormsModule
  ]
})
export class SharedModule { }
