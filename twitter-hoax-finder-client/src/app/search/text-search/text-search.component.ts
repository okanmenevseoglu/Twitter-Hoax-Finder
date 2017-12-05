import {Component, OnInit} from '@angular/core';
import {SearchService} from "../shared/search.service";
import {FormGroup} from "@angular/forms";
import {FormBuilder} from "@angular/forms";
import {HoaxFinderSearchRequest} from "../shared/hoax-finder-search-request";
import {Tweet} from "../../shared/tweet.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-text-search',
  templateUrl: './text-search.component.html',
  styleUrls: ['../shared/css/search.component.css'],
  providers: [SearchService]
})
export class TextSearchComponent implements OnInit {

  hoaxFinderSearchForm: FormGroup;

  resultTweets: Tweet[];

  verified: boolean = false;

  constructor(private searchService: SearchService, private formBuilder: FormBuilder, private route: Router) {
    this.hoaxFinderSearchForm = this.formBuilder.group({
      query: [''],
      screenName: null,
      lang: "en"
    });
  }

  ngOnInit() {
  }


  doSearchForTweets() {
    let hoaxFinderSearchRequest = new HoaxFinderSearchRequest();

    hoaxFinderSearchRequest._query = this.hoaxFinderSearchForm.value["query"];
    hoaxFinderSearchRequest._screenName = this.hoaxFinderSearchForm.value["screenName"];
    hoaxFinderSearchRequest._lang = this.hoaxFinderSearchForm.value["lang"];

    if (hoaxFinderSearchRequest._screenName) {
      this.searchService.searchTextByMember(hoaxFinderSearchRequest).subscribe(tweets => {
        this.resultTweets = tweets;
      }, (error) => console.log(error))
    } else {
      this.searchService.searchText(hoaxFinderSearchRequest).subscribe(tweets => {
        this.resultTweets = tweets;
      }, (error) => console.log(error))
    }
  }
}
