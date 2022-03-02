import React, { Component, useRef, useContext } from 'react';
import { Link, useParams } from 'react-dom';
import { ApplicationContext } from '../Context';
import { useForm, Controller  } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { TextField, Button, Grid, Icon, FormControl,  FormHelperText } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { Form, Input, InputNumber, Checkbox } from 'antd'
import { UpdateProductAction } from '../bussiness/actions/UpdateProductAction'
import { useFormik } from 'formik'
import Select from '../ComponentsHtml/Select/Select'

const { Option } = Select;

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
  const proveedorRef = useRef()
  const codigoInternoRef = useRef()
  const [ disabledCodigoInterno, setDisabledCodigoInterno] = React.useState(false)
  const { register, setValue, setFocus, getValues, handleSubmit, control,  formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const { parametros } = value;
  const EditProduct = useSelector(store => store.editProduct);
  const dispatch = useDispatch()
  const puedeVenderseRef = useRef();

  const formik = useFormik({
    initialValues : initialValues(),
    onSubmit : (formData) => {
       console.log("Envio de formulario")
       dispatch(UpdateProductAction(formData))
       console.log(formData)
    }
  })
  

  React.useEffect(() => {
     setValue("codigoInterno","0");
     //setFocus("codigoProveedor");
  }, [setFocus]);

  React.useEffect ( () => {
     if (EditProduct && 'data' in EditProduct && EditProduct.isOk === true) {
      populateForm(EditProduct.data, EditProduct.dataHistorico)
    }else{
      formik.resetForm()
    }

  }, [EditProduct])
  

  const handleSearchProduct = (event) => {
     setPrecioCompraHistorico("");
     setPrecioVentaHistorico("");    
     setAdd(true);
     fetch(parametros['URL_API_BASE'] + "/find_historico/" + getValues("proveedor") +"/" + getValues("codigoProveedor") )
       .then(response => response.json())
       .then(data => {
          console.log(data);
          formik.setFieldValue("descripcion",data.descripcion);
          formik.setFieldValue("unidadVenta",data.unidad);
          formik.setFieldValue("codigoProveedor", data.codigoProveedor);
          formik.setFieldValue("codigoBarras", data.codigobarras);
          formik.setFieldValue("precioCompra",data.precioCompra);
          formik.setFieldValue("precioVenta",data.precioPublico);
          formik.setFieldValue("existencia","1");
          formik.setFieldValue("minimoExistencia","1");
          formik.setFieldValue("maximoExistencia","3");
          formik.setFieldValue("ubicacion","UNKNOW");
          formik.setFieldValue("puedeVenderse",true);
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
         formik.setFieldValue("descripcion",data.description);
         formik.setFieldValue("unidadVenta",data.unidadVenta);
         formik.setFieldValue("proveedor",data.proveedorId);
         formik.setFieldValue("codigoProveedor", data.codigoProveedor);
         formik.setFieldValue("codigoBarras", data.barcode);
         formik.setFieldValue("precioCompra",data.precioCompra);
         formik.setFieldValue("precioVenta",data.precioVenta);
         formik.setFieldValue("existencia", data.existencia);
         formik.setFieldValue("minimoExistencia",data.minimoExistencia);
         formik.setFieldValue("maximoExistencia",data.maximoExistencia);
         formik.setFieldValue("puedeVenderse", data.puedeVenderse);  
         formik.setFieldValue("ubicacion", data.ubicacion);

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
        formik.setFieldValue("codigoInterno",data.codigointerno);
        formik.setFieldValue("descripcion",data.description);
        formik.setFieldValue("unidadVenta",data.unidadVenta);
        formik.setFieldValue("proveedor",data.proveedorId);
        //formik.setFieldValue("proveedor",5);
        formik.setFieldValue("codigoProveedor", data.codigoProveedor);
        formik.setFieldValue("codigoBarras",data.barcode);
        formik.setFieldValue("precioCompra",data.precioCompra);
        formik.setFieldValue("precioVenta",data.precioVenta);
        formik.setFieldValue("existencia", data.existencia);
        formik.setFieldValue("minimoExistencia",data.minimoExistencia);
        formik.setFieldValue("maximoExistencia",data.maximoExistencia);
        formik.setFieldValue("puedeVenderse",data.puedeVenderse);  
        formik.setFieldValue("ubicacion", data.ubicacion);
        proveedorRef.current.value = data.proveedorId

        if (dataHistorico){
          setPrecioCompraHistorico(dataHistorico.precioCompra);
          setPrecioVentaHistorico(dataHistorico.precioPublico);
        }
     }else{
      formik.resetForm()
      setAdd(true)
    }

   };



  const changePrice = () => {
    formik.setFieldValue("precioCompra",precioCompraHistorico);
    formik.setFieldValue("precioVenta");
  }
  
  
  return (
    <div>

      <Form form={formInstance} onFinish={formik.handleSubmit} layout="vertical">
        <Grid container spacing={1}>
           <Grid item xs={2}>
               <Form.Item  label="Codigo interno:"> 
                 <InputNumber placeholder="input placeholder" 
                     value={formik.values.codigoInterno}
                     onChange={(evt) => formik.setFieldValue("codigoInterno", evt.target.value)} />
               </Form.Item>

                <Button variant="contained"  variant="contained" onClick={handleSearchProductByCodigoInterno} color="primary" >
                   <Icon>search</Icon>
                </Button>
                {errors.codigoInterno && <p>{errors.codigoInterno.message}</p>     }
                

            </Grid>
            <Grid item xs={1}>
            </Grid>
            <Grid item xs={8}>
                  <Select ref={proveedorRef} 
                     label = "Proveedor"
                     options = {proveedores}
                     onChange={(evt) => {
                            console.log("select evt")
                            console.log(evt)
                            formik.setFieldValue("proveedor", evt.target.value)
                          }
                      } />

              {errors.proveedor && <p>{errors.proveedor.message}</p>  }

           </Grid>
       </Grid>

        <Grid container spacing={1}>
           <Grid item xs={2}>
                <Form.Item label="Codigo proveedor">
                    <Input placeholder="input placeholder"
                     value={formik.values.codigoProveedor}
                     onChange={(evt) => formik.setFieldValue("codigoProveedor", evt.target.value)} />
                 </Form.Item>

                {errors.codigoProveedor && <p>{errors.codigoProveedor.message}</p>  }

           </Grid>
           <Grid item xs={1}>
               <Button variant="contained"  variant="contained" onClick={handleSearchProduct} disabled={false} color="primary" >
                  <Icon>search</Icon>
               </Button>
           </Grid>
           <Grid item xs={3} > 
                 <Form.Item label="Codigo barras">
                    <Input placeholder="Codigo de barras" 
                          value={formik.values.codigoBarras}
                          onChange={(evt) => formik.setFieldValue("codigoBarras", evt.target.value)} />
                 </Form.Item>
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
                 <Form.Item label="Descripcion">
                    <Input placeholder="Descripcion" 
                      value={formik.values.descripcion}
                      onChange={(evt) => formik.setFieldValue("descripcion", evt.target.value)} />
                 </Form.Item>
                 {errors.descripcion && <FormHelperText id="my-helper-text">{errors.descripcion.message}</FormHelperText> }
  
            </Grid>
         </Grid>
              
        <Grid container spacing={1}>
           <Grid item xs={2}>
                  <Form.Item label="Precio compra">
                    <InputNumber placeholder="Precio de compra" 
                           value={formik.values.precioCompra}
                           onChange={(evt) => formik.setFieldValue("precioCompra", evt.target.value)} />
                 </Form.Item>
                {errors.precioCompra && <p>{errors.precioCompra.message}</p> }
                {precioCompraHistorico != "" && <div> <a  onClick={changePrice} >{precioCompraHistorico} </a>  </div>}

           </Grid>
           <Grid item xs={1}>

           </Grid>
           <Grid item xs={2}>
                 <Form.Item label="Precio venta">
                    <InputNumber placeholder="Precio de venta" 
                           value={formik.values.precioVenta}
                           onChange={(evt) => formik.setFieldValue("precioVenta", evt.target.value)} />
                 </Form.Item>
                {errors.precioVenta && <p>{errors.precioVenta.message}</p>  }
                {precioVentaHistorico != "" && <div> <p>{precioVentaHistorico}</p> </div>}
           </Grid>
           <Grid item xs={1}>
             <Button> </Button>
           </Grid>
           <Grid item xs={2}>  
                 <Form.Item label="Unidad venta">
                    <Input placeholder="Unidad de venta" 
                           value={formik.values.unidadVenta}
                           onChange={(evt) => formik.setFieldValue("unidadVenta", evt.target.value)} />
                 </Form.Item>
                 {errors.unidadVenta && <p>{errors.unidadVenta.message}</p>  }
          </Grid>

        </Grid>

        <Grid container spacing={1}>
           <Grid item xs={2}>
                 <Form.Item label="existencia">
                    <InputNumber placeholder="Existencia"
                     value={formik.values.existencia}
                     onChange={(evt) => formik.setFieldValue("existencia", evt.target.value)} />
                 </Form.Item>
                {errors.existencia && <p>{errors.existencia.message}</p>  }

           </Grid>
           <Grid item xs={1}>

           </Grid>
           <Grid item xs={2}>
                 <Form.Item label="Minimo existencia">
                    <InputNumber placeholder="Minimo Existencia" 
                          value={formik.values.minimoExistencia}
                          onChange={(evt) => formik.setFieldValue("minimoExistencia", evt.target.value)} />
                 </Form.Item>

                {errors.minimoExistencia && <p>{errors.minimoExistencia.message}</p>  }
 
           </Grid>
           <Grid item xs={1}>
             
           </Grid>
           <Grid item xs={2}>
                 <Form.Item label="Maximo existencia">
                    <InputNumber placeholder="Maximo Existencia" 
                           value={formik.values.maximoExistencia}
                           onChange={(evt) => formik.setFieldValue("maximoExistencia", evt.target.value)} />
                 </Form.Item>
               
                {errors.maximoExistencia && <p>{errors.maximoExistencia.message}</p>  }

           </Grid>


        </Grid>

        <Grid container spacing={1}>
          <Grid item xs={2}>
                 <Form.Item label="ubicacion">
                    <Input placeholder="ubicacion" 
                           value={formik.values.ubicacion}
                           onChange={(evt) => formik.setFieldValue("ubicacion", evt.target.value)} />
                 </Form.Item>
                {errors.ubicacion && <p>{errors.ubicacion.message}</p>  }

               
          </Grid> 
          <Grid item xs={1}></Grid>
          <Grid item xs={2}>
             <Form.Item name="puedeVenderse" label="Puede venderse" valuePropName='value' >
             <Checkbox
                  checked={formik.values.puedeVenderse}
                  onChange={(evt) => {
                    formik.setFieldValue("puedeVenderse", evt.target.checked)
                    console.log("Que trae evt")
                    console.log(evt)
                   }}  
               >
                 
               </Checkbox>
             </Form.Item>
             {errors.puedeVenderse && <p>{errors.puedeVenderse.message}</p>  }

               
          </Grid> 
        </Grid>

       </Form>    
 
	      

    </div>
  );
}

function initialValues() {
  return {
     codigoInterno: "",
     proveedor: "",
     codigoProveedor: "",
     codigoBarras: "",
     descripcion: "",
     precioCompra: 0,
     precioVenta: 0,
     unidadVenta: "PZA",
     existencia: 1,
     minimoExistencia: 1,
     maximoExistencia: 3,
     ubicacion : "UNK",
     puedeVenderse: true
  }
}

export default FormProduct;
