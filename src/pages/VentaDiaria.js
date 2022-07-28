import React, { Component, useRef, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ApplicationContext } from '../Context';
import Cookies from 'js-cookie'
import { Grid, Icon} from '@mui/material';
import icons from '@ant-design/icons'
import { Modal, Button, Form } from 'antd';
import { Table, DatePicker, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { VENTA_DIARIA_URL } from '../bussiness/endpoints'

const VentaDiaria = (props) => {
  const value = useContext(ApplicationContext);
  const [ventaDiaria, setVentaDiaria] = React.useState([]);
  const [visible, setVisible] = React.useState(false);
  const dispatch = useDispatch()
  const [ fechaIni, setFechaIni] = React.useState("");
  const [ fechaFin, setFechaFin] = React.useState("")

  const columns = [
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a onClick={(event) => devolucionProducto(record.detalleMovientoId)}>Devolucion</a>
          <a onClick={() => {
              imprimirTicket(record.movimientoId)
          }}>Reimprimir</a>
        </Space>
      ),
    },
    {
      title: 'Cantidad',
      dataIndex: 'cantidad',
      key: 'cantidad',
      render: text => <p>{text}</p>,
    },
    {
      title: 'Descripcion',
      dataIndex: 'descripcion',
      key: 'descripcion',
    },
    {
      title: 'Precio venta',
      dataIndex: 'precioVenta',
      key: 'precioVenta',
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
    },
  ]
 
 
  const devolucionProducto = (id) => {
    console.log("Devolucion producto: " + id)
     
  }

  const handleSearch = async (event) => {
    var url = VENTA_DIARIA_URL + "/" + fechaIni + "/" + fechaFin;
    console.log("get datos a 2 " + url);
 
    const response = await fetch(url,
                    {
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json',
                          'X-CSRFToken': Cookies.get('csrftoken')
                        },
                        method: "GET"
                    });
    if (response.status == 200){
      console.log("Lista obtenida")
      const lista = await response.json()
      setVentaDiaria(lista)
    }else{
      console.log("Error en consulta venta diaria")
    }

  }

  const imprimirTicket = (id) => {

    console.log("Imprimir ticket: " + id);
 
    

  }

 const actualizarProducto = () => {

 }

  return (
    <div>
      <p> Venta de producto vendidos</p>

        <Grid container spacing={1}>
            <Grid item xs={3}>
               <DatePicker onChange={(date,dateString) => {
                  setFechaIni(dateString.replaceAll("-",""))
               }} />    
            </Grid>
            <Grid item xs={1}>
                 
            </Grid>
            <Grid item xs={3}>
               <DatePicker onChange={(date,dateString) => {
                  setFechaFin(dateString.replaceAll("-",""))
               }} />  
            </Grid>    
            <Grid item xs={1}>
                 
            </Grid>      
            <Grid item xs={4}>
               <Button variant="contained"  onClick={handleSearch} disabled={false} color="primary" >
                  <Icon>search</Icon>
               </Button>
           </Grid>

           <Grid item xs={12}>
               <Table columns={columns} dataSource={ventaDiaria} rowKey="detalleMovientoId" />
           </Grid>

         </Grid>
        
       
         <Modal
             visible={visible}
             footer={[
               <Button key="2"
                   onClick={() =>setVisible(false)}
                 >No</Button>,
               <Button key="3" 
                   onClick={() => {
                       //deleteItem(productDelete.id);
                     }}
                   type="primary">
                   Si
               </Button>
             ]}
          >
          <p> ¿Desea devolver este producto?</p>
       </Modal>
    </div>
  );
}

export default VentaDiaria;
