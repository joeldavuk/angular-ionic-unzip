import {File} from "@ionic-native/file";


export class IonicUnzipOptions {

    constructor(private fs:File) {}

    targetDir:string = '';
    dataDirectory:string = '';
    fileName:string = '';
    overwrite:boolean = true;
    verbose:boolean = false;

    /**
     * Optionally override local file system directory
     * @returns {string}
     */
    dataDir() {
        return this.dataDirectory || this.fs.dataDirectory;
    }

}