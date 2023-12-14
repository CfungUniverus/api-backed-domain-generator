import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ObjectFieldInfoForm from './ObjectFieldInfoForm'; 
import ObjectInfoForm from './ObjectInfoForm';
import { Box, Typography, dividerClasses } from '@mui/material';

function App() {
  return (
<>
<Typography variant={"h3"} sx={{textAlign: "center"}}>Generating API Backed Domains</Typography>

<Box sx={{display: "flex", flexDirection: "row", gap: "40px"}}> 
      <ObjectInfoForm/>
      <ObjectFieldInfoForm/>
    </Box>
</>
  );
}

export default App;
