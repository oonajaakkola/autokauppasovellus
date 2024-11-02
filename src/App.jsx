import { useState } from 'react'
import './App.css';
import CarList from './components/CarList';
import { Container } from "@mui/material";
import { Typography } from "@mui/material";
import { AppBar, Toolbar } from "@mui/material";



function App() {

  return (
    <Container maxWidth = "x1">
      <AppBar position="static">
      <Toolbar>
        <Typography variant='h6'>
          Car shop
        </Typography>
      </Toolbar>
      </AppBar>
    < CarList />
    </Container>
  )
}

export default App
