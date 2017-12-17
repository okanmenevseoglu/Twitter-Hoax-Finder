import {Component, OnInit} from '@angular/core';
import {ViewChild} from "@angular/core";
import {ElementRef} from "@angular/core";
import {SearchService} from "../shared/search.service";
import {Message} from "primeng/primeng";
import {Tweet} from "../../shared/tweet.model";
import {UploadFile} from "ngx-file-drop";
import {UploadEvent} from "ngx-file-drop";

@Component({
  selector: 'app-image-search',
  templateUrl: './image-search.component.html',
  styleUrls: ['../shared/css/search.component.css'],
  providers: [SearchService]
})
export class ImageSearchComponent implements OnInit {

  uploadMessage: string;

  msgs: Message[];

  resultTweets: Tweet[];

  @ViewChild('fileInput') fileInput: ElementRef;

  public files: UploadFile[];

  formData: FormData;

  lang: string = 'EN';

  constructor(private searchService: SearchService) {
  }

  ngOnInit() {
    this.uploadMessage = 'Please choose or drop an image file to upload';
    this.files = [];
    this.msgs = [];
    this.formData = new FormData;
  }

  public dropEvent(event: UploadEvent): void {
    this.files = event.files;
    if (this.files.length > 1) {
      this.msgs = [];
      this.msgs.push({severity: 'error', summary: 'Error Message', detail: "Please choose only one image file."});
    } else {
      let fileEntry = event.files[0].fileEntry;
      if (fileEntry) {
        fileEntry.file(data => {
          this.formData.append("image", data);
        });
        this.uploadMessage = fileEntry.name;
      }
    }
  }

  public fileChangeEvent(): void {
    this.formData = new FormData;
    let fileBrowser = this.fileInput.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      this.formData.append("image", fileBrowser.files[0]);
      this.uploadMessage = fileBrowser.files[0].name;
    }
  }

  public search(): void {
    this.searchService.searchImage(this.formData, this.lang).subscribe(tweets => {
      this.resultTweets = tweets;
    }, (error) => this.msgs.push({severity: 'error', summary: 'Error Message', detail: error.message}));
  }

  public load(): void {
    location.reload();
  }
}
