import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React from 'react'
import { makeStyles } from '@mui/styles';
import fetch from 'isomorphic-unfetch';


const useStyles = makeStyles({
    root: {
        margin: '2px',
    },
    button: {
        paddingLeft: '30px',
    },
    rows: {
        margin: '5px',
    },
  });

function newLocation() {
    const classes = useStyles();
    const [location, setLocation] = React.useState({
        name: '',
        description: '',
        lat: '',
        long: '',
        address: '',
        sector: '',
    });


    const handleSubmit= async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:3000/api/locations', {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(location)
            })
            router.push("/");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div style={{ margin: '20px'}}>
            <Typography style={{ margin: '10px'}} variant="h4"> Add a new location </Typography>
            <form onSubmit={handleSubmit} > 
                <Grid container style={{ margin: '5px'}}> 
                    <Grid item xs={12} > 
                        <TextField onChange={e => setLocation({ ...location, name : e.target.value})} style={{ margin: '5px'}} id="locationname" label="Location name" variant="outlined" />
                        <TextField onChange={e => setLocation({ ...location, description : e.target.value})} style={{ margin: '5px'}} id="locationdescription" label="Description" variant="outlined" />
                    </Grid>
                </Grid>
                <Grid container style={{ margin: '5px'}}>  
                    <Grid item xs={12}> 
                        <TextField onChange={e => setLocation({ ...location, lat : e.target.value})} style={{ margin: '5px'}} id="locationlat" label="Latitude" variant="outlined" />
                        <TextField onChange={e => setLocation({ ...location, long : e.target.value})} style={{ margin: '5px'}} id="locationlong" label="Longitude" variant="outlined" />
                    </Grid>
                </Grid>
                <Grid container style={{ margin: '5px'}}>
                    <Grid item xs={12}> 
                        <TextField onChange={e => setLocation({ ...location, address : e.target.value})} style={{ margin: '5px'}} id="locationaddress" label="Address" variant="outlined" />
                        <FormControl style={{ margin: '5px', width: '225px'}}>
                            <InputLabel id="locationsector">Sector</InputLabel>
                            <Select
                                labelId="locationsector"
                                id="locationsectorselect"
                                value={location.sector}
                                label="Sector"
                                onChange={e => setLocation({ ...location, sector : e.target.value})}
                            >
                                <MenuItem value={10}>Private</MenuItem>
                                <MenuItem value={20}>Public</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Button style={{ margin: '10px', width: '120px'}} variant="contained" size="large" type='submit' > Add </Button>
            </form>
        </div>
    )
}

export default newLocation
