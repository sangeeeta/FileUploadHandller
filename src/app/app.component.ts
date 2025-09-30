import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Uploads';

  selectedFiles: { [key: string]: string | null } = {
    image: null,
    pdf: null,
    excel: null
  };

  onFileSelected(event: any, type: string) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFiles[type] = file.name;
    }
  }

  removeFile(type: string) {
    this.selectedFiles[type] = null;
  }
  
}
