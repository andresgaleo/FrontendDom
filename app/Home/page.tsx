'use client'
import * as React from 'react';
import { Box, Button, Card, CardActions, CardContent, FormControl, Grid, InputLabel, Link, MenuItem, Select, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
//import { DataGrid } from '@mui/x-data-grid';
const preventDefault = (event: React.SyntheticEvent) => event.preventDefault();
let tasks:any = [];
export default function Home() {
  //const [status, setStatus] = React.useState('');
  var endpoint = "http://localhost:3000";
  let removeSession = async()=>{
    sessionStorage.clear();
    window.location.href="/Users/Login";
  }
  let handleDelete = async(id:any)=>{
    const method = endpoint+"/tasks/delete/"+id;
    const options = {
      method:'delete',
      headers:{
        'Content-Type':'application/json'
      }
    };
    const response = await fetch(method,options);
    const result = await response.json();
    alert(result.message);
  }
  let handleChange = async(event:any,id:any)=>{
    const method = endpoint+"/tasks/update";
    const data={
      id:id,
      status:event.target.value
    }
    const JSONdata = JSON.stringify(data);
    const options={
      method:"PUT",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSONdata,
    }
    const response = await fetch(method,options);
    const result = await response.json();
    //setStatus(event.target.value);
  }
  let handleGet = async(event:any)=>{
    //tasks = [];
    const method = endpoint+"/tasks/"+sessionStorage.getItem("id");
    const options = {
      method:'GET',
      headers:{
        'Content-Type':'application/json'
      }
    };

    const response = await fetch(method,options);
    const result = await response.json();
    result.forEach((task: any,index: any)=>{
      tasks.push(task);
    });
  }
  handleGet(0)
  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'right',
          typography: 'body1',
          '& > :not(style) + :not(style)': {
            ml: 2,
          },
        }}
        onClick={preventDefault}
      >
        <span>
          Bienvenido: {sessionStorage.getItem("name")}
        </span>
        <Link onClick={removeSession} href="/Login" underline="hover">
          Cerrar Sesión
        </Link>
      </Box>
      <Grid container justifyContent="center">
        <Card sx={{ minWidth: 1000 }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Tareas de usuario
            </Typography>
            <Grid container>
              <Grid md={3}>Descripcion</Grid>
              <Grid md={3}>Estado</Grid>
              <Grid md={3}>Nuevo Estado</Grid>
              <Grid md={3}>Acción</Grid>
            </Grid>
              {tasks.map((task:any)=>{
                    return <Grid container>
                      <Grid md={3}>{task.description}</Grid>
                      <Grid md={3}>{status || task.status}</Grid>
                      <Grid md={3}>
                      <FormControl fullWidth>
                        <InputLabel id="ddl_status">Estado</InputLabel>
                          <Select
                            labelId='ddl_status'
                            id="ddl_status"
                            label="Estado"
                            onChange={(e)=>handleChange(e,task.id)}>
                              <MenuItem value="Terminado">Terminado</MenuItem>
                              <MenuItem value="Desarrollo">Desarrollo</MenuItem>
                              <MenuItem value="Pendiente">Pendiente</MenuItem>
                            </Select>
                          </FormControl>
                      </Grid>
                      <Grid md={3}>
                      <Button variant='contained' onClick={(e)=>handleDelete(task.id)} type="button" color="error">ELIMINAR</Button>
                      </Grid>
                    </Grid>
                })}
          </CardContent>
        </Card>
      </Grid>
    </div>
  )
}
