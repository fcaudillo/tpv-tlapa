import React,  {useContext} from "react";

import { makeStyles } from "@mui/styles";
import * as yup from "yup";
import { useFormik } from "formik";
import { Form , Modal} from 'antd'
import TextInput from "../ComponentsHtml/TextInput";
import LabelText from "../ComponentsHtml/LabelText";
import { DEVOLUCION_PRODUCTO } from "../bussiness/endpoints";

const useStyles = makeStyles({
   root: {
       display: "flex",
       flexWrap: "wrap",
       justifyContent: "space-around"
   }

});

function DialogDevolucion ( props ) { 
    const {visible, setVisible, detalleMovimiento, refreshData} = props;
    const [form] = Form.useForm();
    const [sku, setSku] = React.useState("");
    const [producto, setProducto] = React.useState("");
     React.useEffect( () => {
        
                ( async () => {
                await formik.setFieldValue("cantidadDevolucion", detalleMovimiento.cantidad);
                await formik.setFieldValue("movimientoId", detalleMovimiento.movimientoId);
                await formik.setFieldValue("detalleMovimientoId", detalleMovimiento.detalleMovientoId);
                setProducto(detalleMovimiento.descripcion);

                }) ();
   
    },[detalleMovimiento])

    const formik = useFormik( {
       initialValues: initialValues(),
       validationSchema: yup.object().shape(validationSchema()),
       onSubmit: async (formData) => {
          console.log("Envio de formulario ")
          console.log(formData)

          if (formData.cantidadDevolucion > detalleMovimiento.cantidad){
            alert("No puede devolver mas de lo que se vendio")
            return;
          }
          
          devolucionProducto(formData.movimientoId, formData.detalleMovimientoId, formData.cantidadDevolucion)
    
       }    

    })

    const devolucionDetalleMovimiento = () => {
      console.log("Devolucion del detalle de movimiento")
      console.log(detalleMovimiento)
      formik.handleSubmit()
    }

    
      const devolucionProducto = async (idMovimiento,idDetalleMovimiento, cantidad) => {
        console.log("Devolucion producto: idDetalleMovimiento = " + idDetalleMovimiento)
        console.log("Devolucion producto: idMovimiento = " + idMovimiento)
        var url = DEVOLUCION_PRODUCTO + "/" + idMovimiento + "/reject/" + idDetalleMovimiento + "/" + cantidad;
        console.log("get devolucion: " + url);
     
        const response = await fetch(url,
                        {
                            headers: {
                              'Accept': 'application/json',
                              'Content-Type': 'application/json'
                            },
                            method: "GET"
                        });
        if (response.status == 200){
          console.log("devolucion exitosa--")
          
          const result = await response.json()
          refreshData(); 
          alert("devolucion exitosa")   
          setVisible(false); 
        }else{
          alert("Error en en la devolucion")
        }
      
      }
    

    return (
       <div>
         <Modal
            title="Devolucion del producto"
            centered
            visible={visible}
            onOk={() => devolucionDetalleMovimiento()}
            onCancel={() => setVisible(false)}
            width={400}
          >
            <Form form={form}  onFinish={formik.handleSubmit} layout="vertical">

                <div className="row">
                    <LabelText label="Descripcion: " text={ detalleMovimiento.descripcion } />
                </div>
                <div className="row">
                    <div className="col-md-5">
                    <TextInput 
                        label = "Cantidad a devolver"
                        value = {formik.values.cantidadDevolucion}
                        error = {formik.errors.cantidadDevolucion}
                        type = "number"
                        onChange={(evt) => formik.setFieldValue("cantidadDevolucion", evt.target.value)} />
                    </div>
                    <div className="col-md-2" />
                    <div className="col-md-5">
                       <label> Maximo a devolver : { detalleMovimiento.cantidad } </label>
                    </div>
            </div>

            </Form>

         </Modal>
       </div>

    );
}

function initialValues () {
    return {
        detalleMovimientoId: "", 
        movimientoId: "",
        cantidadDevolucion: 0
    }
}

function validationSchema () {
    return {
        detalleMovimientoId: yup.string(),
        movimientoId: yup.string(),
        cantidadDevolucion: yup.number().integer().positive().required()
    }
}

export default DialogDevolucion;