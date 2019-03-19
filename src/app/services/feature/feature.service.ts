import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../httt-serivce.decorator';

@Injectable()
@HttpService('my-custom-controller')
export class FeatureService {

  constructor(private httpClient: HttpClient) {}

  getSomething() {
    this.getHttpClient()
      .get('custom-endpoint')
      .subscribe();
  }

  private getHttpClient(): HttpClient {
    return;
  }
}
