import React from 'react'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { makeStyles } from '@mui/styles'
import { Button } from '@mui/material'
import Icon from '@mui/material/Icon'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../actions'
import Button2 from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useHistory } from 'react-router-dom';

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

const ProductoSearch = (props) => {
	const classes = useStyles();
        const dispatch = useDispatch();
        const listaTicket = useSelector(store => store.reducer.listaTicket);
        const listaTicketNormalizado = useSelector(store => store.reducer.listaTicketNormalizado);
        const [anchorEl, setAnchorEl] = React.useState(null);
        const open = Boolean(anchorEl);
        const history = useHistory();
        const { data, edit } = props

 
        const handleClick = (event) => {
          setAnchorEl(event.currentTarget);
        };
        const handleClose = () => {
          setAnchorEl(null);
        };

        const handleAction = (action, key) => {
           if (action == "editar"){
              edit(key)
              handleClose();
           }

        }
      
	return	(
    
		   <Card className={classes.root} variant="outlined" >
    		     <CardHeader title={ <div> 
                <span>
                
                <Button2
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                >
                  {data.codigoInterno}
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
                    <MenuItem onClick={() => handleAction("editar", data.codigoInterno)}>Editar 
                    
                    </MenuItem>
                    <MenuItem onClick={() => handleAction("solicitar", data.codigoInterno)}>Solicitar producto</MenuItem>
                  </Menu>
                </span>
                <span>
                - {data.description}
                </span>
             </div>} 
    		                 
    		                 action={
          						     <Button variant="contained" color="primary" startIcon={ <Icon>add_circle</Icon> } 
                             onClick={(e) => { 
                                var item = listaTicketNormalizado[data.codigoInterno];
                                console.log("item: " + data.codigoInterno)
                                console.log(item)
                                if (typeof(item) == "undefined") {
                                  dispatch(actions.addItemTicket({
                                    "precioVenta": data.precioVenta,
                                    "minimoExistencia": data.minimoExistencia,
                                    "description": data.description,
                                    "addToTicket": 0,
                                    "puedeVenderse": data.puedeVenders,
                                    "precioCompra": data.precioCompra,
                                    "cantidad": 1,
                                    "maximoExistencia": data.maximoExistencia,
                                    "barcode": data.barcode,
                                    "id":  data.codigoInterno ,
                                    "existencia": data.existencia,
                                    "unidadVenta": data.unidadVenta,
                                    "proveedorId": data.persona,
                                    "codigoProveedor": data.codigoProveedor,
                                    "ubicacion": data.ubicacion,
                                    "codigointerno": data.codigoInterno,
                                    "proveedor": "",
                                    "active": false
                                  
                                  }));
                                }else{
                                  //Mapear la data de elasticsearch a los datos que requiere la lista de tickets.
                                  var itemAModificar = listaTicket[item.index];
                                  itemAModificar.cantidad = itemAModificar.cantidad + 1;
                                  itemAModificar.total = itemAModificar.cantidad * itemAModificar.precioVenta;
                                  dispatch(actions.modifyItemTicket({...itemAModificar}));
                                }
                                e.stopPropagation();
                             }
                           }> 
          						        {data.precioVenta}
          						      </Button>

    		                 }
    		     />

		   </Card>

       
     
		)
}

export default ProductoSearch;
