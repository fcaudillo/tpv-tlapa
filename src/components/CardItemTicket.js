import React from 'react'
import Typography from '@mui/material/Typography'
import { makeStyles } from '@mui/styles'
import Icon from '@mui/material/Icon'
//import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../actions'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: 1,
    margin: 'auto',
    maxWidth: 300,
    backgroundColor: 'white',
  },
  paperbackground: {
    padding: 1,
    margin: 'auto',
    maxWidth: 300,
    backgroundColor: 'lightgray',
  },
  image: {
    width: 30,
    height: 30,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));


const CardItemTicket = (props) => {
	const classes = useStyles();
  const dispatch = useDispatch();
  const calculatorEditItem = useSelector(store => store.reducer.calculatorEditItem);

	return	(

   <div className={classes.root}>
      <Paper className={props.data.active ? classes.paperbackground: classes.paper}>
        <Grid container spacing={1}>
          <Grid item>
             <Icon className={classes.image} style={{ color: 'red' }} onClick={(evt) => {
                dispatch(actions.deleteListItemTicket(props.data.id));
                evt.stopPropagation();
             }}>
               backspace
            </Icon>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography variant="body2" gutterBottom>
                  {props.data.codigointerno} - {props.data.description} 
                </Typography>
              </Grid>

            </Grid>
            <Grid item>
              <Typography variant="subtitle1">${ (props.data.cantidad * props.data.precioVenta).toFixed(2)}</Typography>
            </Grid>
          </Grid>
          
             <Grid item xs={12}>
              { calculatorEditItem.codigointerno != props.data.codigointerno &&
                <div>            
                  <Typography variant='subtitle1' color='primary' display='inline'>
                                        {props.data.cantidad}     
                  </Typography> Unidad a &nbsp;
                </div>
               }  
              { calculatorEditItem.codigointerno == props.data.codigointerno &&
     
                <div>            
                  <Typography variant='subtitle1' color='primary' display='inline'>
                                        {calculatorEditItem.cantidad}     
                  </Typography> Unidad a &nbsp;
                </div>
               }  
               { calculatorEditItem.codigointerno != props.data.codigointerno &&
                <div>
                  <Typography variant='subtitle1' color='primary' display='inline'>
                      ${ props.data.precioVenta}
                    </Typography>
                      &nbsp; / Unidad(es)
                </div>      
               } 
               { calculatorEditItem.codigointerno == props.data.codigointerno &&
                <div>
                  <Typography variant='subtitle1' color='primary' display='inline'>
                      ${ calculatorEditItem.precio}
                    </Typography>
                      &nbsp; / Unidad(es)
                </div>      
               }    
             </Grid>
         
        </Grid>
      </Paper>
   </div>

		)

}

export default CardItemTicket;
