export class ApiRoute {

  private static baseEndPoint: string = 'http://localhost:8080/';

  static getHealthCheckURL(): string {
    return this.baseEndPoint;
  }

  static getSearchTextURL(): string {
    return this.baseEndPoint + 'search/text';
  }

  static getSearchTextByMemberURL(): string {
    return this.baseEndPoint + 'search/text/by-member';
  }


  public static getSearchImageURL(lang: string): string {
    return this.baseEndPoint + 'search/image/' + lang;
  }
}
