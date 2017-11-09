# angular-ionic-unzip

Provides a simple wrapper using JSZip to unzip a file and save to the local filesystem using ionic-native's File

##Install

```$shell
npm install angular-ionic-unzip
```

Add jsZip include to your index.html placing in the assets folder.

```<script src="assets/jszip.min.js"></script>```

http://github.com/Stuk/jszip/

##Usage

Add IonicUnzip to your app module providers 

```typescript
@NgModule({
    providers:[IonicUnzip]
});
```

Import it to your class

```typescript
export class Catalog {

    constructor(private unzipService:IonicUnzip) {
        
        this.unzipService.unzip({
           targetDir: '/images',
           fileName: 'images.zip,     
        }).then(() => {
            //unzip complete
        }).catch((e) => {
            //unzipping failed
            console.log(e);
        });
    
    }
```
This expects the zip file to already be downloaded on the local file system in the dataDirectory.


<table class="table param-table" style="margin:0;">
  <thead>
  <tr>
    <th>Param</th>
    <th>Type</th>
    <th>Details</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>
      dataDir</td>
    <td>
      <code>string</code>
    </td>
    <td>
      <p>Base FileSystem. Please refer to the iOS and Android filesystems https://ionicframework.com/docs/native/file/ by default it's set to dataDirectory</p>
</td>
  </tr>
  
  <tr>
    <td>
      targetDir</td>
    <td>
      <code>string</code>
    </td>
    <td>
      <p>Target extraction directory</p>
</td>
  </tr>
  
  <tr>
    <td>
      fileName</td>
    <td>
      <code>string</code>
    </td>
    <td>
      <p>Name of the zip file</p>
</td>
  </tr>
  <tr>
      <td>
        overwrite</td>
      <td>
        <code>boolean</code>
      </td>
      <td>
        <p>Overwrite existing folders and files</p>
  </td>
    </tr>
      <tr>
          <td>
            verbose</td>
          <td>
            <code>boolean</code>
          </td>
          <td>
            <p>Log file creation output to the console</p>
      </td>
        </tr>
  </tbody>
</table>