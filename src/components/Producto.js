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
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../actions'
import Button2 from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useHistory } from 'react-router-dom'


const useStyles = makeStyles({
    root: {
      backgroundColor: "white"
    },
    rootActive: {
      minWidth: 275,
      backgroundColor: "#dbffff"
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
        const dispatch = useDispatch();
        const listaTicket = useSelector(store => store.listaTicket);
        const listaTicketNormalizado = useSelector(store => store.listaTicketNormalizado);
        const [anchorEl, setAnchorEl] = React.useState(null);
        const open = Boolean(anchorEl);
        const history = useHistory();

 
        const handleClick = (event) => {
          setAnchorEl(event.currentTarget);
        };
        const handleClose = () => {
          setAnchorEl(null);
        };

        const handleAction = (action, key) => {
          history.push("/puntoventa/add/"+ key);

        }
      
	return	(
		   <Card className={props.data.active ? classes.rootActive : classes.root} variant="outlined" >
    		     <CardHeader title={ <div> 
                <span>
                
                <Button2
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                >
                  {props.data.codigointerno}
                </Button2>
                 <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    <MenuItem onClick={() => handleAction("editar", props.data.codigointerno)}>Editar 
                    
                    </MenuItem>
                    <MenuItem onClick={() => handleAction("solicitar", props.data.codigointerno)}>Solicitar producto</MenuItem>
                  </Menu>
                </span>
                <span>
                - {props.data.description}
                </span>
             </div>} 
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
          						     <Button variant="contained" color="primary" startIcon={ <Icon>add_circle</Icon> } 
                             onClick={(e) => { 
                                var item = listaTicketNormalizado[props.data.codigointerno];
                                console.log("item: " + props.data.codigointerno)
                                console.log(item)
                                if (typeof(item) == "undefined") {
                                  dispatch(actions.addItemTicket({...props.data}));
                                }else{
                                  var itemAModificar = listaTicket[item.index];
                                  itemAModificar.cantidad = itemAModificar.cantidad + props.data.cantidad;
                                  itemAModificar.total = itemAModificar.cantidad * itemAModificar.precioVenta;
                                  dispatch(actions.modifyItemTicket({...itemAModificar}));
                                }
                                e.stopPropagation();
                             }
                           }> 
          						        ${props.data.cantidad * props.data.precioVenta}
          						      </Button>

    		                 }
    		     />

		   </Card>

		)
}

export default Producto;
