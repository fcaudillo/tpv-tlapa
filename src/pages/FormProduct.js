import React, { Component, useRef, useContext } from 'react';
import { Link, useParams } from 'react-dom';
import { ApplicationContext } from '../Context';
import { useForm, Controller  } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Cookies from 'js-cookie'
import { TextField, Button, Grid, Icon, FormControl, Input, FormHelperText } from '@mui/material';
import { useHistory } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import { useSelector, useDispatch } from 'react-redux'
import { Form } from 'antd'
import { UpdateProductAction } from '../bussiness/actions/UpdateProductAction'


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

const FormProduct = ({formInstance, hideModal})  => {
  const [add, setAdd] = React.useState(true);
  const value = useContext(ApplicationContext);
  const history = useHistory();
  const [precioCompraHistorico, setPrecioCompraHistorico] = React.useState("");
  const [precioVentaHistorico, setPrecioVentaHistorico] = React.useState("");
  const { proveedores, findProveedores } = value
  const codigoProveedorRef = useRef()
  const codigoInternoRef = useRef()
  const [ disabledCodigoInterno, setDisabledCodigoInterno] = React.useState(false)
  const { register, setValue, setFocus, getValues, handleSubmit, control,  formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const { parametros } = value;
  const EditProduct = useSelector(store => store.editProduct);
  const dispatch = useDispatch()
  

  React.useEffect(() => {
     setValue("codigoInterno","0");
     //setFocus("codigoProveedor");
  }, [setFocus]);

  React.useEffect ( () => {
     if (EditProduct && 'data' in EditProduct && EditProduct.isOk === true) {
      populateForm(EditProduct.data, EditProduct.dataHistorico)
    }else{
      clearForm()
    }

  }, [EditProduct])
  

  const onSubmit2 = (data) => {   
    console.log("Modificando el state nuevo ");
    dispatch(UpdateProductAction(data))
    console.log(data);
  }

  const onSubmit = (dataNew) => {
    dispatch(actions.updateDataFormProduct({data: dataNew, dataHistorico: dataHistorico}))
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

   const populateForm = (data, dataHistorico) => {
    setDisabledCodigoInterno(false)
    if (data){
        setDisabledCodigoInterno(true)
        setAdd(false)
        setPrecioCompraHistorico("");
        setPrecioVentaHistorico("");
        setValue("codigoInterno",data.codigointerno);
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
        if (dataHistorico){
          setPrecioCompraHistorico(dataHistorico.precioCompra);
          setPrecioVentaHistorico(dataHistorico.precioPublico);
        }
     }else{
      clearForm()
      setAdd(true)
    }

   };

  const clearForm = () => {
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
  }


  const changePrice = () => {
    setValue("precioCompra",precioCompraHistorico);
    setFocus("precioVenta");
  }
  
  
  return (
    <div>
      <p> Creacion/Edicion del producto</p>
     
      <Form form={formInstance}  onFinish={handleSubmit(onSubmit2)}>
        <Grid container spacing={1}>
           <Grid item xs={2}>
              <Controller
                  name="codigoInterno"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'First name required' }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      label="Codigo interno"
                      ref = {codigoInternoRef}
                      disabled = {disabledCodigoInterno}
                      variant="standard"
                      value={value}
                      onChange={onChange}
                    />
                    )}  
                />
             
                <Button variant="contained"  variant="contained" onClick={handleSearchProductByCodigoInterno} color="primary" >
                   <Icon>search</Icon>
                </Button>
                {errors.codigoInterno && <p>{errors.codigoInterno.message}</p>     }
                

            </Grid>
            <Grid item xs={1}>
            </Grid>
            <Grid item xs={8}>
              <label htmlFor="proveedor">Proveedor</label>
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
                <Controller
                        name="codigoProveedor"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'codigo proveedor required' }}
                        render={({ field: { onChange, value } }) => (
                          <TextField
                            ref={codigoProveedorRef}
                            label="Codigo proveedor"
                            variant="standard"
                            value={value}
                            onChange={onChange}
                          />
                          )}  
                />
                {errors.codigoProveedor && <p>{errors.codigoProveedor.message}</p>  }

           </Grid>
           <Grid item xs={1}>
               <Button variant="contained"  variant="contained" onClick={handleSearchProduct} disabled={false} color="primary" >
                  <Icon>search</Icon>
               </Button>
           </Grid>
           <Grid item xs={3} > 
                  <Controller
                        name="codigoBarras"
                        control={control}
                        defaultValue=""
                        style ={{width: '100%'}}
                        rules={{ required: 'codigo barras required' }}
                        render={({ field: { onChange, value } }) => (
                          <TextField
                            label="Codigo barras"
                            variant="standard"
                            value={value}
                            onChange={onChange}
                          />

                         
                          )}  
                />   
                
                {errors.codigoBarras && <p>{errors.codigoBarras.message}</p>  }

           </Grid>
           <Grid item xs={1}>
             <Button variant="contained" variant="contained" disabled={false} color="primary" >
                 <Icon>search</Icon>
             </Button>
           </Grid> 
        </Grid>

        <Grid container spacing={1}>
           <Grid item xs={12}>
                <Controller
                        name="descripcion"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'description required' }}
                        render={({ field: { onChange, value } }) => (
                          <FormControl fullWidth={true}>
                            <InputLabel htmlFor="descripcion">Descripcion</InputLabel>
                            <Input id="descripcion" 
                                    aria-describedby="my-helper-text" 
                                    value={value}
                                    onChange={onChange}    
                            />
                            {errors.descripcion && <FormHelperText id="my-helper-text">{errors.descripcion.message}</FormHelperText> }
                          </FormControl>
                          )}  
                />  
                

            </Grid>
         </Grid>
              
        <Grid container spacing={1}>
           <Grid item xs={2}>
                <Controller
                        name="precioCompra"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'precio compra required' }}
                        render={({ field: { onChange, value } }) => (
                          <TextField
                            label="Precio compra"
                            variant="standard"
                            value={value}
                            onChange={onChange}
                          />
                          )}  
                />                  
                {errors.precioCompra && <p>{errors.precioCompra.message}</p> }
                {precioCompraHistorico != "" && <div> <a  onClick={changePrice} >{precioCompraHistorico} </a>  </div>}

           </Grid>
           <Grid item xs={1}>

           </Grid>
           <Grid item xs={2}>
                <Controller
                        name="precioVenta"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'precio venta required' }}
                        render={({ field: { onChange, value } }) => (
                          <TextField
                            label="Precio venta"
                            variant="standard"
                            value={value}
                            onChange={onChange}
                          />
                          )}  
                />
                {errors.precioVenta && <p>{errors.precioVenta.message}</p>  }
                {precioVentaHistorico != "" && <div> <p>{precioVentaHistorico}</p> </div>}
           </Grid>
           <Grid item xs={1}>
             <Button> </Button>
           </Grid>
           <Grid item xs={2}>  
                 <Controller
                        name="unidadVenta"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'Unidad venta required' }}
                        render={({ field: { onChange, value } }) => (
                          <TextField
                            label="Unidad de venta"
                            variant="standard"
                            value={value}
                            onChange={onChange}
                          />
                          )}  
                />                  
                 {errors.unidadVenta && <p>{errors.unidadVenta.message}</p>  }
          </Grid>

        </Grid>

        <Grid container spacing={1}>
           <Grid item xs={2}>
                 <Controller
                        name="existencia"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'Existencia required' }}
                        render={({ field: { onChange, value } }) => (
                          <TextField
                            label="Existencia"
                            variant="standard"
                            value={value}
                            onChange={onChange}
                          />
                          )}  
                />  
                 {errors.existencia && <p>{errors.existencia.message}</p>  }

           </Grid>
           <Grid item xs={1}>

           </Grid>
           <Grid item xs={2}>
                  <Controller
                        name="minimoExistencia"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'Minimo existencia required' }}
                        render={({ field: { onChange, value } }) => (
                          <TextField
                            label="Minimo existencia"
                            variant="standard"
                            value={value}
                            onChange={onChange}
                          />
                          )}  
                /> 
                {errors.minimoExistencia && <p>{errors.minimoExistencia.message}</p>  }
 
           </Grid>
           <Grid item xs={1}>
             
           </Grid>
           <Grid item xs={2}>
               <Controller
                        name="maximoExistencia"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'Maxicmo existencia required' }}
                        render={({ field: { onChange, value } }) => (
                          <TextField
                            label="Maximo existencia"
                            variant="standard"
                            value={value}
                            onChange={onChange}
                          />
                          )}  
                />               
                {errors.maximoExistencia && <p>{errors.maximoExistencia.message}</p>  }

           </Grid>


        </Grid>

        <Grid container spacing={1}>
          <Grid item xs={2}>
                 <Controller
                        name="ubicacion"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'Ubicacion required' }}
                        render={({ field: { onChange, value } }) => (
                          <TextField
                            label="Ubicacion"
                            variant="standard"
                            value={value}
                            onChange={onChange}
                          />
                          )}  
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
       </Form>    
 
	      

    </div>
  );
}

export default FormProduct;
