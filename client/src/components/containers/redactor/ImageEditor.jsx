import { ImageEditorComponent } from '@syncfusion/ej2-react-image-editor';
import './editor.scss'

const ImageEditor = () => {
  let imgObj = null
  //   const applyFilters = () => {
  //     imgObj.applyImageFilter({
  //       type: 'Contrast',
  //       contrast: 200
  //     });
  //     imgObj.applyImageFilter({
  //       type: 'Opacity',
  //       opacity: 0.2
  //     });
  //   };
  return (
    <div id="wrapperDiv">
      <ImageEditorComponent ref={(img) => { imgObj = img }} />
      {/* <div>
    
      <button onClick={applyFilters} >Change filter</button>
    </div> */}
    </div>
  );
}

export default ImageEditor;