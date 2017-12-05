import {Component, OnInit} from '@angular/core';
import {ViewChild} from "@angular/core";
import {ElementRef} from "@angular/core";
import {SearchService} from "../shared/search.service";
import {Message} from "primeng/primeng";
import {Tweet} from "../../shared/tweet.model";

@Component({
  selector: 'app-image-search',
  templateUrl: './image-search.component.html',
  styleUrls: ['../shared/css/search.component.css'],
  providers: [SearchService]
})
export class ImageSearchComponent implements OnInit {

  msgs: Message[];

  @ViewChild('fileInput') fileInput: ElementRef;

  resultTweets: Tweet[];

  constructor(private searchService: SearchService) {
  }

  ngOnInit() {
  }

  upload() {
    let fileBrowser = this.fileInput.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      const formData = new FormData();
      formData.append("image", fileBrowser.files[0]);
      this.searchService.searchImage(formData).subscribe(tweets => {
        this.resultTweets = tweets;
      }, (error) => console.log(error));
    }
  }
}
