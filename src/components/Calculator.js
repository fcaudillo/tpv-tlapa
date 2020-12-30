import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core'
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../actions'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function Calculator(props) {
  const classes = useStyles();
  const calculator = useSelector(store => store.calculator);
  const dispatch = useDispatch();


  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid container item xs={9} spacing={3}>
          <Grid container item xs={12} spacing={1}>
              <Grid item xs={4}>
                  <Button variant="contained" color="primary" onClick={ () => {
                      props.updateData((props.type == "quantity" ? props.quantity + "1" : props.quantity), 
                                       (props.type == "price" ? props.quantityPrice + "1": props.quantityPrice), 
                                       props.type);
                  }}> 
                    1
                  </Button>
              </Grid>
              <Grid item xs={4}>
                  <Button variant="contained" color="primary" onClick={ () => {
                      props.updateData((props.type == "quantity" ? props.quantity + "2" : props.quantity), 
                                       (props.type == "price" ? props.quantityPrice + "2": props.quantityPrice), 
                                       props.type);
                  }}> 
                    2
                  </Button>
              </Grid>
              <Grid item xs={4}>
                  <Button variant="contained" color="primary" onClick={ () => {
                      props.updateData((props.type == "quantity" ? props.quantity + "3" : props.quantity), 
                                       (props.type == "price" ? props.quantityPrice + "3": props.quantityPrice), 
                                       props.type);
                  }}> 
                    3
                  </Button>
              </Grid>
              <Grid item xs={4}>
                  <Button variant="contained" color="primary" onClick={ () => {
                      props.updateData((props.type == "quantity" ? props.quantity + "4" : props.quantity), 
                                       (props.type == "price" ? props.quantityPrice + "4": props.quantityPrice), 
                                       props.type);
                  }}> 
                    4
                  </Button>
              </Grid>
              <Grid item xs={4}>
                  <Button variant="contained" color="primary" onClick={ () => {
                      props.updateData((props.type == "quantity" ? props.quantity + "5" : props.quantity), 
                                       (props.type == "price" ? props.quantityPrice + "5": props.quantityPrice), 
                                       props.type);
                  }}> 
                    5
                  </Button>
              </Grid>
              <Grid item xs={4}>
                  <Button variant="contained" color="primary" onClick={ () => {
                      props.updateData((props.type == "quantity" ? props.quantity + "6" : props.quantity), 
                                       (props.type == "price" ? props.quantityPrice + "6": props.quantityPrice), 
                                       props.type);
                  }}> 
                    6
                  </Button>
              </Grid>
              <Grid item xs={4}>
                  <Button variant="contained" color="primary" onClick={ () => {
                      props.updateData((props.type == "quantity" ? props.quantity + "7" : props.quantity), 
                                       (props.type == "price" ? props.quantityPrice + "7": props.quantityPrice), 
                                       props.type);
                  }}> 
                    7
                  </Button>
              </Grid>
              <Grid item xs={4}>
                  <Button variant="contained" color="primary" onClick={ () => {
                      props.updateData((props.type == "quantity" ? props.quantity + "8" : props.quantity), 
                                       (props.type == "price" ? props.quantityPrice + "8": props.quantityPrice), 
                                       props.type);
                  }}> 
                    8
                  </Button>
              </Grid>
              <Grid item xs={4}>
                  <Button variant="contained" color="primary" onClick={ () => {
                      props.updateData((props.type == "quantity" ? props.quantity + "9" : props.quantity), 
                                       (props.type == "price" ? props.quantityPrice + "9": props.quantityPrice), 
                                       props.type);
                  }}> 
                    9
                  </Button>
              </Grid>

              <Grid item xs={4}>
                  <Button variant="contained" color="primary" > 
                    %
                  </Button>
              </Grid>

              <Grid item xs={4}>
                  <Button variant="contained" color="primary" onClick={ () => {
                      props.updateData((props.type == "quantity" ? props.quantity + "0" : props.quantity), 
                                       (props.type == "price" ? props.quantityPrice + "0": props.quantityPrice), 
                                       props.type);
                  }}> 
                    0
                  </Button>
              </Grid>

              <Grid item xs={4}>
                  <Button variant="contained" color="primary" onClick={ () => {
                      if (props.type == "quantity"){
                        if (props.quantity.indexOf(".") != -1)
                           return;
                      }else if (props.type == "price") {
                        if (props.quantityPrice.indexOf(".") != -1)
                           return;
                      }
                      props.updateData((props.type == "quantity" ? props.quantity + "." : props.quantity), 
                                       (props.type == "price" ? props.quantityPrice + ".": props.quantityPrice), 
                                       props.type);
                  }}> 
                    .
                  </Button>
              </Grid>

          </Grid>

        </Grid>
        <Grid container item xs={3} spacing={3}>
          <Grid container item xs={12} spacing={1}>
                <Grid item xs={12}>
                    <ToggleButton
                      value="quantity"
                      selected={props.type == "quantity" ? true: false}
                      onChange={() => {
                         props.updateData(props.quantity, props.quantityPrice, "quantity");
                         dispatch(actions.modifyTypeCalculator("quantity"));
                      }}
                    >
                          Qty
                    </ToggleButton>

                </Grid>
                <Grid item xs={12}>
                    <ToggleButton
                      value="price"
                      selected={props.type == "price" ? true: false}
                      onChange={() => {
                         props.updateData(props.quantity, props.quantityPrice,"price");
                         dispatch(actions.modifyTypeCalculator("price"));
                      }}
                    >
                          Price
                    </ToggleButton>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary"  onClick={ () => {
                      props.updateData((props.type == "quantity" ? props.quantity.slice(0,-1) : props.quantity), 
                                       (props.type == "price" ? props.quantityPrice.slice(0,-1) : props.quantityPrice), 
                                       props.type);
                  }}> 
                      Del
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary"  onClick={ () => {
                      props.updateData((props.type == "quantity" ? "": props.quantity), 
                                       (props.type == "price" ? "" : props.quantityPrice), 
                                       props.type);
                  }}> 
                      C
                    </Button>
                </Grid>
          </Grid>      

        </Grid>

      </Grid>
    </div>
  );
}
