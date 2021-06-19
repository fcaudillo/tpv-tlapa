import React, { Component, useContext } from 'react';
import { Link } from 'react-router-dom';
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

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const schema = yup.object().shape({
  codigoInterno:  yup.number().positive().integer(),
  proveedor: yup.string(),
  codigoProveedor: yup.string().required(),
  codigoBarras: yup.string().required(),
  descripcion: yup.string().required(),
  precioCompra: yup.number().test(
    'is-decimal',
    'invalid decimal',
    value => (value + "").match(/^\d*\.{1}\d*$/),
  ),
  precioVenta: yup.number().positive().integer().required(),
  unidadVenta:  yup.string().required(),
  existencia: yup.number().positive().integer().required(),
  minimoExistencia: yup.number().positive().integer().required(),
  maximoExistencia: yup.number().positive().integer().required(),
  puedeVenderse: yup.string().required(),
  ubicacion: yup.string()
});

function FormProduct() {
  const classes = useStyles();
  const [age, setAge] = React.useState('');
  const [name, setName] = React.useState('');
  const value = useContext(ApplicationContext);
  const { proveedores, findProveedores } = value;
  const { register, setValue, setFocus, getValues, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });

  React.useEffect(() => {
     setFocus("codigoProveedor");
  }, [setFocus]);

  const onSubmit = (data) => {
    console.log(data);
    fetch("http://192.168.100.13:1414/producto/agregar",
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
        console.log("Se agrego con exito")
        setValue("descripcion","");
        setValue("codigoProveedor", "");
        setValue("codigoBarras", "");
        setValue("precioCompra","");
        setValue("precioVenta","");
        setValue("minimoExistencia","");
        setValue("maximoExistencia","");
        setValue("ubicacion","");
        setFocus("codigoProveedor");

      })
    .catch(function(res){ 
      console.log(res) 
    })

  }

  const handleSearchProduct = (event) => {
     getValues("proveedor")
     fetch("http://192.168.100.13:1414/find_historico/" + getValues("proveedor") +"/" + getValues("codigoProveedor") )
       .then(response => response.json())
       .then(data => {
          console.log(data);
          setValue("descripcion",data.descripcion);
          setValue("unidadVenta",data.unidad);
          setValue("codigoProveedor", data.codigoProveedor);
          setValue("codigoBarras", data.codigoBarras);
          setValue("precioCompra",data.precioCompra);
          setValue("precioVenta",data.precioPublico);
       });

  };


  return (
    <div>
      <p> Creacion/Edicion del producto</p>
      
    <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1}>
           <Grid item xs={2}>
                <label htmlFor="codigoInterno">Codigo interno</label>
                <input id="codigoInterno" {...register("codigoInterno")}  />
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
           <Grid item xs={10}>
              
                <label htmlFor="descripcion">Descripcion del producto</label>
                <input
                  id="descripcion"
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
          

           </Grid>
           <Grid item xs={1}>
              <Button> $ </Button>
           </Grid>
           <Grid item xs={2}>

                <label htmlFor="precioVenta">Precio de venta </label>
                <input
                  id="precioVenta"
                  {...register("precioVenta")}
                />
                {errors.precioVenta && <p>{errors.precioVenta.message}</p>  }

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
