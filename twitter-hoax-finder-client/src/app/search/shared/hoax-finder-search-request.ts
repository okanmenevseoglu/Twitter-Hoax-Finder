export class HoaxFinderSearchRequest {

  private query: string;

  private lang: string;

  private screenName: string;

  private until: string;


  get _query(): string {
    return this.query;
  }

  set _query(value: string) {
    this.query = value;
  }

  get _lang(): string {
    return this.lang;
  }

  set _lang(value: string) {
    this.lang = value;
  }

  get _screenName(): string {
    return this.screenName;
  }

  set _screenName(value: string) {
    this.screenName = value;
  }

  get _until(): string {
    return this.until;
  }

  set _until(value: string) {
    this.until = value;
  }
}
