export class IonicUnzipOptions {

    constructor() {
    }

    /**
     * Target directory to extract from relative to the data directory e.g '/images'
     * @type {string}
     */
    targetDir: string = '';
    /**
     * Over ride the default root directory (dataDirectory) see
     * https://ionicframework.com/docs/native/file/ for more info
     * @type {string}
     */
    dataDir: string = '';
    /**
     * Zip filename
     * @type {string}
     */
    fileName: string = '';
    /**
     * Wether to overwrite existing files and directories
     * @type {boolean}
     */
    overwrite: boolean = true;
    /**
     * Ouput file written info to the console
     * @type {boolean}
     */
    verbose: boolean = false;

}