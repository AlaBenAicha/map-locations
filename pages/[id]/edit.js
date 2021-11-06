import Link from 'next/link';
import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { Button, CircularProgress, Form, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useRouter } from 'next/router';

const EditLocation = ({ location }) => {
    const [formData, setFormData] = useState({ name: location.name, description: location.description, lat: location.lat, long: location.long, address: location.address, sector: location.sector });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const router = useRouter();

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                updateLocation();
            }
            else {
                setIsSubmitting(false);
            }
        }
    }, [errors])

    const updateLocation = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/locations/${router.query.id}`, {
                method: 'PUT',
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

    const handleSubmit = (e) => {
        e.preventDefault();
        let errs = validate();
        setErrors(errs);
        setIsSubmitting(true);
    }

    // const handleChange = (e) => {
    //     setForm({
    //         ...form,
    //         [e.target.name]: e.target.value
    //     })
    // }

    const validate = () => {
        let err = {};

        if (!formData.name) {
            err.name = 'Title is required';
        }
        if (!formData.description) {
            err.description = 'Description is required';
        }

        return err;
    }

    return (
        <div className="form-container">
            <h1>Update Location</h1>
            <div>
                {
                    isSubmitting
                        ? <CircularProgress size={25} color='primary' />
                        : <form onSubmit={handleSubmit} > 
                            <Grid container style={{ margin: '5px'}}> 
                                <Grid item xs={12} > 
                                    <TextField value={formData.name} onChange={e => setFormData({ ...formData, name : e.target.value})} style={{ margin: '5px'}} id="locationname" label="Location name" variant="outlined" />
                                    <TextField value={formData.description} onChange={e => setFormData({ ...formData, description : e.target.value})} style={{ margin: '5px'}} id="locationdescription" label="Description" variant="outlined" />
                                </Grid>
                            </Grid>
                            <Grid container style={{ margin: '5px'}}>  
                                <Grid item xs={12}> 
                                    <TextField value={formData.lat} onChange={e => setFormData({ ...formData, lat : e.target.value})} style={{ margin: '5px'}} id="locationlat" label="Latitude" variant="outlined" />
                                    <TextField value={formData.long} onChange={e => setFormData({ ...formData, long : e.target.value})} style={{ margin: '5px'}} id="locationlong" label="Longitude" variant="outlined" />
                                </Grid>
                            </Grid>
                            <Grid container style={{ margin: '5px'}}>
                                <Grid item xs={12}> 
                                    <TextField value={formData.address} onChange={e => setFormData({ ...formData, address : e.target.value})} style={{ margin: '5px'}} id="locationaddress" label="Address" variant="outlined" />
                                    <FormControl style={{ margin: '5px', width: '225px'}}>
                                        <InputLabel id="locationsector">Sector</InputLabel>
                                        <Select
                                            labelId="locationsector"
                                            id="locationsectorselect"
                                            value={formData.sector}
                                            label="Sector"
                                            onChange={e => setFormData({ ...formData, sector : e.target.value})}
                                        >
                                            <MenuItem value={10}>Private</MenuItem>
                                            <MenuItem value={20}>Public</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Button style={{ margin: '10px', width: '120px'}} variant="contained" size="large" type='submit' > Add </Button>
                        </form>
                }
            </div>
        </div>
    )
}

EditLocation.getInitialProps = async ({ query: { id } }) => {
    const res = await fetch(`http://localhost:3000/api/locations/${id}`);
    const { data } = await res.json();

    return { location: data }
}

export default EditLocation;