import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType, HttpClientModule  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private baseUrl = 'https://localhost:7098/api'; // ASP.NET Core API root

  constructor(private http: HttpClient) {}

  uploadPdf(file: File): Observable<HttpEvent<any>> {
    return this.uploadFile(file, 'pdf');
  }

  uploadImage(file: File): Observable<HttpEvent<any>> {
    return this.uploadFile(file, 'image');
  }

  uploadExcel(file: File): Observable<HttpEvent<any>> {
    return this.uploadFile(file, 'excel');
  }

  private uploadFile(file: File, folder: string): Observable<HttpEvent<any>> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(`${this.baseUrl}/${folder}/upload`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }
}
