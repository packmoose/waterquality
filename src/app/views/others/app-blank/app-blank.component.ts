import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { AuthGuard } from '../../../shared/services/auth/auth.guard'; //first draft
import { UploadFileService } from '../../../shared/services/upload-file.service'; //first draft

@Component({
  selector: 'app-blank',
  templateUrl: './app-blank.component.html',
  styleUrls: ['./app-blank.component.css']
})
export class AppBlankComponent implements OnInit {

  //Properties
  selectedFiles: FileList; //first draft addition
  @ViewChild('fileSelectionInput') fileSelectionInput?: ElementRef; //first draft addition

  constructor(
    private auth: AuthGuard,
    private uploadService: UploadFileService
  ) { } //first draft (originally no dependency injection)

  ngOnInit() {
  }

  upload(folder) { //first draft addition
    const file = this.selectedFiles.item(0);
    //var overwrite = this.useNewFileName ? this.currentDocument.filename : null;
    //console.log('overwrite passed:',overwrite);
    return this.uploadService.uploadfile(file,folder);
  }
}
