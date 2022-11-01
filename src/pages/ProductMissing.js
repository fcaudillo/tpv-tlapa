import React,  {useContext} from "react";
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../actions'
import { makeStyles } from "@mui/styles";
import * as yup from "yup";
import { useFormik } from "formik";
import { Form , Modal} from 'antd'
import TextInput from "../ComponentsHtml/TextInput";
import LabelText from "../ComponentsHtml/LabelText";
import { async } from "rxjs";
import { URL_PRODUCT_MISSING } from "../bussiness/endpoints"

const useStyles = makeStyles({
   root: {
       display: "flex",
       flexWrap: "wrap",
       justifyContent: "space-around"
   }

});

function ProductMissing ( props ) {
    const [ sku, setSku ] = React.useState("");
    const [ producto, setProducto ] = React.useState("");
    const [ visible, setVisible] = React.useState(false);
    const dataProductMissing = useSelector( store => store.productMissing)
    const [form] = Form.useForm();
    const instanceDialog = props.instanceDialog;

    React.useEffect( () => {
        
       if (dataProductMissing && 'data' in dataProductMissing && dataProductMissing.isOk === true ) {
           if ('instanceDialog' in dataProductMissing && dataProductMissing.instanceDialog == instanceDialog){
                console.log ("CArgar datos del producto faltante");
                var data = dataProductMissing.data;
            
    
                setSku(data.sku);
                setProducto(data.description);
                ( async () => {
                await formik.setFieldValue("sku", data.sku);
                await formik.setFieldValue("cantidadExistencia", data.cantidadExistencia);
                await formik.setFieldValue("cantidadSolicitada", data.cantidadSolicitada);
        
                }) ();
                setVisible(true);
           }
            
       }

    },[dataProductMissing])

    const formik = useFormik( {
       initialValues: initialValues(),
       validationSchema: yup.object().shape(validationSchema()),
       onSubmit: async (formData) => {
          console.log("Envio de formulario ")
          console.log(formData)

          if (dataProductMissing && "data" in dataProductMissing ){
            var response = {}
            if (dataProductMissing.data.id == null) {
                response = await fetch(URL_PRODUCT_MISSING,
                    {
                        headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                        },
                        method: "POST",
                        body: JSON.stringify(formData)
                    });
            }else {
                response = await fetch(URL_PRODUCT_MISSING + "/" + dataProductMissing.data.id,
                    {
                        headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                        },
                        method: "PUT",
                        body: JSON.stringify(formData)
                    });


            }


            if (response.status === 200) {
                setVisible(false)
            }else {
                alert ("Ha ocurrido un error!")
            }


          }




          
       }

    })

    const updateProductMissing = () => {
        console.log("llamando actionFormProduct con update")
        form.submit()
        console.log("fin ")
    }

    return (
       <div>
         <Modal
            title="Producto faltante"
            centered
            visible={visible}
            onOk={() => updateProductMissing()}
            onCancel={() => setVisible(false)}
            width={400}
          >
            <Form form={form}  onFinish={formik.handleSubmit} layout="vertical">
                <div className="row">
                    <LabelText  label={"Codigo interno: "} text={ sku } />
                </div>
                <div className="row">
                    <label> { producto } </label>
                </div>
                <div className="row">
                    <div className="col-md-5">
                    <TextInput 
                        label = "Cantidad solicitada"
                        value = {formik.values.cantidadSolicitada}
                        error = {formik.errors.cantidadSolicitada}
                        onChange={(evt) => formik.setFieldValue("cantidadSolicitada", evt.target.value)} />
                    </div>
                    <div className="col-md-2" />
                    <div className="col-md-5">
                    <TextInput 
                        label = "Cantidad existencia"
                        value = {formik.values.cantidadExistencia}
                        error = {formik.errors.cantidadExistencia}
                        onChange={(evt) => formik.setFieldValue("cantidadExistencia", evt.target.value)} />
                    </div>
            </div>

            </Form>

         </Modal>
       </div>

    );
}

function initialValues () {
    return {
        sku: "",
        cantidadExistencia: 0,
        cantidadSolicitada: 0
    }
}

function validationSchema () {
    return {
        sku: yup.string(),
        cantidadExistencia: yup.number().integer().required(),
        cantidadSolicitada: yup.number().integer().required()
    }
}

export default ProductMissing;