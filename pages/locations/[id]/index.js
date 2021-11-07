import fetch from 'isomorphic-unfetch';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Confirm, Button, CircularProgress } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Location = ({ location }) => {
    const [confirm, setConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (isDeleting) {
            deleteLocation();
        }
    }, [isDeleting])


    const deleteLocation = async () => {
        const locationId = router.query.id;
        try {
            const deleted = await fetch(`http://localhost:3000/api/locations/${locationId}`, {
                method: "Delete"
            });

            router.push("/");
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async () => {
        setIsDeleting(true);
        close();
    }

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="location-container" style={{margin:'10px'}}>
            {isDeleting
                ? <CircularProgress />
                :
                <>
                    <h1>{location.name}</h1>
                    <p>{location.description}</p>
                    <p>{location.lat}</p>
                    <p>{location.long}</p>
                    <p>{location.address}</p>
                    <p>{location.sector}</p>
                    <Button variant="outlined" onClick={handleClickOpen}>
                        Delete
                    </Button>
                </>
            }
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                <DialogTitle id="alert-dialog-title">
                {"Delete location?"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are oyu sure you want to delete this location
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Disagree</Button>
                <Button onClick={handleDelete} autoFocus>
                    Agree
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

Location.getInitialProps = async ({ query: { id } }) => {
    const res = await fetch(`http://localhost:3000/api/locations/${id}`);
    const { data } = await res.json();

    return { location: data }
}

export default Location;