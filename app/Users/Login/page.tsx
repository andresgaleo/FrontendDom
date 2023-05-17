'use client';
import * as React from 'react';
import { FormGroup, FormControlLabel, Switch, Button, FormControl, FormLabel, TextField, Grid, Alert, Snackbar } from '@mui/material';
import { Link, Navigate } from "react-router-dom";

export default function Login() {
  let message:string = "Usuario no encontrado o datos incorrectos.";
  const [open,setOpen] = React.useState(true);
  var endpoint = "http://localhost:3000";
  var handleSubmit = async (event:any)=>{
    event.preventDefault();
    const data = {
      email:event.target.email.value,
      pwd:event.target.password.value
    }

    const JSONdata = JSON.stringify(data);
    const method = endpoint+"/users/login";
    const options = {
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSONdata,
    };

    const response = await fetch(method,options);
    const result = await response.json();
    if(result.success=="error"){
      message = result.message;
      setOpen(false);
    }else{
      message="";
      setOpen(true);
      sessionStorage.setItem("id",result.id);
      sessionStorage.setItem("name",result.name);
      sessionStorage.setItem("email",result.email);
      window.location.href="/Home";
    }
  }

  return (
      <form autoComplete="on" onSubmit={handleSubmit}>
        <Snackbar open={!open}>
          <Alert severity="error">{message}</Alert>
        </Snackbar>
        <Grid item container direction="row" alignItems="center"
  justifyContent="center" style={{ minHeight: '100vh', maxWidth: '100%' }}>
          <Grid md={6}>
            <FormGroup>
              <FormControl>
                <FormLabel>Ingrese Email</FormLabel>
                <TextField type='email' name="email" variant='standard'></TextField>
              </FormControl>
            </FormGroup>
            <FormGroup>
              <FormControl>
                <FormLabel>Ingrese Clave</FormLabel>
                <TextField type='password' name="password" variant='standard'></TextField>
              </FormControl>
            </FormGroup>
            <FormGroup>
              <FormControl>
                <Button variant='contained' type="submit" color="success">ENTRAR</Button>
              </FormControl>
            </FormGroup>
          </Grid>
        </Grid>
      </form>
  )
}
