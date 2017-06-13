
import { Component, EventEmitter, Output, Input } from '@angular/core';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes } from 'ngx-uploader';
 
@Component({
  selector: 'image-upload',
  templateUrl: 'album-image.component.html'
})


export class AlbumImageComponent {

  @Input() getCoverID: any;
  @Output() CoverIDChange = new EventEmitter<any>();

  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;
 
  constructor() {
    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;
  }

  setCoverID(CoverID:string){
    this.getCoverID=CoverID;
    this.CoverIDChange.emit(CoverID);
  }
 
  onUploadOutput(output: UploadOutput): void {
    console.log(output); // lets output to see what's going on in the console
 
    if (output.type === 'allAddedToQueue') { // when all files added in queue
      // uncomment this if you want to auto upload files when added
      // const event: UploadInput = {
      //   type: 'uploadAll',
      //   url: '/upload',
      //   method: 'POST',
      //   data: { foo: 'bar' },
      //   concurrency: 0
      // };
      // this.uploadInput.emit(event);
    } else if (output.type === 'addedToQueue') {
      this.files.push(output.file); // add file to array when added
    } else if (output.type === 'uploading') {
      // update current data in files array for uploading file
      const index = this.files.findIndex(file => file.id === output.file.id);
      this.files[index] = output.file;
    } else if (output.type === 'removed') {
      // remove file from array when removed
      this.files = this.files.filter((file: UploadFile) => file !== output.file);
    } else if (output.type === 'dragOver') { // drag over event
      this.dragOver = true;
    } else if (output.type === 'dragOut') { // drag out event
      this.dragOver = false;
    } else if (output.type === 'drop') { // on drop event
      this.dragOver = false;
    } else if (output.type === 'done') { // on drop event
      this.setCoverID(this.files[0].response[0].filename);
    }
  }
 
  startUpload(): void {  // manually start uploading

    const event: UploadInput = {
      type: 'uploadFile',
      url: '/api/images',
      method: 'POST',
      data: { foo: 'bar' },
      file: this.files[0],
      concurrency: 1 // set sequential uploading of files with concurrency 1
    }
 
    this.uploadInput.emit(event);
    
  }
 
  cancelUpload(id: string): void {
    this.uploadInput.emit({ type: 'cancel', id: id });
  }
}