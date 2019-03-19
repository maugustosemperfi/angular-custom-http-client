export function HttpService(url: string) {
  return function<TFunction extends Function>(Target: TFunction): TFunction {
    Target.prototype.getHttpClient = function() {
      console.log(Target, this);
      // tslint:disable-next-line: whitespace
      return this.httpClient.setUrl(url);
    };
    return Target;
  };
}
