export class URLSearchParamHandler {
  constructor(private searchParams: URLSearchParams) {
    this.searchParams = new URLSearchParams(searchParams);
  }

  delete(name: string) {
    this.searchParams.delete(name);
    return this;
  }

  set(name: string, value: string) {
    this.searchParams.set(name, value);
    return this;
  }

  getParam(name: string) {
    return this.searchParams.get(name);
  }

  getParams() {
    return this.searchParams;
  }

  sort() {
    this.searchParams.sort();
  }
}
