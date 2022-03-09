import React, { useRef, useContext } from 'react';
import { ApplicationContext } from '../Context';
import * as yup from "yup";
import { useSelector, useDispatch } from 'react-redux'
import { Form } from 'antd'
import { UpdateProductAction } from '../bussiness/actions/UpdateProductAction'
import { SaveProductAction } from '../bussiness/actions/SaveProductAction';
import { LoadProductHistoryAction } from '../bussiness/actions/LoadProductHistoryAction'
import { useFormik } from 'formik'
import Select from '../ComponentsHtml/Select'
import TextInput from '../ComponentsHtml/TextInput'
import CheckBox from '../ComponentsHtml/CheckBox';
import { Search } from 'react-bootstrap-icons';


const porcentajes = [
  { title: '10%  23.00', porcentaje: 10 },
  { title: '15%  24.00', porcentaje: 15 },
  { title: '20%  30.00', porcentaje: 20 }
];

const FormProduct = ({formInstance, hideModal, mode = "Editar"})  => {
  const [add, setAdd] = React.useState(true);
  const value = useContext(ApplicationContext);
  const [precioCompraHistorico, setPrecioCompraHistorico] = React.useState("");
  const [precioVentaHistorico, setPrecioVentaHistorico] = React.useState("");
  const { proveedores, findProveedores } = value
  const proveedorRef = useRef()
  const [ disabledCodigoInterno, setDisabledCodigoInterno] = React.useState(false)

  const EditProduct = useSelector(store => store.editProduct);
  const dispatch = useDispatch()
  const historyProduct = useSelector(store => store.historyProduct)
  const saveProduct = useSelector(store => store.saveProduct)

  const formik = useFormik({
    initialValues : initialValues(),
    validationSchema: yup.object().shape(validationSchema()),
    onSubmit : (formData) => {
       console.log("Envio de formulario: " + mode)
       console.log(formData)
       if (mode == "Editar"){
          dispatch(UpdateProductAction(formData))
       }else{
          dispatch(SaveProductAction(formData))
       }
      
    }
  })
  

  React.useEffect ( () => {
       if (EditProduct && 'data' in EditProduct && EditProduct.isOk === true) {
         populateForm(EditProduct.data, EditProduct.dataHistorico)
       }

  }, [EditProduct])

  React.useEffect( () => {

    if (saveProduct && 'saveProductPurge' in saveProduct){
         setPrecioCompraHistorico("");
        setPrecioVentaHistorico(""); 
        formik.resetForm()
        formik.setValues("proveedor", proveedorRef.current.value)
    }

    if (saveProduct && 'resultSaveError' in saveProduct && saveProduct.resultSaveError.isOk == true) {
      if (saveProduct.resultSaveError.errorCode == "404") {
        alert ("El registro esta duplicado")
      }else {
        alert ("Ocurrio un error a")
      }
      
    }

    if (saveProduct && 'resultSave' in saveProduct && saveProduct.resultSave.isOk == true) {
       hideModal()
    }

 
  },[saveProduct])

  React.useEffect(() => { 
    setPrecioCompraHistorico("");
    setPrecioVentaHistorico("");     
    if (historyProduct && 'dataHistorico' in historyProduct && historyProduct.isOk == true ){
      const dataHistorico = historyProduct.dataHistorico
      formik.setFieldValue("descripcion",dataHistorico.descripcion);
      formik.setFieldValue("unidadVenta",dataHistorico.unidad);
      formik.setFieldValue("codigoProveedor", dataHistorico.codigoProveedor);
      formik.setFieldValue("codigoBarras", dataHistorico.codigobarras);
      formik.setFieldValue("precioCompra",dataHistorico.precioCompra);
      formik.setFieldValue("precioVenta",dataHistorico.precioPublico);
      formik.setFieldValue("existencia","1");
      formik.setFieldValue("minimoExistencia","1");
      formik.setFieldValue("maximoExistencia","3");
      formik.setFieldValue("ubicacion","UNKNOW");
      formik.setFieldValue("puedeVenderse",true);
      setPrecioCompraHistorico(dataHistorico.precioCompra);
      setPrecioVentaHistorico(dataHistorico.precioPublico);
    }

  }, [historyProduct])
  
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

  const handleSearchProduct = () => {
     dispatch(LoadProductHistoryAction({proveedorId: formik.values.proveedor , codigoProveedor: formik.values.codigoProveedor}))
  }

  const handleSearchByCodeBar = () => {
    dispatch(LoadProductHistoryAction({proveedorId: formik.values.proveedor , codigoProveedor: formik.values.codigoBarras}))
 }

  const changePrice = () => {
    formik.setFieldValue("precioCompra",precioCompraHistorico);
    if (precioVentaHistorico && precioVentaHistorico > 0) {
      formik.setFieldValue("precioVenta", precioVentaHistorico)
    }
  }
  
  
  return (
    <div>

      <Form form={formInstance} onFinish={formik.handleSubmit} layout="vertical">
        <div className="row">
           <div className="col-md-5">
               <TextInput 
                   label = "Codigo interno"
                   value = {formik.values.codigoInterno}
                   error = {formik.errors.codigoInterno}
                   onChange={(evt) => formik.setFieldValue("codigoInterno", evt.target.value)} />
            </div>

            <div className="col-md-2">
            </div>
            <div className="col-md-5">
                  <Select ref={proveedorRef} 
                     label = "Proveedor"
                     options = {proveedores}
                     onChange={(evt) => {
                            console.log("select evt")
                            console.log(evt)
                            formik.setFieldValue("proveedor", evt.target.value)
                          }
                      } />

              {formik.errors.proveedor && <p>{formik.errors.proveedor}</p>  }

           </div>
       </div>

        <div className="row">
           <div className="col-md-4">
                <TextInput 
                        label = "Codigo proveedor"
                        value = {formik.values.codigoProveedor}
                        error = {formik.errors.codigoProveedor}
                        onChange={(evt) => formik.setFieldValue("codigoProveedor", evt.target.value)} />

           </div>
           <div className="col-md-2">
               <button  type="button" className="btn btn-primary" onClick={handleSearchProduct} disabled={false}>
                  <Search />
               </button>
           </div>
           <div className="col-md-4" > 
                 <TextInput 
                        label = "Codigo barras"
                        value = {formik.values.codigoBarras}
                        error = {formik.errors.codigoBarras}
                        onChange={(evt) => formik.setFieldValue("codigoBarras", evt.target.value)} />
           </div>
           <div className="col-md-2">
             <button   type="button" className="btn btn-primary"  onClick={handleSearchByCodeBar} disabled={false} >
                <Search />
             </button>
           </div> 
        </div>
 
        <div className="row">
           <div className="col-md-12">
                  <TextInput 
                        label = "Descripcion"
                        value = {formik.values.descripcion}
                        error = {formik.errors.descripcion}
                        onChange={(evt) => formik.setFieldValue("descripcion", evt.target.value)} />
            </div>
         </div>
              
        <div className="row">
           <div className="col-md-2">
                    <TextInput 
                        label = "Precio compra"
                        value = {formik.values.precioCompra}
                        error = {formik.errors.precioCompra}
                        onChange={(evt) => formik.setFieldValue("precioCompra", evt.target.value)} />
                  {precioCompraHistorico != "" && <div> <a onClick={() =>changePrice() }>{precioCompraHistorico}</a> </div>}
           </div>
           <div className="col-md-1">

           </div>
           <div className="col-md-2">
                  <TextInput 
                        label = "Precio venta"
                        value = {formik.values.precioVenta}
                        error = {formik.errors.precioVenta}
                        onChange={(evt) => formik.setFieldValue("precioVenta", evt.target.value)} />
                  {precioVentaHistorico != "" && <div> <p>{precioVentaHistorico}</p> </div>}
           </div>
           <div className="col-md-1">
             
           </div>
           <div className="col-md-2">  
                   <TextInput 
                        label = "Unidad venta"
                        value = {formik.values.unidadVenta}
                        error = {formik.errors.unidadVenta}
                        onChange={(evt) => formik.setFieldValue("unidadVenta", evt.target.value)} />
          </div>

        </div>

        <div className='row'>
           <div className="col-md-2">
                 <TextInput 
                        label = "Existencia"
                        value = {formik.values.existencia}
                        error = {formik.errors.existencia}
                        onChange={(evt) => formik.setFieldValue("existencia", evt.target.value)} />
           </div>
           <div className="col-md-1">

           </div>
           <div className="col-md-2">
                   <TextInput 
                        label = "Minimo existencia"
                        value = {formik.values.minimoExistencia}
                        error = {formik.errors.minimoExistencia}
                        onChange={(evt) => formik.setFieldValue("minimoExistencia", evt.target.value)} />
           </div>
           <div className="col-md-1">
             
           </div>
           <div className="col-md-2">
                  <TextInput 
                        label = "Maximo existencia"
                        value = {formik.values.maximoExistencia}
                        error = {formik.errors.maximoExistencia}
                        onChange={(evt) => formik.setFieldValue("maximoExistencia", evt.target.value)} />
           </div>


        </div>

        <div className="row">
          <div className="col-md-2">
                  <TextInput 
                        label = "Ubicacion"
                        value = {formik.values.ubicacion}
                        error = {formik.errors.ubicacion}
                        onChange={(evt) => formik.setFieldValue("ubicacion", evt.target.value)} />
          </div> 
          <div className="col-md-1"></div>
          <div className="col-md-2">
             <CheckBox 
                        label = "Puede venderse"
                        checked={formik.values.puedeVenderse}
                        error = {formik.errors.puedeVenderse}
                        onChange={(evt) => formik.setFieldValue("puedeVenderse", evt.target.checked)} />
               
          </div> 
        </div>

       </Form>    
 
	      

    </div>
  );
}

function initialValues() {
  return {
     codigoInterno: "1",
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


function validationSchema() {
  return {
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
  }
}

export default FormProduct;
