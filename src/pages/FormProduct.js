import React, { Component, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import {FormGroup, Button} from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import { ApplicationContext } from '../Context';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Cookies from 'js-cookie'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
    
  },
  descripcion: {
    width: "95%"
  },

  classAncla: {
    textDecoration: "underline"
  }

}));

const schema = yup.object().shape({
  codigoInterno:  yup.number().positive().integer(),
  proveedor: yup.string(),
  codigoProveedor: yup.string().required(),
  codigoBarras: yup.string(),
  descripcion: yup.string().required(),
  precioCompra: yup.number().positive().required(),
  precioVenta: yup.number().positive().required(),
  unidadVenta:  yup.string().required(),
  existencia: yup.number().positive().integer().required(),
  minimoExistencia: yup.number().positive().integer().required(),
  maximoExistencia: yup.number().positive().integer().required(),
  puedeVenderse: yup.boolean(),
  ubicacion: yup.string()
});

const porcentajes = [
  { title: '10%  23.00', porcentaje: 10 },
  { title: '15%  24.00', porcentaje: 15 },
  { title: '20%  30.00', porcentaje: 20 }
];

function FormProduct() {
  const classes = useStyles();
  const [add, setAdd] = React.useState(true);
  const value = useContext(ApplicationContext);
  const [precioCompraHistorico, setPrecioCompraHistorico] = React.useState("");
  const [precioVentaHistorico, setPrecioVentaHistorico] = React.useState("");
  const [codigointerno, setCodigoInterno] = React.useState("");
  const { proveedores, findProveedores } = value;
  const { register, setValue, setFocus, getValues, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const { parametros } = value;
  let { key } = useParams();

  const propsPorcentajes = {
    options: porcentajes,
    getOptionLabel: (option) => option.title,
  };

  React.useEffect(() => {
     setValue("codigoInterno","0");
     setFocus("codigoProveedor");
  }, [setFocus]);


  React.useEffect( () => {
    console.log('codigointernius: ' + key)
    if (typeof(key) != "undefined") {
      console.log("mode update producto")
      setValue("codigoInterno",key);
      setAdd(false)
      handleSearchProductByCodigoInterno(null);
    }
  }, [add])

  const onSubmit = (data) => {
    var url = parametros['URL_API_BASE'] + "/producto/" + (add ? "agregar" : "update");
    console.log("enviado datos a " + url);
    
    console.log(data);
    fetch(url,
    {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken': Cookies.get('csrftoken')
        },
        method: "POST",
        body: JSON.stringify(data)
    })
    .then(function(res){
       
        console.log("Se agrego/actualizo con exito")
        if (res.ok){
          setAdd(true);
          setValue("codigoInterno","0");
          setValue("descripcion","");
          setValue("codigoProveedor", "");
          setValue("codigoBarras", "");
          setValue("precioCompra","0");
          setValue("precioVenta","0");
          setValue("existencia","1");
          setValue("minimoExistencia","1");
          setValue("maximoExistencia","3");
          setValue("ubicacion","UNKNOW");
          setFocus("codigoProveedor");
          setPrecioCompraHistorico("");
          setPrecioVentaHistorico("");
        }else {
          alert ('El producto ya existe')
        }
        history.back()

      })
    .catch(function(res){ 
      console.log(res) 
    })

  }

  const handleSearchProduct = (event) => {
     setPrecioCompraHistorico("");
     setPrecioVentaHistorico("");    
     setAdd(true);
     fetch(parametros['URL_API_BASE'] + "/find_historico/" + getValues("proveedor") +"/" + getValues("codigoProveedor") )
       .then(response => response.json())
       .then(data => {
          console.log(data);
          setValue("descripcion",data.descripcion);
          setValue("unidadVenta",data.unidad);
          setValue("codigoProveedor", data.codigoProveedor);
          setValue("codigoBarras", data.codigobarras);
          setValue("precioCompra",data.precioCompra);
          setValue("precioVenta",data.precioPublico);
          setValue("existencia","1");
          setValue("minimoExistencia","1");
          setValue("maximoExistencia","3");
          setValue("ubicacion","UNKNOW");
          setValue("puedeVenderse",true);
       });

  };

  const handleSearchProductByCodigoInterno = (event) => {
    setPrecioCompraHistorico("");
    setPrecioVentaHistorico("");
    setAdd(false);
    fetch(parametros['URL_API_BASE'] + "/findByCodigoInterno/" + getValues("codigoInterno") )
      .then(response => response.json())
      .then(data => {
         console.log("xxx")
         console.log(data);
         setValue("descripcion",data.description);
         setValue("unidadVenta",data.unidadVenta);
         setValue("proveedor",data.proveedorId);
         setValue("codigoProveedor", data.codigoProveedor);
         setValue("codigoBarras", data.barcode);
         setValue("precioCompra",data.precioCompra);
         setValue("precioVenta",data.precioVenta);
         setValue("existencia", data.existencia);
         setValue("minimoExistencia",data.minimoExistencia);
         setValue("maximoExistencia",data.maximoExistencia);
         setValue("puedeVenderse", data.puedeVenderse);  
         setValue("ubicacion", data.ubicacion);

         fetch(parametros['URL_API_BASE'] + "/find_historico/" + data.proveedorId +"/" + data.codigoProveedor)
            .then(response => response.json())
            .then(dataHistorico => {
                console.log(dataHistorico);
                setPrecioCompraHistorico(dataHistorico.precioCompra);
                setPrecioVentaHistorico(dataHistorico.precioPublico);
            }); 

        });

   };

  const changePrice = () => {
    setValue("precioCompra",precioCompraHistorico);
    setFocus("precioVenta");
  }


  return (
    <div>
      <p> Creacion/Edicion del producto</p>
      
    <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1}>
           <Grid item xs={2}>
                <label htmlFor="codigoInterno">Codigo interno</label>
                <input id="codigoInterno" {...register("codigoInterno")}  />
                <Button variant="contained"  variant="contained" onClick={handleSearchProductByCodigoInterno} color="primary" startIcon={ <SearchIcon /> }></Button>
                {errors.codigoInterno && <p>{errors.codigoInterno.message}</p>     }
                

            </Grid>
            <Grid item xs={1}>
            </Grid>
            <Grid item xs={8}>
              <label htmlFor="proveedor">Proveedor c</label>
              <select id="proveedor" options={proveedores} {...register("proveedor")}>
                 { proveedores.map ( (proveedor) => (
                   <option key={proveedor.value} value={proveedor.value}>{proveedor.label}</option>
                 ))}


                 
              </select>  
              {errors.proveedor && <p>{errors.proveedor.message}</p>  }

           </Grid>
       </Grid>

        <Grid container spacing={1}>
           <Grid item xs={2}>
                <label htmlFor="codigoProveedor">Codigo proveedor</label>
               <input
                  id="codigoProveedor"
                  {...register("codigoProveedor")}
                />
                {errors.codigoProveedor && <p>{errors.codigoProveedor.message}</p>  }

           </Grid>
           <Grid item xs={1}>
               <Button variant="contained"  variant="contained" onClick={handleSearchProduct} disabled={false} color="primary" startIcon={ <SearchIcon /> }></Button>
           </Grid>
           <Grid item xs={3} >    
                <label htmlFor="codigoBarras">Codigo de barras</label>
                <input
                  id="codigoBarras"
                  {...register("codigoBarras")}
                />
                {errors.codigoBarras && <p>{errors.codigoBarras.message}</p>  }

           </Grid>
           <Grid item xs={1}>
             <Button variant="contained" variant="contained" disabled={false} color="primary"  startIcon={ <SearchIcon /> }></Button>
           </Grid> 
        </Grid>

        <Grid container spacing={1}>
           <Grid item xs={12}>
              
                <label htmlFor="descripcion">Descripcion del producto</label>
                <br/>
                <input
                  id="descripcion"
                  className={classes.descripcion}
                  {...register("descripcion")}
                />
                {errors.descripcion && <p>{errors.descripcion.message}</p>  }

            </Grid>
         </Grid>
              
        <Grid container spacing={1}>
           <Grid item xs={2}>

                <label htmlFor="precioCompra">Precio de compra </label>
                <input
                  id="precioCompra"
                  {...register("precioCompra")}
                />
                {errors.precioCompra && <p>{errors.precioCompra.message}</p> }
                {precioCompraHistorico != "" && <div> <a  className={classes.classAncla} onClick={changePrice} >{precioCompraHistorico} </a>  </div>}

           </Grid>
           <Grid item xs={1}>

           </Grid>
           <Grid item xs={2}>

                <label htmlFor="precioVenta">Precio de venta </label>
                
                <input
                  id="precioVenta"
                  {...register("precioVenta")}
                />
                {errors.precioVenta && <p>{errors.precioVenta.message}</p>  }
                {precioVentaHistorico != "" && <div> <p>{precioVentaHistorico}</p> </div>}
           </Grid>
           <Grid item xs={1}>
             <Button> </Button>
           </Grid>
           <Grid item xs={2}>   

                <label htmlFor="unidadVenta">Unidad de venta </label>
                <input
                  id="unidadVenta"
                  {...register("unidadVenta")}
                />
                {errors.unidadVenta && <p>{errors.unidadVenta.message}</p>  }

          </Grid>

        </Grid>

        <Grid container spacing={1}>
           <Grid item xs={2}>

                <label htmlFor="existencia">Existencia </label>
                <input
                  id="existencia"
                  {...register("existencia")}
                />
                {errors.existencia && <p>{errors.existencia.message}</p>  }

           </Grid>
           <Grid item xs={1}>

           </Grid>
           <Grid item xs={2}>

                <label htmlFor="minimoExistencia">Minimo en existencia </label>
                <input
                  id="minimoExistencia"
                  {...register("minimoExistencia")}
                />
                {errors.minimoExistencia && <p>{errors.minimoExistencia.message}</p>  }
 
           </Grid>
           <Grid item xs={1}>
             
           </Grid>
           <Grid item xs={2}>

                <label htmlFor="maximoExistencia">Maximo en existencia </label>
                <input
                  id="maximoExistencia"
                  {...register("maximoExistencia")}
                />
                {errors.maximoExistencia && <p>{errors.maximoExistencia.message}</p>  }

           </Grid>


        </Grid>

        <Grid container spacing={1}>
          <Grid item xs={2}>
                <label htmlFor="ubicacion">ubicacion </label>
                <input
                  id="ubicacion"
                 {...register("ubicacion")}
                />
                {errors.ubicacion && <p>{errors.ubicacion.message}</p>  }

               
          </Grid> 
          <Grid item xs={1}></Grid>
          <Grid item xs={2}>
                <label htmlFor="puedeVenderse">Puede venderse </label>
                <input
                  id="puedeVenderse"
                  type="checkbox"
                  {...register("puedeVenderse")}

                 
                />
                {errors.puedeVenderse && <p>{errors.puedeVenderse.message}</p>  }

               
          </Grid> 
        </Grid>
        <input type="submit" />
       </form>    
	      
      <Link className="btn btn-primary" to="/">
                Regresar a codigo barras
      </Link>
    </div>
  );
}

export default FormProduct;
