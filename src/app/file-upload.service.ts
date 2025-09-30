import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private baseUrl = 'https://localhost:7098/api'; // ASP.NET Core API root

  constructor(private http: HttpClient) {}

  uploadPdf(file: File): Observable<HttpEvent<any>> {
    return this.uploadFile(file, 'pdf', 'uploadPdf');
  }

  uploadImage(file: File): Observable<HttpEvent<any>> {
    return this.uploadFile(file, 'Image', 'uploadImage');
  }

  uploadExcel(file: File): Observable<HttpEvent<any>> {
    return this.uploadFile(file, 'excel', 'uploadExcel');
  }

  private uploadFile(file: File, folder: string, action: string): Observable<HttpEvent<any>> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(`${this.baseUrl}/${folder}/${action}`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }
}
