import React, { useRef, useContext, useCallback } from 'react';
import { ApplicationContext } from '../Context';
import * as yup from "yup";
import { useSelector, useDispatch } from 'react-redux'
import { Form } from 'antd'
import { useFormik } from 'formik'
import TextInput from '../ComponentsHtml/TextInput'
import * as funcs from '../bussiness'

const FormCategory = ({formInstance, goNewCategory, hideModal, mode = "Nuevo", category})  => {
  const [add, setAdd] = React.useState(true);
  const dispatch = useDispatch()
  
  const formik = useFormik({
    initialValues : initialValues(),
    validationSchema: yup.object().shape(validationSchema()),
    onSubmit : (formData) => {
       console.log("Envio de formulario: " + mode)
       console.log(formData)
       if (mode == "Editar"){
          formData.id = category.id;
          funcs.updateCategory(formData)
               .then (category => {
                   console.log("Ir a la categoria : " + category.key)
                   goNewCategory(category.key);
                   hideModal();
               })
               .catch( (e) => alert("Error : " + e.desc))
       }else{
          funcs.saveCategory(formData)
          .then (category => {
              console.log("Ir a la categoria : " + category.key)
              goNewCategory(category.key);
              hideModal();
          })
          .catch( (e) => alert("Error : " + e.desc))
       }
      
    }
  })
  

  React.useEffect( () => {
    populateForm(category);
 
  },[category])



  
  const populateForm = async (data) => {
    if (data && "key" in data){
        setAdd(false)
        await  formik.setFieldValue("key",data.key);
        await  formik.setFieldValue("name",data.name);  
        await  formik.setFieldValue("title", data.title);
     }else{
       formik.resetForm()
      setAdd(true)
    }

  }


  return (
    <div>

      <Form form={formInstance} onFinish={formik.handleSubmit} layout="vertical">
      
        <div className="row">
           <div className="col-md-12">
                  <TextInput 
                        label = "Clave:"
                        value = {formik.values.key}
                        error = {formik.errors.key}
                        onChange={(evt) => formik.setFieldValue("key", evt.target.value)} />
            </div>
         </div>

         <div className="row">
           <div className="col-md-12">
                  <TextInput 
                        label = "Nombre: "
                        value = {formik.values.name}
                        error = {formik.errors.name}
                        onChange={(evt) => formik.setFieldValue("name", evt.target.value)} />
            </div>
         </div>
         <div className="row">
           <div className="col-md-12">
                  <TextInput 
                        label = "Titulo"
                        value = {formik.values.title}
                        error = {formik.errors.title}
                        onChange={(evt) => formik.setFieldValue("title", evt.target.value)} />
            </div>
         </div>             
       


       </Form>    
 
	      

    </div>
  );
}

function initialValues() {
  return {
    key: "",
    name: "",
    title: ""
  }
}
function validationSchema() {
  return {
    key: yup.string().required(),
    name: yup.string().required(),
    title: yup.string().required()
  }
}

export default FormCategory;
