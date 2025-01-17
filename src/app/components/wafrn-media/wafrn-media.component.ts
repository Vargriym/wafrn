import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { WafrnMedia } from 'src/app/interfaces/wafrn-media';
import { MediaService } from 'src/app/services/media.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-wafrn-media',
  templateUrl: './wafrn-media.component.html',
  styleUrls: ['./wafrn-media.component.scss']
})
export class WafrnMediaComponent implements OnInit {


  @Input() id!: string;
  nsfw = true;
  adultContent = true;
  data!: WafrnMedia;
  displayUrl: string = '';
  disableNSFWFilter = true;
  @ViewChild('wafrnMedia') wafrnMedia: any;
  video = false;
  ready = false;
  viewLongImage = false;


  
  constructor(
    private mediaService: MediaService,
    private messagesService: MessageService,
  ) {
    this.disableNSFWFilter = mediaService.checkNSFWFilterDisabled();
   }

  ngOnInit(): void {

    this.data = this.mediaService.getMediaById(this.id);
    this.nsfw = this.data.adultContent ? true : this.data.NSFW && ! this.disableNSFWFilter;
    this.adultContent = this.data.adultContent;
    this.displayUrl = this.nsfw ? '/assets/img/nsfw_image.webp' : this.data.url;
    this.video = !this.nsfw && this.checkIfVideo();
    this.ready = true;

  }

  showPicture(){
    if(!(this.adultContent && !this.mediaService.checkAge())) {
      this.nsfw = false;
      this.adultContent = false;
      this.displayUrl = this.data.url;
      this.viewLongImage = true;
      this.video = this.checkIfVideo();
    } else {
      this.messagesService.add({
        severity: 'warn',
        detail: 'This image has been flagged as adult content and you are a minor, or you are not logged in'
      })
    }
    

  }


  imgLoaded() {
    if(!this.viewLongImage && this.wafrnMedia.nativeElement.offsetHeight/this.wafrnMedia.nativeElement.offsetWidth > 3) {
      this.displayUrl = this.nsfw ? '/assets/img/nsfw_image.webp' : '/assets/img/long_image.jpg'
    }
  }

  private checkIfVideo(){
    let mediaUrl = this.displayUrl.split('.');

    return mediaUrl[mediaUrl.length -1].toLowerCase() == 'mp4';
  }

}
