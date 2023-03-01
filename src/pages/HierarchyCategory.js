import React, { Component, useRef, useContext } from 'react';
import { ApplicationContext } from '../Context';
import { TextField, Grid, Icon, FormControl, Input, FormHelperText, Alert } from '@mui/material';
import { Modal, Button, Form, Tree } from 'antd';
import { Table, Tag, Space, Switch,  message, Popconfirm } from 'antd';

import { useDispatch, useSelector } from 'react-redux'
import * as funcs from '../bussiness'
import {TreeCategories, Arbol2} from './Arbol'

import { Accordion } from '../ComponentsHtml/Accordion/Accordion';
import { AccordionItem } from '../ComponentsHtml/Accordion/AccordionItem';
import { AccordionHeader } from '../ComponentsHtml/Accordion/AccordionHeader';
import { AccordionBody } from '../ComponentsHtml/Accordion/AccordionBody';
import * as actions from '../bussiness/index.js'


const HierarchyCategory = (props) => {
  const valueContext = useContext(ApplicationContext);
  const [categories, setCategories] = React.useState([]);
  const [listProductCategory, setListProductCategory] = React.useState([]);
  const dispatch = useDispatch()
  const [productDelete, setProductDelete] = React.useState({})
  const [openConfirmDelete, setOpenConfirmDelete] = React.useState(false);
  const [idActiveCategory, setIdActiveCategory] = React.useState({id: -1})
  const [arbol, setArbol] = React.useState([]);
  const categoryOperations = useSelector(store => store.category)
  const [newSubcategory, setNewSubcategory] = React.useState({});
  const subcategoriesSearch = useSelector(store => store.subcategoriesSearch);


  
  const addCategory = (category) => {

    if (idActiveCategory.id == -1) {
      alert("Seleccione una categoria destino");
      return;
    }

    category.categories = [];
    category.open = false;
    category.active = false;
    setNewSubcategory(category);

    dispatch(actions.addCategoryToCategory(idActiveCategory.id, category.id));
  }

  const columnsCategory = [
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => {
              addCategory(record);          
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
     console.log(categories);
     dispatch(funcs.findSubcategories("root"));
    

  },[])

  React.useEffect(() => {

    if (subcategoriesSearch && 'resultSubcategories' in subcategoriesSearch
                            && 'data' in subcategoriesSearch.resultSubcategories
                            && subcategoriesSearch.resultSubcategories.isOk == true) {

      setArbol(subcategoriesSearch.resultSubcategories.data)
    }


  },[subcategoriesSearch])

  
  const loadProductsCategory = async (key) => {
      
      if (key && Number(key))  {
          setListProductCategory([]);
          var category =  await funcs.findProductsCategory(key);
          console.log(category);
          setListProductCategory(category.products);
      }

  }

  React.useEffect( () => {

    if ( categoryOperations && 
          'resultAddCategoryToCategory' in categoryOperations && 
          categoryOperations.resultAddCategoryToCategory.isOk == true) {
      idActiveCategory.categories.push(newSubcategory);
      //TreeCategories[0].categories.push(newSubcategory);   

    }

    if ( categoryOperations && 
          'resultAddCategoryToCategoryError' in categoryOperations && 
          'code' in categoryOperations.resultAddCategoryToCategoryError) {
       alert(categoryOperations.resultAddCategoryToCategoryError.description)    

    }

  },[categoryOperations])

 
  const deleteItem = async (sku) => {

     funcs.deleteRelationProduct(categoryRef.current.value,sku)
         .then ( async (result) => {
            console.log(result)
            await loadProductsCategory(categoryRef.current.value);
          
         }).catch ( (error) => {
          console.log (error);
         });
    
  }

  const printItem = (item, index) => {


     return (
         <AccordionItem key={index}>
              <AccordionHeader title={item.name + (item.categories != null && item.categories.length > 0 ? ' (' + item.categories.length +  ')' : '') }
                        active={idActiveCategory.id === item.id}
                       
                        open={item.open}

                        toogle={
                          () => {
                            item.open = !item.open;
                            setIdActiveCategory(item)
                          }
                        }
                  />
              <AccordionBody open={item.open}
                            
                 >
                      {item.categories.map((item2,index2) => printItem (item2,index2) )}
               </AccordionBody>


         </AccordionItem>

     );

  };

  const agregarCategory = () => {

    //dispatch(funcs.findSubcategories("root"));
   
  

    /*
    var category = {name: 'nuevo', title: 'title nuevo'}
    category.categories = [];
    category.open = false;
    category.active = false;
    TreeCategories[0].categories.push(category);
    setArbol([...TreeCategories]);  
    */
  }
   
  return (
    <div>
      <p>Jerarquia de categorias</p>

        <Button onClick={() => agregarCategory() } > Agregar categoria  </Button>
        <Grid container spacing={1}>
           <Grid container item xs={6} spacing={1} style={{ display: "flex", justifyContent: "flex-start" }} >

           <Accordion >
               {arbol.map( (item,index) => printItem (item,index) )}
           </Accordion>

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
