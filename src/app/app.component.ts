import { Component } from '@angular/core';
import { FileUploadService } from './file-upload.service';
import { HttpEventType } from '@angular/common/http';

 @Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  selectedFile: File | null = null;
  uploadProgress: number = 0;
  message: string = '';
  fileType: string = '';

  constructor(private fileUploadService: FileUploadService) { }

  onFileSelected(event: any, type: string) {
    const file: File = event.target.files[0];
    if (!file) return;

    // Basic file type validation
    if ((type === 'pdf' && file.type !== 'application/pdf') ||
      (type === 'image' && !['image/png', 'image/jpeg'].includes(file.type)) ||
      (type === 'excel' && !['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'].includes(file.type))) {
      this.message = `Invalid ${type.toUpperCase()} file selected.`;
      this.selectedFile = null;
      return;
    }

    this.selectedFile = file;
    this.fileType = type;
    this.message = '';
  }

  onUpload() {
    if (!this.selectedFile) return;

    let uploadObs;

    if (this.fileType === 'pdf') {
      uploadObs = this.fileUploadService.uploadPdf(this.selectedFile);
    } else if (this.fileType === 'image') {
      uploadObs = this.fileUploadService.uploadImage(this.selectedFile);
    } else if (this.fileType === 'excel') {
      uploadObs = this.fileUploadService.uploadExcel(this.selectedFile);
    } else {
      this.message = 'Unknown file type';
      return;
    }

    uploadObs.subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress && event.total) {
          this.uploadProgress = Math.round(100 * event.loaded / event.total);
        } else if (event.type === HttpEventType.Response) {
          this.message = `${this.fileType.toUpperCase()} uploaded successfully!`;
          this.uploadProgress = 0;
          this.selectedFile = null;
        }
      },
      error => {
        console.error(error);
        this.message = 'Upload failed!';
        this.uploadProgress = 0;
      }
    );
  }
}

