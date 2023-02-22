import React, { Component, useRef, useContext } from 'react';
import { ApplicationContext } from '../Context';
import { TextField, Grid, Icon, FormControl, Input, FormHelperText } from '@mui/material';
import { Modal, Button, Form } from 'antd';
import { Table, Tag, Space, Switch,  message, Popconfirm } from 'antd';

import { useDispatch, useSelector } from 'react-redux'
import * as funcs from '../bussiness'
import { SearchProductAction  } from '../bussiness/actions/SearchProductAction';
import { SEARCH_AUTOCOMPLETE } from '../bussiness/endpoints'
import { Subject, BehaviorSubject, fromEvent, debounceTime, filter, map, mergeMap, toArray, async } from 'rxjs'
import { AutoComplete, Input as InputAutocomplete } from 'antd';
import { ajax } from 'rxjs/ajax'
import * as actions from '../actions'
import FormCategory from './FormCategory';

const HierarchyCategory = (props) => {
  const valueContext = useContext(ApplicationContext);
  const [categories, setCategories] = React.useState([]);
  const [listProductCategory, setListProductCategory] = React.useState([]);
  const dispatch = useDispatch()
  const [productDelete, setProductDelete] = React.useState({})
  const [openConfirmDelete, setOpenConfirmDelete] = React.useState(false);
  

  const columnsCategory = [
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => {
              addProductToCategory(record.id);          
          }}>Add</a>
        </Space>
      ),
    },
    {
      title: 'Clave',
      dataIndex: 'key',
      key: 'key',
      render: text => <p>{text}</p>,
    },
    {
      title: 'Nombre',
      key: 'name',
      dataIndex: 'name'      
    }
  ]

  React.useEffect(async () => {
     var categories = await funcs.findByCategories();
     setCategories(categories);
    // subscribe to 

  },[])

  
  const loadProductsCategory = async (key) => {
      
      if (key && Number(key))  {
          setListProductCategory([]);
          var category =  await funcs.findProductsCategory(key);
          console.log(category);
          setListProductCategory(category.products);
      }

  }

  const addProductToCategory = async (sku) => {

    var pr = await funcs.findProduct(sku);

    if ( ! ('codigointerno' in pr)) {
        alert("El producto " + sku + " no existe");
        return;
    }

    var data = {
         "sku": sku,
         "ranker": listProductCategory.length + 1
    };
    
    await funcs.addProductToCategory(categoryRef.current.value, data)
    await loadProductsCategory(categoryRef.current.value)
}
 
  const deleteItem = async (sku) => {

     funcs.deleteRelationProduct(categoryRef.current.value,sku)
         .then ( async (result) => {
            console.log(result)
            await loadProductsCategory(categoryRef.current.value);
          
         }).catch ( (error) => {
          console.log (error);
         });
    
  }

   
  return (
    <div>
      <p>Jerarquia de categorias</p>

        <Grid container spacing={1}>
           <Grid container item xs={6} spacing={1} style={{ display: "flex", justifyContent: "flex-start" }} >
                <div id="accordion">
  <div class="card">
    <div class="card-header" id="heading-1">
      <h5 class="mb-0">
        <a role="button" data-toggle="collapse" href="#collapse-1" aria-expanded="true" aria-controls="collapse-1">
          Item 1
        </a>
      </h5>
    </div>
    <div id="collapse-1" class="collapse show" data-parent="#accordion" aria-labelledby="heading-1">
      <div class="card-body">

        <div id="accordion-1">
          <div class="card">
            <div class="card-header" id="heading-1-1">
              <h5 class="mb-0">
                <a class="collapsed" role="button" data-toggle="collapse" href="#collapse-1-1" aria-expanded="false" aria-controls="collapse-1-1">
                  Item 1 > 1
                </a>
              </h5>
            </div>
            <div id="collapse-1-1" class="collapse" data-parent="#accordion-1" aria-labelledby="heading-1-1">
              <div class="card-body">

                  <div id="accordion-1-1">
                    <div class="card">
                      <div class="card-header" id="heading-1-1-1">
                        <h5 class="mb-0">
                          <a class="collapsed" role="button" data-toggle="collapse" href="#collapse-1-1-1" aria-expanded="false" aria-controls="collapse-1-1-1">
                            Item 1 > 1 > 1
                          </a>
                        </h5>
                      </div>
                      <div id="collapse-1-1-1" class="collapse" data-parent="#accordion-1-1" aria-labelledby="heading-1-1-1">
                        <div class="card-body">
                          Text 1 > 1 > 1
                        </div>
                      </div>
                    </div>
                    <div class="card">
                      <div class="card-header" id="heading-1-1-2">
                        <h5 class="mb-0">
                          <a class="collapsed" role="button" data-toggle="collapse" href="#collapse-1-1-2" aria-expanded="false" aria-controls="collapse-1-1-2">
                            Item 1 > 1 > 2
                          </a>
                        </h5>
                      </div>
                      <div id="collapse-1-1-2" class="collapse" data-parent="#accordion-1-1" aria-labelledby="heading-1-1-2">
                        <div class="card-body">
                          Text 1 > 1 > 2
                        </div>
                      </div>
                    </div>
                    <div class="card">
                      <div class="card-header" id="heading-1-1-3">
                        <h5 class="mb-0">
                          <a class="collapsed" role="button" data-toggle="collapse" href="#collapse-1-1-3" aria-expanded="false" aria-controls="collapse-1-1-3">
                            Item 1 > 1 > 3
                          </a>
                        </h5>
                      </div>
                      <div id="collapse-1-1-3" class="collapse" data-parent="#accordion-1-1" aria-labelledby="heading-1-1-3">
                        <div class="card-body">
                          Text 1 > 1 > 3
                        </div>
                      </div>
                    </div>
                  </div>

              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header" id="heading-1-2">
              <h5 class="mb-0">
                <a class="collapsed" role="button" data-toggle="collapse" href="#collapse-1-2" aria-expanded="false" aria-controls="collapse-1-2">
                  Item 1 > 2
                </a>
              </h5>
            </div>
            <div id="collapse-1-2" class="collapse" data-parent="#accordion-1" aria-labelledby="heading-1-2">
              <div class="card-body">
                Text 1 > 2
              </div>
            </div>
          </div>
        </div>      
      
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="heading-2">
      <h5 class="mb-0">
        <a class="collapsed" role="button" data-toggle="collapse" href="#collapse-2" aria-expanded="false" aria-controls="collapse-2">
          Item 2
        </a>
      </h5>
    </div>
    <div id="collapse-2" class="collapse" data-parent="#accordion" aria-labelledby="heading-2">
      <div class="card-body">
        Text 2
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="heading-3">
      <h5 class="mb-0">
        <a class="collapsed" role="button" data-toggle="collapse" href="#collapse-3" aria-expanded="false" aria-controls="collapse-3">
          Item 3
        </a>
      </h5>
    </div>
    <div id="collapse-3" class="collapse" data-parent="#accordion" aria-labelledby="heading-3">
      <div class="card-body">
        Text 3
      </div>
    </div>
  </div>
</div>

            </Grid>
            <Grid item xs={1}>


           </Grid>
           <Grid container item xs={5} spacing={1}>
                <Grid item xs={12}>
                    <Table columns={columnsCategory} dataSource={categories} rowKey="id" />
                </Grid>

            </Grid>

        </Grid>
        
       <Modal
             visible={openConfirmDelete}
             footer={[
               <Button key="2"
                   onClick={() =>setOpenConfirmDelete(false)}
                 >No</Button>,
               <Button key="3" 
                   onClick={() => {
                      deleteCategorySelected();
                     }}
                   type="primary">
                   Si
               </Button>
             ]}
          >
          
          <h2>¿Desea eliminar  la categoria?</h2>
          <p>{productDelete.description} </p>
       </Modal>
 

    </div>
  );
}

export default HierarchyCategory;
