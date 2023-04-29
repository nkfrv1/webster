import './editor.scss'
import React, { useState, useEffect } from 'react';
import FilerobotImageEditor, {
  TABS,
  TOOLS,
} from 'react-filerobot-image-editor';
import FileSaver  from 'file-saver';
const ImageEditor = () => {
  const [isImgEditorShown, setIsImgEditorShown] = useState(false);
  const [imagesrc, setImagesrc] = useState();



  const openImgEditor = (event) => {
    // create a new FileReader object
    const reader = new FileReader();
    
    // set up event listener for the FileReader object
    reader.onload = () => {
        const imgData = reader.result;
        // set the image data as a state variable
        setImagesrc(imgData);
        // set editor open
        setIsImgEditorShown(true);
    };
    
    // read the file data and trigger the event listener
    reader.readAsDataURL(event.target.files[0]);
};

  const closeImgEditor = () => {
    setIsImgEditorShown(false);
  };

  return (
    <div style={{height: '100vh', width: '100%'}}>
      <input type="file" onChange={openImgEditor} />
      <button onClick={openImgEditor}>Open Filerobot image editor</button>
      {isImgEditorShown && (
        <FilerobotImageEditor
          source={imagesrc}
          // source="https://scaleflex.airstore.io/demo/stephen-walker-unsplash.jpg"
          onSave={(editedImageObject, designState) => {
            FileSaver.saveAs(editedImageObject.imageBase64 , editedImageObject.fullName);
            console.log('saved', editedImageObject, designState);
          }}
          onClose={closeImgEditor}
          annotationsCommon={{
            fill: '#ff0000',
          }}
          Text={{ text: 'Filerobot...' }}
          Rotate={{ angle: 90, componentType: 'slider' }}
          Crop={{
            presetsItems: [
              {
                titleKey: 'classicTv',
                descriptionKey: '4:3',
                ratio: 4 / 3,
                // icon: CropClassicTv, // optional, CropClassicTv is a React Function component. Possible (React Function component, string or HTML Element)
              },
              {
                titleKey: 'cinemascope',
                descriptionKey: '21:9',
                ratio: 21 / 9,
                // icon: CropCinemaScope, // optional, CropCinemaScope is a React Function component.  Possible (React Function component, string or HTML Element)
              },
            ],
            presetsFolders: [
              {
                titleKey: 'socialMedia', // will be translated into Social Media as backend contains this translation key
                // icon: Social, // optional, Social is a React Function component. Possible (React Function component, string or HTML Element)
                groups: [
                  {
                    titleKey: 'facebook',
                    items: [
                      {
                        titleKey: 'profile',
                        width: 180,
                        height: 180,
                        descriptionKey: 'fbProfileSize',
                      },
                      {
                        titleKey: 'coverPhoto',
                        width: 820,
                        height: 312,
                        descriptionKey: 'fbCoverPhotoSize',
                      },
                    ],
                  },
                ],
              },
            ],
          }}
          // tabsIds={[TABS.ADJUST, TABS.ANNOTATE, TABS.WATERMARK]} // or {['Adjust', 'Annotate', 'Watermark']}
          // defaultTabId={TABS.ANNOTATE} // or 'Annotate'
          // defaultToolId={TOOLS.TEXT} // or 'Text'
        />
      )}
    </div>
  );
}

export default ImageEditor;