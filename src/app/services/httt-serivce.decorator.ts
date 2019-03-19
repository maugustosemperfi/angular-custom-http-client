export function HttpService(url: string) {
  return function<TFunction extends Function>(Target: TFunction): TFunction {
    Target.prototype.getHttpClient = function() {
      return this.httpClient.setControllerUrl(url);
    };
    return Target;
  };
}
