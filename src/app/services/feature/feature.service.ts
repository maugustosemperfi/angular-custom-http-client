import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../httt-serivce.decorator';

@Injectable()
@HttpService('custom-controller')
export class FeatureService {

  constructor(private httpClient: HttpClient) {}

  getSomething() {
    console.log(this.getHttpClient());
    this.getHttpClient()
      .get('dsa')
      .subscribe();
  }

  private getHttpClient(): HttpClient {
    return;
  }
}
