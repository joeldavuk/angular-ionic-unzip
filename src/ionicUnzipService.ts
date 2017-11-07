import {Injectable} from '@angular/core';
import {File} from "@ionic-native/file";
import {IonicUnzipOptions} from "./ionicUnzipOption";

declare var JSZip:any;

@Injectable()
export class IonicUnzipService {

    constructor(private fs:File) {}

    /**
     * Unzip a file
     * @param {IonicUnzipOptions} options
     * @returns {Promise<any>}
     */
    unzip(options:IonicUnzipOptions): Promise<any> {

        return this.fs.createDir(options.dataDir(),options.targetDir,options.overwrite).then(() => {

            this.fs.readAsArrayBuffer(options.dataDir(),options.fileName).then((ab) => {
                let new_zip = new JSZip();
                new_zip.loadAsync(ab)
                    .then((zip) => {
                        Object.keys(zip.files).forEach((filename:any) => {
                            zip.files[filename].async('arraybuffer').then((fileData) => {

                                this.fs.createFile(options.dataDir(), filename, options.overwrite).then(() => {
                                    this.fs.writeFile(options.dataDir(), filename, fileData, {replace:options.overwrite}).then((fileInfo) => {
                                        if(options.verbose) {
                                            console.log('File written', fileInfo);
                                        }
                                    }).catch((e) => {
                                        console.error(e);
                                    });
                                }).catch((e) => {
                                    console.error(e);
                                });
                            })
                        });
                    }).catch((e) => {
                    throw new Error(e.message);
                });
            });

        });
    }
}
