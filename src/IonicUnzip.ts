import {Injectable} from '@angular/core';
import {File} from "@ionic-native/file";
import {IonicUnzipOptions} from "./ionicUnzipOption";

declare var JSZip: any;

@Injectable()
export class IonicUnzip {

    private options: IonicUnzipOptions = new IonicUnzipOptions();

    constructor(private fs: File) {
    }

    /**
     * Unzip a file
     * @param {IonicUnzipOptions} options
     * @returns {Promise<any>}
     */
    unzip(userOptions: object): Promise<any> {

        Object.assign(this.options, userOptions);

        return this.fs.createDir(this.dataDir(), this.options.targetDir, this.options.overwrite).then(() => {

            this.fs.readAsArrayBuffer(this.dataDir(), this.options.fileName).then((ab) => {
                let new_zip = new JSZip();
                new_zip.loadAsync(ab)
                    .then((zip) => {
                        Object.keys(zip.files).forEach((filename: any) => {
                            zip.files[filename].async('arraybuffer').then((fileData) => {

                                let zipFileName = filename.split('/').slice(-1);
                                let path = filename.substr(0, filename.lastIndexOf("/")) || '';

                                this.fs.createFile(this.dataDir() + path, zipFileName, this.options.overwrite).then(() => {
                                    this.fs.writeFile(this.dataDir() + path, zipFileName, fileData, {replace: this.options.overwrite}).then((fileInfo) => {
                                        if (this.options.verbose) {
                                            console.log('File written', fileInfo);
                                        }
                                    }).catch((e) => {
                                        console.error("Could not write file" + zipFileName);
                                        console.error(e);
                                    });
                                }).catch((e) => {
                                    console.error("Could not create file " + zipFileName);
                                    console.error(e);
                                });
                            })
                        });
                    }).catch((e) => {
                    console.error("Error with zip file");
                    throw new Error(e.message);
                });
            });

        });
    }

    /**
     * @returns {string}
     */
    private dataDir() {
        return this.options.dataDir || this.fs.dataDirectory;
    }
}
