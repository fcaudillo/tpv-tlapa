import React, { forwardRef, useImperativeHandle } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Button, Box } from '@material-ui/core'
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../actions'
import Icon from '@material-ui/core/Icon'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  tecla: {
    maxWidth: '50px', 
    maxHeight: '46px', 
    minWidth: '50px', 
    minHeight: '46px',
  },
  marginTeclaEspecial: {
    marginTop: '13px'
  },
  teclaConMargen: {
    maxWidth: '50px', 
    maxHeight: '46px', 
    minWidth: '50px', 
    minHeight: '46px',
    marginTop: '15px'
  },
}));

const Calculator =  forwardRef((props,ref) => {
  const classes = useStyles();
  const calculator = useSelector(store => store.calculator);
  const dispatch = useDispatch();
  const [type,setType] = React.useState(props.type);
  const [disabled, setDisabled] = React.useState(props.disabled);

  useImperativeHandle(ref, () =>({
                                   setHabilitar(estado) {
                                     setDisabled(estado);
                                   }}),)


  return (
    <Box className={classes.root}>
      <Grid container >
        <Grid container item xs={8} >
          <Box width={200} >
              <Grid container item xs={12} spacing={2} >
                  <Grid item xs={4}>
                      <Button variant="outlined" disabled={disabled} className={classes.tecla} color="primary" onClick={ () => {
                          props.updateData((type == "quantity" ? props.quantity + "1" : props.quantity), 
                                           (type == "price" ? props.quantityPrice + "1": props.quantityPrice), 
                                           type);
                      }}> 
                        1
                      </Button>
                  </Grid>
                  <Grid item xs={4}>
                      <Button variant="outlined" disabled={disabled}  className={classes.tecla}  color="primary" onClick={ () => {
                          props.updateData((type == "quantity" ? props.quantity + "2" : props.quantity), 
                                           (type == "price" ? props.quantityPrice + "2": props.quantityPrice), 
                                           type);
                      }}> 
                        2
                      </Button>
                  </Grid>
                  <Grid item xs={4}>
                      <Button variant="outlined" disabled={disabled} className={classes.tecla}  color="primary" onClick={ () => {
                          props.updateData((type == "quantity" ? props.quantity + "3" : props.quantity), 
                                           (type == "price" ? props.quantityPrice + "3": props.quantityPrice), 
                                           type);
                      }}> 
                        3
                      </Button>
                  </Grid>
                  <Grid item xs={4}>
                      <Button variant="outlined" disabled={disabled} className={classes.tecla}  color="primary" onClick={ () => {
                          props.updateData((type == "quantity" ? props.quantity + "4" : props.quantity), 
                                           (type == "price" ? props.quantityPrice + "4": props.quantityPrice), 
                                           type);
                      }}> 
                        4
                      </Button>
                  </Grid>
                  <Grid item xs={4}>
                      <Button variant="outlined" disabled={disabled} className={classes.tecla} color="primary" onClick={ () => {
                          props.updateData((type == "quantity" ? props.quantity + "5" : props.quantity), 
                                           (type == "price" ? props.quantityPrice + "5": props.quantityPrice), 
                                           type);
                      }}> 
                        5
                      </Button>
                  </Grid>
                  <Grid item xs={4}>
                      <Button variant="outlined" disabled={disabled} className={classes.tecla}  color="primary" onClick={ () => {
                          props.updateData((type == "quantity" ? props.quantity + "6" : props.quantity), 
                                           (type == "price" ? props.quantityPrice + "6": props.quantityPrice), 
                                           type);
                      }}> 
                        6
                      </Button>
                  </Grid>
                  <Grid item xs={4}>
                      <Button variant="outlined" disabled={disabled} className={classes.tecla}  color="primary" onClick={ () => {
                          props.updateData((type == "quantity" ? props.quantity + "7" : props.quantity), 
                                           (type == "price" ? props.quantityPrice + "7": props.quantityPrice), 
                                           type);
                      }}> 
                        7
                      </Button>
                  </Grid>
                  <Grid item xs={4}>
                      <Button variant="outlined" disabled={disabled} className={classes.tecla}  color="primary" onClick={ () => {
                          props.updateData((type == "quantity" ? props.quantity + "8" : props.quantity), 
                                           (type == "price" ? props.quantityPrice + "8": props.quantityPrice), 
                                           type);
                      }}> 
                        8
                      </Button>
                  </Grid>
                  <Grid item xs={4}>
                      <Button variant="outlined" disabled={disabled} className={classes.tecla}  color="primary" onClick={ () => {
                          props.updateData((type == "quantity" ? props.quantity + "9" : props.quantity), 
                                           (type == "price" ? props.quantityPrice + "9": props.quantityPrice), 
                                           type);
                      }}> 
                        9
                      </Button>
                  </Grid>

                  <Grid item xs={4}>
                      <Button variant="outlined" disabled={disabled} className={classes.tecla} color="primary" > 
                        %
                      </Button>
                  </Grid>

                  <Grid item xs={4}>
                      <Button variant="outlined" disabled={disabled} className={classes.tecla}  color="primary" onClick={ () => {
                          props.updateData((type == "quantity" ? props.quantity + "0" : props.quantity), 
                                           (type == "price" ? props.quantityPrice + "0": props.quantityPrice), 
                                           type);
                      }}> 
                        0
                      </Button>
                  </Grid>

                  <Grid item xs={4}>
                      <Button variant="outlined" disabled={disabled} className={classes.tecla}  color="primary" onClick={ () => {
                          if (type == "quantity"){
                            if (props.quantity.indexOf(".") != -1)
                               return;
                          }else if (type == "price") {
                            if (props.quantityPrice.indexOf(".") != -1)
                               return;
                          }
                          props.updateData((type == "quantity" ? props.quantity + "." : props.quantity), 
                                           (type == "price" ? props.quantityPrice + ".": props.quantityPrice), 
                                           type);
                      }}> 
                      
                        .
                      </Button>
                  </Grid>
 
              </Grid>
          </Box>
        </Grid>
        <Grid container item xs={4} >
          <Box width={100} >
            <Grid container align = "center" justify = "center" alignItems = "center" item xs={12} >
                <Grid item xs={12}>
                    <ToggleButton
                      value="quantity"
                      disabled={disabled} 
                      selected={type == "quantity" ? true: false}
                      onChange={() => {
                         setType("quantity");
                        
                      }}
                    >
                          Qty
                    </ToggleButton>

                </Grid>
                <Grid item xs={12}>
                    <ToggleButton
                      className={classes.marginTeclaEspecial}
                      value="price"
                      disabled={disabled} 
                      selected={type == "price" ? true: false}
                      onChange={() => {
                         setType("price");
                         
                      }}
                    >
                          <Icon>monetization_on</Icon>
                    </ToggleButton>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="outlined" 
                       disabled={disabled} className={classes.teclaConMargen}  color="primary"  onClick={ () => {
                      props.updateData((type == "quantity" ? props.quantity.slice(0,-1) : props.quantity), 
                                       (type == "price" ? props.quantityPrice.slice(0,-1) : props.quantityPrice), 
                                       type);
                  }}> 
                      <Icon>backspace</Icon>
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button 
                      variant="outlined" disabled={disabled} className={classes.teclaConMargen}  color="primary"  onClick={ () => {
                      props.updateData((type == "quantity" ? "": props.quantity), 
                                       (type == "price" ? "" : props.quantityPrice), 
                                       type);
                  }}> 
                      C
                    </Button>
                </Grid>
            </Grid>      
          </Box>

        </Grid>

      </Grid>
    </Box>
  );
})

export default Calculator;
