import React, { Component, useRef, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ApplicationContext } from '../Context';
import Cookies from 'js-cookie'
import { TextField, Grid, Icon, FormControl, Input, FormHelperText } from '@mui/material';
import { useHistory } from 'react-router-dom';
import icons from '@ant-design/icons'
import { Modal, Button, Form } from 'antd';
import { Table, Tag, Space } from 'antd';
import FormProduct from './FormProduct';
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../actions'
import * as logicProduct  from '../bussiness/logicFormProduct'
import {loadProduct} from '../bussiness/actions/loadProduct'
import { UpdateProductAction } from '../bussiness/actions/UpdateProductAction'



const ListaCambioPrecio = (props) => {
  const value = useContext(ApplicationContext);
  const history = useHistory();
  const { proveedores, parametros } = value;
  const proveedorRef = useRef();
  const [listaCambios, setListaCambios] = React.useState([]);
  const [visible, setVisible] = React.useState(false);
   
  const dispatch = useDispatch()
  const updateDataProduct = useSelector(store => store.editProduct);
  const {data, dataHistorico } = updateDataProduct
  const [form] = Form.useForm()
  const resultUdateProduct = useSelector(store => store.updateProduct)

 
  const columns = [
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a onClick={(event) => editarProducto(record.codigointerno)}>Editar</a>
          <a onClick={() => deleteItem(record.id)}>Delete</a>
        </Space>
      ),
    },
    {
      title: 'Codigo interno',
      dataIndex: 'codigointerno',
      key: 'codigointerno',
      render: text => <p>{text}</p>,
    },
    {
      title: 'Proveedor',
      dataIndex: 'proveedor',
      key: 'codigointerno',
    },
    {
      title: 'Descripcion',
      dataIndex: 'description',
      key: 'codigointerno',
    },
    {
      title: 'Precio compra Ant',
      dataIndex: 'precioCompraAnt',
      key: 'precioCompra',
    },
    {
      title: 'Precio compra',
      dataIndex: 'precioCompra',
      key: 'precioCompra',
    },
    ,
    {
      title: 'Precio venta',
      dataIndex: 'precioVenta',
      key: 'precioVenta',
    }
  ]
 
  React.useEffect( () => {
    if (resultUdateProduct && 'resultUpdate' in resultUdateProduct && resultUdateProduct.resultUpdate.isOk === true) {
      setVisible(false); 
    }
  },[resultUdateProduct])

  const editarProducto = (codigo) => {
    console.log("Nuevo editar producto new implementation 2")
    dispatch(loadProduct('PURGE'))
    dispatch(loadProduct(codigo))
    setVisible(true); 
  }

  const handleSearch = (event) => {
    var url = parametros['URL_API_BASE'] + "/findcambioprecios/" + proveedorRef.current.value;
    console.log("get datos a " + url);
 
    fetch(url,
    {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken': Cookies.get('csrftoken')
        },
        method: "GET"
    })
    .then(response => response.json())
    .then(function(res){
        
        console.log(res)
        setListaCambios(res)

      })
    .catch(function(res){ 
      console.log(res) 
    })

  }

  const deleteItem = (id) => {

    var url = parametros['URL_API_BASE'] + "/deletecambioprecios/" + id;
    console.log("delete datos a " + url);
 
    fetch(url,
    {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken': Cookies.get('csrftoken')
        },
        method: "GET"
    })
    .then(response => response.json())
    .then(function(res){
        
        console.log(res)
        let newLista = listaCambios.filter ( (data) => {
           return data.id != id
        })
        setListaCambios(newLista);

      })
    .catch(function(res){ 
      console.log(res) 
    })

  }

 const actualizarProducto = () => {
   console.log("llamando actionFormProduct con update")
   form.submit()
   //dispatch(actions.actionFormProduct('UPDATE'));
   console.log("fin ")
 }
      
  
 

  return (
    <div>
      <p> Listado de productos con cambios de precio</p>

        <Grid container spacing={1}>
            <Grid item xs={6}>
              <label htmlFor="proveedor">Proveedor</label>
              <select id="proveedor" ref={proveedorRef} options={proveedores}>
                 { proveedores.map ( (proveedor) => (
                   <option key={proveedor.value} value={proveedor.value}>{proveedor.label}</option>
                 ))}
                 
              </select>  
            </Grid>
           
            <Grid item xs={6}>
               <Button variant="contained"  variant="contained" onClick={handleSearch} disabled={false} color="primary" >
                  <Icon>search</Icon>
               </Button>
           </Grid>

           <Grid item xs={6}>
               <Table columns={columns} dataSource={listaCambios} rowKey="codigointerno" />
           </Grid>

         </Grid>
        
         <Modal
            title="Actualizar producto"
            centered
            visible={visible}
            onOk={() => actualizarProducto()}
            onCancel={() => setVisible(false)}
            width={1000}
          >
          
            <FormProduct formInstance={form}  hideModal={ () => setVisible(false)}  />
         </Modal>
    </div>
  );
}

export default ListaCambioPrecio;
