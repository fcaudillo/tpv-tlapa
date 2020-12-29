import React from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import CardHeader from '@material-ui/core/CardHeader'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import { Button } from '@material-ui/core'
import Icon from '@material-ui/core/Icon'

const useStyles = makeStyles({
    root: {
    	minWidth: 275,
    },
    title: {
    	fontSize: 14,
    },
    quantity : {
       fontWeight: 600,
       fontSize : 12,
    },
});

const Producto = (props) => {
	const classes = useStyles();

	return	(
		   <Card className={classes.root} variant="outlined" >
		     <CardHeader title={ <div> {props.data.codigointerno} - {props.data.description} </div>} 
		                 subheader={
		                 	<div>
                               <Typography variant='h6' color='primary' display='inline'> 
                                  {props.data.cantidad} 
                               </Typography> Unidad(es) a &nbsp; 
                               <Typography variant='h6' color='primary' display='inline'> 
                                  ${ props.data.precioVenta} 
                               </Typography>
                                &nbsp; / Unidad(es)
		                 	</div>
		                 } 
		                 action={
						     <Button variant="contained" color="primary" startIcon={ <Icon>add_circle</Icon> }> 
						        ${props.data.precioVenta}
						      </Button>

		                 }
		                 />

		   </Card>

		)
}

export default Producto;
