import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import "rxjs/Rx";
import {HoaxFinderSearchRequest} from "./search-request";
import {Tweet} from "../../shared/tweet.model";
import {ApiRoute} from "../../shared/config/api-route";

@Injectable()
export class SearchService {

  constructor(private httpClient: HttpClient) {
  }

  healthCheck(): Observable<string> {
    return this.httpClient.get(ApiRoute.getHealthCheckURL())
      .map(res => <string> res);
  }

  searchText(hoaxFinderSearchRequest: HoaxFinderSearchRequest): Observable<Tweet[]> {
    return this.httpClient.post(ApiRoute.getSearchTextURL(), hoaxFinderSearchRequest)
      .map(res => <Tweet[]> res);
  }

  searchTextByMember(hoaxFinderSearchRequest: HoaxFinderSearchRequest): Observable<Tweet[]> {
    return this.httpClient.post(ApiRoute.getSearchTextByMemberURL(), hoaxFinderSearchRequest)
      .map(res => <Tweet[]> res);
  }

  searchImage(formData: FormData): Observable<Tweet[]> {
    let headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    return this.httpClient.post(ApiRoute.getSearchImageURL(), formData, {headers: headers})
      .map(res => <Tweet[]> res);
  }
}
