import {Component, OnInit} from '@angular/core';
import {SearchService} from "../shared/search.service";
import {FormGroup} from "@angular/forms";
import {FormBuilder} from "@angular/forms";
import {HoaxFinderSearchRequest} from "../shared/search-request";
import {Tweet} from "../../shared/tweet.model";
import {Message} from "primeng/primeng";
import {MessageService} from "primeng/components/common/messageservice";

@Component({
  selector: 'app-text-search',
  templateUrl: './text-search.component.html',
  styleUrls: ['../shared/css/search.component.css'],
  providers: [SearchService, MessageService]
})
export class TextSearchComponent implements OnInit {

  msgs: Message[] = [];

  hoaxFinderSearchForm: FormGroup;

  resultTweets: Tweet[];

  verified: boolean = false;

  tweetLang: string;

  constructor(private searchService: SearchService, private messageService: MessageService, private formBuilder: FormBuilder) {
    this.hoaxFinderSearchForm = this.formBuilder.group({
      query: [''],
      screenName: null,
      lang: ['']
    });
    this.tweetLang = null;
  }

  ngOnInit() {
    this.resultTweets = null;
    this.clear();
  }

  public doSearchForTweets(): void {
    let hoaxFinderSearchRequest = new HoaxFinderSearchRequest();

    hoaxFinderSearchRequest._query = this.hoaxFinderSearchForm.value["query"];
    hoaxFinderSearchRequest._screenName = this.hoaxFinderSearchForm.value["screenName"];
    hoaxFinderSearchRequest._lang = this.hoaxFinderSearchForm.value["lang"];

    if (hoaxFinderSearchRequest._screenName) {
      this.searchService.searchTextByMember(hoaxFinderSearchRequest).subscribe(tweets => {
        this.resultTweets = tweets;
      }, (error) => {
        this.clear();
        this.msgs.push({severity: 'error', summary: 'Error Message', detail: error.message});
      })
    } else {
      this.searchService.searchText(hoaxFinderSearchRequest).subscribe(tweets => {
        this.resultTweets = tweets;
      }, (error) => {
        this.clear();
        this.msgs.push({severity: 'error', summary: 'Error Message', detail: error.message});
      })
    }
  }

  public load(): void {
    location.reload();
  }

  private clear(): void {
    this.msgs = [];
  }
}
