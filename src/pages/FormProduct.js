import React, { useRef, useContext, useCallback } from 'react';
import { ApplicationContext } from '../Context';
import * as yup from "yup";
import { useSelector, useDispatch } from 'react-redux'
import { Form, Tabs } from 'antd'
import { UpdateProductAction } from '../bussiness/actions/UpdateProductAction'
import { SaveProductAction } from '../bussiness/actions/SaveProductAction';
import { LoadProductHistoryAction } from '../bussiness/actions/LoadProductHistoryAction'
import { UpdateGlobalProductAction } from '../bussiness/actions/UpdateGlobalProductAction';
import { useFormik } from 'formik'
import Select from '../ComponentsHtml/Select'
import TextInput from '../ComponentsHtml/TextInput'
import CheckBox from '../ComponentsHtml/CheckBox';
import TextArea from '../ComponentsHtml/TextArea';
import { Search } from 'react-bootstrap-icons';


const porcentajes = [
  { title: '10%  23.00', porcentaje: 10 },
  { title: '15%  24.00', porcentaje: 15 },
  { title: '20%  30.00', porcentaje: 20 }
];

const FormProduct = ({formInstance, hideModal, enterLoading, mode = "Editar"})  => {
  const [add, setAdd] = React.useState(true);
  const [showMaxMin, setShowMaxMin] = React.useState(true);

  const handleReabastecimientoChange = (evt) => {
    const value = evt.target.value;
    setShowMaxMin(value === "0");
    formik.setFieldValue("tipoSurtido", value);
  };
  const value = useContext(ApplicationContext);
  const [precioCompraHistorico, setPrecioCompraHistorico] = React.useState("");
  const [precioVentaHistorico, setPrecioVentaHistorico] = React.useState("");
  const [descOriginalProveedor, setDescOriginalProveedor] = React.useState("");
  const { proveedores, findProveedores } = value
  const proveedorRef = useRef()
  const selectReabastecimientoRef = useRef()
  const [listTipoReabastecimiento, setListTipoReabastecimiento] = React.useState([])
  const [ disabledCodigoInterno, setDisabledCodigoInterno] = React.useState(false)

  const EditProduct = useSelector(store => store.editProduct);
  const dispatch = useDispatch()
  const historyProduct = useSelector(store => store.historyProduct)
  const saveProduct = useSelector(store => store.saveProduct)
  const [dataProuduct,setDataProduct] = React.useState({});

  const formik = useFormik({
    initialValues : initialValues(),
    validationSchema: yup.object().shape(validationSchema()),
    onSubmit : (formData) => {
       console.log("Envio de formulario: " + mode)
       console.log(formData)
       if (mode == "Editar"){
          dispatch(UpdateProductAction(formData))
          setDataProduct(formData);
       }else{
          dispatch(SaveProductAction(formData))
       }
      
    }
  })
  
  React.useEffect ( () => {
    setListTipoReabastecimiento( [
      {label: "Maximos y minimos", value: "0"},
      {label: "Solicitar inmediato", value: "1"}
    ]);

  },[])

  React.useEffect ( () => {
       if (mode != "Editar"){
         return
       }

       if (EditProduct && 'data' in EditProduct && EditProduct.isOk === true) {
         populateForm(EditProduct.data, EditProduct.dataHistorico)
       }

  }, [EditProduct])

  React.useEffect( () => {

    if (mode != "Create"){
      return
    }

    if (saveProduct && 'saveProductPurge' in saveProduct){
        setPrecioCompraHistorico("");
        setPrecioVentaHistorico(""); 
        setDescOriginalProveedor("");
        (async () => {
            await formik.setValues(initialValues())   
            formik.setFieldError("descripcion", "");
            await formik.setFieldValue("proveedor", proveedorRef.current.value);
            await formik.setFieldValue("tipoSurtido", "0");

            formik.setErrors({errors : {}})
            enterLoading(0,false);
            
        }) ();
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
    setDescOriginalProveedor("");  
    if (historyProduct && 'dataHistorico' in historyProduct && historyProduct.isOk == true ){
      populateHistory(historyProduct.dataHistorico);
    }

  }, [historyProduct])


  const populateHistory = async ( dataHistorico ) => {
    await formik.setFieldValue("descripcion", dataHistorico.descripcion != null ? dataHistorico.descripcion.toUpperCase() :"");
    await formik.setFieldValue("unidadVenta",dataHistorico.unidad);
    await formik.setFieldValue("codigoProveedor", dataHistorico.codigoProveedor);
    await formik.setFieldValue("codigoBarras", dataHistorico.codigobarras);
    await formik.setFieldValue("precioCompra",dataHistorico.precioCompra);
    await formik.setFieldValue("precioVenta",dataHistorico.precioPublico);
    await formik.setFieldValue("existencia","1");
    await formik.setFieldValue("minimoExistencia","1");
    await formik.setFieldValue("maximoExistencia","3");
    await formik.setFieldValue("ubicacion","UNKNOW");
    await formik.setFieldValue("puedeVenderse",true);
    setPrecioCompraHistorico(dataHistorico.precioCompra);
    setPrecioVentaHistorico(dataHistorico.precioPublico);
    setDescOriginalProveedor(dataHistorico.descripcion != null ? dataHistorico.descripcion.toUpperCase() :"");

  }
  
  const populateForm = async (data, dataHistorico) => {
    setDisabledCodigoInterno(false)
    if (data){
        setDisabledCodigoInterno(true)
        setAdd(false)
        setPrecioCompraHistorico("");
        setPrecioVentaHistorico("");
        setDescOriginalProveedor("");
        await formik.setFieldValue("codigoInterno",data.codigointerno);
        await  formik.setFieldValue("descripcion",data.description);
        await  formik.setFieldValue("unidadVenta",data.unidadVenta);
        await  formik.setFieldValue("proveedor",data.proveedorId);
        await  formik.setFieldValue("codigoProveedor", data.codigoProveedor);
        await  formik.setFieldValue("codigoBarras",data.barcode);
        await  formik.setFieldValue("precioCompra",data.precioCompra);
        await  formik.setFieldValue("precioVenta",data.precioVenta);
        await  formik.setFieldValue("existencia", data.existencia);
        await  formik.setFieldValue("minimoExistencia",data.minimoExistencia);
        await  formik.setFieldValue("maximoExistencia",data.maximoExistencia);
        await  formik.setFieldValue("puedeVenderse",data.puedeVenderse);  
        await  formik.setFieldValue("ubicacion", data.ubicacion);
        await  formik.setFieldValue("unidadCompra", data.unidadCompra);
        await  formik.setFieldValue("cantPorUnidadCompra", data.cantPorUnidadCompra);
        await  formik.setFieldValue("cantPorUnidadVenta", data.cantPorUnidadVenta);
        await  formik.setFieldValue("estatusNormalizacion", data.estatusNormalizacion);
        await  formik.setFieldValue("listaPrecios", data.listaPrecios);
        await  formik.setFieldValue("descripcionCorta", data.descripcionCorta || "");
        await  formik.setFieldValue("descripcionBusqueda", data.descripcionBusqueda || "");
        await  formik.setFieldValue("costoVenta",data.costoVenta || 0);
        await  formik.setFieldValue("porcentajeUtilidad",data.porcentajeUtilidad || 0);
        await  formik.setFieldValue("tipoSurtido",data.tipoSurtido || "0");
        proveedorRef.current.selectedIndex = -1;
        proveedorRef.current.value = data.proveedorId  
          
        if (dataHistorico){
          setPrecioCompraHistorico(dataHistorico.precioCompra);
          setPrecioVentaHistorico(dataHistorico.precioPublico);
          setDescOriginalProveedor(dataHistorico.descripcion.toUpperCase());
        }  
     }else{
       formik.resetForm()
      setAdd(true)
    }

  }

  const handleSearchProduct = () => {
     dispatch(LoadProductHistoryAction({proveedorId: formik.values.proveedor , codigoProveedor: formik.values.codigoProveedor}))
  }

  const handleSearchByCodeBar = () => {
    dispatch(LoadProductHistoryAction({proveedorId: formik.values.proveedor , codigoProveedor: formik.values.codigoBarras}))
 }

  const  changePriceCompra = async () => {
    await formik.setFieldValue("precioCompra",precioCompraHistorico);
  }


  const handleFinish = (values) => {
    console.log("Formulario enviado:", values);
    console.log("Errores", formik.errors);
    console.log("Valores", formik.values);

    formik.validateForm().then((errors) => {
      if (Object.keys(errors).length === 0) {
        formik.handleSubmit();
      } else {
        console.log("Errores en formulario", errors);
      }
    });
    
  };

  const changeCostoVenta = async (costoVenta) => {
    await formik.setFieldValue("costoVenta", parseFloat(costoVenta).toFixed(2));
  }

  const changeGanancia = async (ganancia) => {
    await formik.setFieldValue("porcentajeUtilidad", parseFloat(ganancia).toFixed(2));
  }

  const changePrecioVenta = async (precioVenta) => {
    await formik.setFieldValue("precioVenta", parseFloat(precioVenta).toFixed(2));
  }

  const copiarDescripcionPortapales = (event) =>  {
    event.preventDefault(); // Evita comportamiento por defecto del <a>
    const texto = event.target.innerText; // Obtiene el texto del enlace
    navigator.clipboard.writeText(texto)
      .then(() => {
        console.log("Texto copiado al portapapeles:", texto);
      })
      .catch(err => {
        console.error("Error al copiar:", err);
      });
  }

  const copiarDescripcionProductoPortapales = (event) =>  {
    event.preventDefault(); // Evita comportamiento por defecto del <a>
    const texto = formik.values.descripcion;
    navigator.clipboard.writeText(texto)
      .then(() => {
        console.log("Texto copiado al portapapeles:", texto);
      })
      .catch(err => {
        console.error("Error al copiar:", err);
      });
  }
  
  return (
    <div>

<Form form={formInstance} onFinish={handleFinish} layout="vertical" >
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
                     value = {formik.values.proveedor}
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
           <div className="col-md-12">
              <p style={{fontSize: '0.8em'}}><a href="#" onClick={(evt) => {copiarDescripcionProductoPortapales(evt)}}>Producto</a> Descripcion original: <a href="#" onClick={(evt) => {copiarDescripcionPortapales(evt)}}>{descOriginalProveedor}</a></p>
           </div>
         </div>   
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="Precio de venta" key="1">
            <div className="row" >            
              <div className="col-md-2" style={{padding: '10px'}}>
                <TextInput 
                  label = "Precio venta"
                  value = {formik.values.precioVenta}
                  error = {formik.errors.precioVenta}
                  type = "number"
                  onChange={(evt) => formik.setFieldValue("precioVenta", evt.target.value)} />
                {precioVentaHistorico != "" && <div style={{fontSize: '0.6em'}}> Precio sugerido por el proveedor: <a href="#" onClick={(evt) => {evt.preventDefault(); formik.setFieldValue("precioVenta", precioVentaHistorico)}}>{precioVentaHistorico}</a> </div>}
              </div>
              <div className="col-md-2" style={{padding: '10px'}}>  
                <TextInput 
                  label = "Unidad venta"
                  value = {formik.values.unidadVenta}
                  error = {formik.errors.unidadVenta}
                  onChange={(evt) => formik.setFieldValue("unidadVenta", evt.target.value)} />
              </div>
              <div className="col-md-2" style={{padding: '10px'}}>
                <TextInput 
                  label = "Cantidad x unidad de venta"
                  value = {formik.values.cantPorUnidadVenta}
                  error = {formik.errors.cantPorUnidadVenta}
                  type = "number"
                  onChange={(evt) => formik.setFieldValue("cantPorUnidadVenta", evt.target.value)} />
                </div>
              <div className="col-md-2" style={{padding: '10px'}}>
                  <TextInput 
                    label = "Costo de venta"
                    value = {formik.values.costoVenta}
                    error = {formik.errors.costoVenta}
                    type = "number"
                    onChange={(evt) => formik.setFieldValue("costoVenta", evt.target.value)} />
                </div>
                <div className="col-md-2" style={{padding: '10px'}}>
                  <TextInput 
                    label = "% Ganancia"
                    value = {formik.values.porcentajeUtilidad}
                    error = {formik.errors.porcentajeUtilidad}
                    type = "number"
                    onChange={(evt) => formik.setFieldValue("porcentajeUtilidad", evt.target.value)} />
                </div>
            </div>

            <div className="row">
              <p> Costo venta &nbsp;
                 <a onClick={() => changeCostoVenta(formik.values.precioCompra / formik.values.cantPorUnidadCompra * formik.values.cantPorUnidadVenta)}>
                    {(formik.values.precioCompra / formik.values.cantPorUnidadCompra * formik.values.cantPorUnidadVenta).toFixed(2)}
                 </a> = Precio compra ({formik.values.precioCompra} ) / ({formik.values.cantPorUnidadCompra} ) cantidad por unidad de compra * ({formik.values.cantPorUnidadVenta} ) cantidad por unidad de venta 
              </p> 
              {formik.values.costoVenta != 0 && formik.values.porcentajeUtilidad != 0 && 
                <p> Precio de venta a partir del costo venta y porcentaje de ganancia &nbsp; $
                 <a onClick={() => changePrecioVenta((formik.values.costoVenta * (1 + (formik.values.porcentajeUtilidad / 100))).toFixed(2))}>
                    {(formik.values.costoVenta * (1 + (formik.values.porcentajeUtilidad / 100))).toFixed(2)}
                 </a> 
                </p>
               }
              {formik.values.costoVenta != 0 && formik.values.precioVenta != 0 && 
                <p> Ganancia calculada a partir del precio de venta &nbsp; %
                 <a onClick={() => changeGanancia((formik.values.precioVenta - formik.values.costoVenta) / formik.values.costoVenta * 100)}>
                    {((formik.values.precioVenta - formik.values.costoVenta) / formik.values.costoVenta * 100).toFixed(2)}
                 </a> 
                </p>
               }

            </div>
          </Tabs.TabPane>

          <Tabs.TabPane tab="Precio de compra" key="2">
            <div className="row">
              <div className="col-md-2"> 
                <TextInput 
                  label = "Precio compra"
                  value = {formik.values.precioCompra}
                  error = {formik.errors.precioCompra}
                  type = "number"
                  onChange={(evt) => formik.setFieldValue("precioCompra", evt.target.value)} />
                {precioCompraHistorico != "" && <div style={{fontSize: '0.6em'}}> Precio compra proveedor: <a onClick={() =>changePriceCompra() }>{precioCompraHistorico}</a> </div>}
              </div>
              <div className="col-md-1"></div>
              <div className="col-md-2">  
                <TextInput 
                  label = "Unidad de compra"
                  value = {formik.values.unidadCompra}
                  error = {formik.errors.unidadCompra}
                  onChange={(evt) => formik.setFieldValue("unidadCompra", evt.target.value)} />
              </div>
              <div className="col-md-1"></div>
              <div className="col-md-2">
                <TextInput 
                  label = "Cantidad x unidad de compra"
                  value = {formik.values.cantPorUnidadCompra}
                  error = {formik.errors.cantPorUnidadCompra}
                  type = "number"
                  onChange={(evt) => formik.setFieldValue("cantPorUnidadCompra", evt.target.value)} />
               </div>

            </div>
          </Tabs.TabPane>

          <Tabs.TabPane tab="Inventario" key="3">
            <div className='row'>
              <div className="col-md-2">
                <TextInput 
                  label = "Existencia"
                  value = {formik.values.existencia}
                  error = {formik.errors.existencia}
                  type = "number"
                  onChange={(evt) => formik.setFieldValue("existencia", evt.target.value)} />
              </div>
              <div className="col-md-1"></div>
              <div className="col-md-4">
                <Select ref={selectReabastecimientoRef}
                  label = "Tipo reabastecimiento"
                  options = {listTipoReabastecimiento}
                  value = {formik.values.tipoSurtido}
                  onChange={handleReabastecimientoChange} />

              </div>
            </div>
            {showMaxMin && (
              <div className='row'>
                <div className="col-md-2">
                  <TextInput 
                    label = "Minimo existencia"
                    value = {formik.values.minimoExistencia}
                    error = {formik.errors.minimoExistencia}
                    type = "number"
                    onChange={(evt) => formik.setFieldValue("minimoExistencia", evt.target.value)} />
                </div>
                <div className="col-md-1"></div>
                <div className="col-md-2">
                  <TextInput 
                    label = "Maximo existencia"
                    value = {formik.values.maximoExistencia}
                    error = {formik.errors.maximoExistencia}
                    type = "number"
                    onChange={(evt) => formik.setFieldValue("maximoExistencia", evt.target.value)} />
                </div>
              </div>
            )}

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
            </Tabs.TabPane>
            <Tabs.TabPane tab="Busqueda inteligente" key="4 ">

              <div className="row">
                <div className="col-md-11">
                      <TextInput 
                            label = "Descripcion Corta"
                            value = {formik.values.descripcionCorta}
                            error = {formik.errors.descripcionCorta}
                            onChange={(evt) => formik.setFieldValue("descripcionCorta", evt.target.value)} />
                </div>
                <div className="col-md-11">
                      <TextArea 
                            label = "Descripcion busqueda"
                            value = {formik.values.descripcionBusqueda}
                            error = {formik.errors.descripcionBusqueda}
                            onChange={(evt) => formik.setFieldValue("descripcionBusqueda", evt.target.value)} />
                </div>

                
              </div>
            </Tabs.TabPane>

            </Tabs>

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
     puedeVenderse: true,
     unidadCompra: "PZA",
     cantPorUnidadCompra: 1,
     cantPorUnidadVenta: 1,
     estatusNormalizacion: 1,
     listaPrecios: "{}",
     descripcionCorta: "",
     descripcionBusqueda: "",
     costoVenta: 0,
     porcentajeUtilidad: 0,
     tipoSurtido: "0"
  }
}
function validationSchema() {
  return {
    codigoInterno:  yup.number().positive().integer().notRequired(),
    proveedor: yup.number().required(),
    codigoProveedor: yup.string().required(),
    codigoBarras: yup.string().notRequired(),
    descripcion: yup.string().required(),
    precioCompra: yup.number().positive().required(),
    precioVenta: yup.number().positive().required(),
    unidadVenta:  yup.string().required(),
    existencia: yup.number().positive().integer().required(),
    minimoExistencia: yup.number().positive().integer().notRequired(),
    maximoExistencia: yup.number().positive().integer().notRequired(),
    puedeVenderse: yup.boolean().notRequired(),
    ubicacion: yup.string().notRequired(),
    unidadCompra: yup.string().required(),
    cantPorUnidadCompra: yup.number().positive().required(),
    cantPorUnidadVenta: yup.number().positive().required(),
    estatusNormalizacion: yup.number().positive().notRequired(),
    listaPrecios: yup.string().notRequired() ,
    descripcionCorta: yup.string().notRequired(),
    descripcionBusqueda: yup.string().notRequired(),
    costoVenta: yup.number().positive().required(),
    porcentajeUtilidad: yup.number().positive().required(),
    tipoSurtido: yup.number().required()
  }
}

export default FormProduct;
