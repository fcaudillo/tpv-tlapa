import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import { Button } from '@material-ui/core'
import Icon from '@material-ui/core/Icon'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    margin: 'auto',
    maxWidth: 300,
    backgroundColor: 'white',
  },
  paperbackground: {
    padding: theme.spacing(1),
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

	return	(

   <div className={classes.root}>
      <Paper className={props.data.active ? classes.paperbackground: classes.paper}>
        <Grid container spacing={1}>
          <Grid item>
            <ButtonBase className={classes.image}>
               <IconButton style={{ color: 'red' }}>
                  <HighlightOffIcon />
               </IconButton>
            </ButtonBase>
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
              <Typography variant="subtitle1">${ props.data.cantidad * props.data.precioVenta}</Typography>
            </Grid>
          </Grid>
          { props.data.cantidad > 1 &&
             <Grid item xs={12}>
                <Typography variant='subtitle1' color='primary' display='inline'> 
                       {props.data.cantidad} 
                </Typography> Unidad a &nbsp; 
                <Typography variant='subtitle1' color='primary' display='inline'> 
                  ${ props.data.precioVenta} 
                </Typography>
                   &nbsp; / Unidad(es)
             </Grid>
          }
        </Grid>
      </Paper>
   </div>

		)

}

export default CardItemTicket;
