import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
// import { environment } from '../../environments/environment';
// import { AuthService } from './auth.service';
 
@Injectable()
export class UploadFileService {
  httpOptions = {
    withCredentials: true,
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'X-API-KEY': 'insert_api_key_here'
    })
  }
  FOLDER = 'americanpattern/';
  // docsUrl: string = environment.apiUrl+'?documents';
  // addUpdateUrl: string = this.docsUrl+'&addUpdate';
  // deleteUrl: string = this.docsUrl+'&delete';
  // singleUrl: string = this.docsUrl+'&single';
  // url: string;
  documents: any[];

  constructor(
    private http: HttpClient
    //,private auth: AuthService
  ) { }

  serveDocument(document: any, swapOutNull: boolean = false) {
    if(this.documents != null) {
      if(swapOutNull) {
        let i=0;
        this.documents.forEach(row => {
          if(row.id === null) {
            this.documents.splice(i,1,document);
          }
          i++;
        });
      } else {
        this.documents.unshift(document);
      }
    }
  }
  private getS3Bucket(): any {
    const bucket = new S3(
      //this.auth.session.bucket
      {
        accessKeyId: 'YOUR_ACCESS_KEY_ID',
        secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
        region: 'us-east-1'
      }
    );
    return bucket;
  }
  uploadfile(file,folder,filenameOverwrite:string=null) {
    //console.log('overwrite received:', filenameOverwrite);
    var filename = filenameOverwrite != null ? filenameOverwrite : file.name;
    const params = {
      Bucket: 'trackercast-uploads',
      Key: this.FOLDER + folder + '/' + filename,
      Body: file
    };
    //console.log('parameters a:',params);
    return this.getS3Bucket().upload(params, function (err, data) {
      //console.log('parameters b:',params);
      if (err) {
        console.log('There was an error uploading your file: ', err);
        return false;
      }
 
      //console.log('Successfully uploaded file.', data);
      return true;
    });
  }
  deleteFile(filename,folder) {
    const params = {
      Bucket: 'trackercast-uploads',
      Key: this.FOLDER + folder + '/' + filename
    };
    this.getS3Bucket().deleteObject(params, function(err, data) {
      if(err) {
        console.log(err, err.stack);
        return false;
      } else {
        //console.log(data);
        return true;
      }
    });
  }
  getFiles() {
    const params = {
      Bucket: 'trackercast-uploads',
      Prefix: this.FOLDER
    }
    this.getS3Bucket().listObjects(params, function (err, data) {
      if (err) {
        console.log('There was an error getting your files: ' + err);
        return;
      }
     
      console.log(data.Contents);
    });
  }
  getFileUrl(filename,jobnumber) {
    let jobfolder = (jobnumber != null && jobnumber != "") ? jobnumber + "/" : "";
    const params = {
      Bucket: 'trackercast-uploads',
      Key: this.FOLDER + jobfolder + filename
    };
    return this.getS3Bucket().getSignedUrl('getObject', params);
  }
  fileObjectExists(filename,jobnumber) {
    let jobfolder = (jobnumber != null && jobnumber != "") ? jobnumber + "/" : "";
    const params = {
      Bucket: 'trackercast-uploads',
      Key: this.FOLDER + jobfolder + filename
    };
    return this.getS3Bucket().getObject(params, function(err, data) {
      if (err != null) {
        console.log("Failed to retrieve an object: " + err);
        return false;
      } else {
        return true;
      }
    });
  }
}