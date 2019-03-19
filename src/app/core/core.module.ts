import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FeatureService } from '../services/feature/feature.service';
import { HttpService } from './http/http.service';
import { httpInterceptors } from './http/interceptors/http-interceptors';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [httpInterceptors, FeatureService, { provide: HttpClient, useClass: HttpService }]
})
export class CoreModule {}
