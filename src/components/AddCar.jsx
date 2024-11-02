import { useState } from "react";
import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import CarDialogContent from "./CarDialogContent";


export default function AddCar({ addCar }) {
    const [car, setCar] = useState ({
        brand: '',
        model: '',
        color: '',
        fuel: '',
        modelYear: '',
        price: '',
    })
    const [open, setOpen] = useState();

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleChange = event => {
        setCar({...car, [event.target.name]: event.target.value});
    }

    const handleSave = () => {
        console.log(car);
        addCar(car);
        setOpen(false);

    }

    return (
      <>
      <Button onClick={handleClickOpen}>Add car</Button>
        <Dialog
          open={open}
          onClose={handleClose}
        >
          <DialogTitle>New car</DialogTitle>
         <CarDialogContent car={car} handleChange={handleChange} />
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogActions>
        </Dialog>
      </>
    );
};
