import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';
import { HttpService } from './http/http.service';
import { httpInterceptors } from './http/interceptors/http-interceptors';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [httpInterceptors, { provide: HttpClient, useClass: HttpService }]
})
export class CoreModule {}
