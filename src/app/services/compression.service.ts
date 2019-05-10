import { ImageResizer, ImageResizerOptions } from '@ionic-native/image-resizer/ngx';

const PETSITTERS_DIRECTORY = 'PetSitters';

export class ImageCompressorService {

    constructor() { //private zone: NgZone, 
        console.log("Starting: Comp constructor");        
    }

    // Reads the image from the file location and returns the file location of the compressed file. Do not forget to remove this temporary file after.
    async compress(fileLocation: any) {
        let filename = fileLocation.substring(fileLocation.lastIndexOf('/') + 1);

        let imageResizer = new ImageResizer();

        let options = {
            uri: fileLocation,
            folderName: PETSITTERS_DIRECTORY,
            quality: 90,
            width: 1920,
            height: 1080
           } as ImageResizerOptions;

        console.log("Starting: Compressing the image...; The file is: " + JSON.stringify(fileLocation));

        return new Promise((resolve, reject) => {
                imageResizer.resize(options)
                .then((fileOutput:string) => resolve(fileOutput))
                .catch((error) => reject(error));
            });      
    }
}