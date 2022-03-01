import React from 'react'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
    root: {
    	width: '85%',
      backgroundColor: "white"
    },
    title: {
    	fontSize: 14,
    },
    quantity : {
       fontWeight: 600,
       fontSize : 12,
    },
});

const CardEditItem = (props) => {
	const classes = useStyles();

	return	(
		   <Card className={classes.root} variant="outlined" >
    		     <CardHeader title={ <div> {props.data.codigointerno} - {props.data.description} 
               
               
                                  </div>} 
    		                 subheader={
      		                 	<div>
                                     <Typography variant='h6' color='primary' display='inline'> 
                                        {props.data.cantidad} 
                                     </Typography> Unidad a &nbsp; 
                                     <Typography variant='h6' color='primary' display='inline'> 
                                        ${ props.data.precioVenta} 
                                     </Typography>
                                      &nbsp; / Unidad(es) =  &nbsp; 
                                     <Typography variant='h6' color='primary' display='inline'> 
                                        ${ props.data.cantidad * props.data.precioVenta} 
                                     </Typography>
      		                 	</div>
    		                 }
    		     />

		   </Card>

		)
}

export default CardEditItem;
