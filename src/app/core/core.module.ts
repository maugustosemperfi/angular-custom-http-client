import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';
import { HttpService } from './http/http.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    { provide: HttpClient, useClass: HttpService }
  ]
})
export class CoreModule { }
