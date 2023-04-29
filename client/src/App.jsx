import { useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
} from '@mui/material';
import { Outlet } from 'react-router-dom'

import './App.scss';
import './scss/editor.scss';
import ImageEditor from './components/containers/redactor/ImageEditor';
import CustomDrawer from './components/containers/redactor/CustomDrawer';
import Header from './components/common/Header'

function App() {
  const [imageSrc, setImageSrc] = useState();
  const [imageName, setImageName] = useState();
  const [imageType, setImageType] = useState();
  const [showEditor, setShowEditor] = useState(false);
  /**
   * This function creates an input element that allows the user to select a file, reads the file using
   * FileReader, and sets the image source and editor visibility based on the file data.
   */
  function handleFile() {
    let input = document.createElement('input');
    input.type = 'file';
    input.onchange = () => {
      let files = Array.from(input.files);
      setShowEditor(false)
      const reader = new FileReader();

      reader.onload = () => {
        const imgData = reader.result;
        setImageSrc(imgData);
        setShowEditor(true)
      };

      setImageName(files[0].name.split('.')[0]);
      setImageType(files[0].type.split('/')[1]);

      reader.readAsDataURL(files[0]);
    };
    input.click();
  }
  return (
    <Box >
      <Header />
      <CustomDrawer onImageUpload={handleFile} />
      
      <Box
        component="main"
        sx={{ flexGrow: 1, m: '64px 0 64px 179px', }}
      >
        {
          showEditor &&
          <ImageEditor imageData={{
            'imgSrc': imageSrc,
            'imgName': imageName,
            'imgType': imageType,
            }} />
        }
			
      </Box>
    </Box>
  );
}

export default App;
