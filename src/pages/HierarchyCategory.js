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
import { AllInclusiveRounded } from '@mui/icons-material';
import ReorderCategoryForm from  './ReorderCategoryForm'


const HierarchyCategory = (props) => {
  const valueContext = useContext(ApplicationContext);
  const [categories, setCategories] = React.useState([]);
  const [listProductCategory, setListProductCategory] = React.useState([]);
  const dispatch = useDispatch()
  const [productDelete, setProductDelete] = React.useState({})
  const [openConfirmDelete, setOpenConfirmDelete] = React.useState(false);
  const [openReorder, setOpenReorder] = React.useState(false);
  const [idActiveCategory, setIdActiveCategory] = React.useState({id: -1})
  const [arbol, setArbol] = React.useState([]);
  const categoryOperations = useSelector(store => store.category)
  const [newSubcategory, setNewSubcategory] = React.useState({});
  const subcategoriesSearch = useSelector(store => store.subcategoriesSearch);
  const [categoryToOrder, setCategoryToOrder] = React.useState({id: -1})
  const [subcategories, setSubcategories] = React.useState([]);


  
  const addCategory = (category) => {

    if (idActiveCategory.id == -1) {
      alert("Seleccione una categoria destino");
      return;
    }

    category.categories = [];
    category.open = false;
    category.active = false;
    category.parent = idActiveCategory;
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
     //dispatch(funcs.findSubcategories("root"));
  },[])

  React.useEffect(() => {

    if (subcategoriesSearch && 'resultSubcategories' in subcategoriesSearch
                            && 'data' in subcategoriesSearch.resultSubcategories
                            && subcategoriesSearch.resultSubcategories.isOk == true) {
      var root = subcategoriesSearch.resultSubcategories.data;
      setParents(root[0]);
      setArbol(root)
      
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
      setArbol([...arbol]);   

    }

    if ( categoryOperations && 
          'resultAddCategoryToCategoryError' in categoryOperations && 
          'code' in categoryOperations.resultAddCategoryToCategoryError) {
       alert(categoryOperations.resultAddCategoryToCategoryError.description)    

    }

  },[categoryOperations])

   const printItem = (item, index) => {

     return (
         <AccordionItem key={index}>
              <AccordionHeader title={item.name + (item.categories != null && item.categories.length > 0 ? ' (' + item.categories.length +  ')' : '') }
                        active={idActiveCategory.id === item.id}
                       
                        open={item.open}

                        toogle={
                          () => {
                            item.open = !item.open;
                            console.log("Click " + item.name + " open = " + item.open)
                            setIdActiveCategory(item)
                            setArbol([...arbol]);
                          }
                        }
                  />
              <AccordionBody open={item.open}
                            
                 >
                      {item.categories.map((item2,index2) => printItem (item2,index2))}
               </AccordionBody>


         </AccordionItem>

     );

  };

  const agregarCategory = () => {

    //dispatch(funcs.findSubcategories("root"));
 
    var category = {name: 'nuevo', title: 'title nuevo'}
    category.categories = [];
    category.open = false;
    category.active = false;
    idActiveCategory.categories.push(category);
    setArbol([...arbol]);  
    
  }


  const setParents =  (parentCategory) => {
     if (parentCategory == null){
      return;
     }

     var i = 0;
     for (i= 0; parentCategory.categories != null && i < parentCategory.categories.length; i++) {
        parentCategory.categories[i].parent = parentCategory;
        setParents(parentCategory.categories[i])
     }
  }

  const eliminarSubcategory = () => {

    actions.deleteSubcategory(idActiveCategory.parent.id, idActiveCategory.id)
           .then( (json) => {
              var i =0;
              for (i = 0; i < idActiveCategory.parent.categories.length; i++){
                if (idActiveCategory.parent.categories[i].id == idActiveCategory.id){
                  idActiveCategory.parent.categories.splice(i,1);
                  setArbol([...arbol]);
                  setIdActiveCategory({id: -1});
                  break;
                }
              }
              setOpenConfirmDelete(false);

           }).catch( (error) => {
               alert('Error: ' + error.description)
           })

  }

  const showModalDelete = () => {
    if (idActiveCategory.id == -1) {
      alert("Seleccione una categoria a eliminar");
      return;
    }

    if (idActiveCategory.categories && idActiveCategory.categories.length == 0){
         setOpenConfirmDelete(true)

    }else{
       alert("No puede eliminar categorias con subcategorias");

    }


  }

  const showModalReorder = () => {
    if (idActiveCategory.id == -1) {
      alert("Seleccione una categoria a reordenar");
      return;
    }

    if (idActiveCategory.categories && idActiveCategory.categories.length > 0){
         setOpenReorder(true)
         setCategoryToOrder({...idActiveCategory});
    }else if (idActiveCategory.parent && idActiveCategory.parent.categories && idActiveCategory.parent.categories.length > 0){
         setOpenReorder(true);
         setCategoryToOrder({...idActiveCategory.parent});
         setIdActiveCategory(idActiveCategory.parent)

    }


  } 

  const reorder = () => {
       console.log("Lista a reordenar")
       console.log(subcategories);

       var temp = subcategories.map(item => {
         return {id: item.id, name: item.name, title:item.title}
       });


       actions.reorderSubcategories({id: idActiveCategory.id, categories: temp })
       .then( (json) => {
          var ranker = 0;
          for (ranker = 0; ranker < subcategories.length; ranker++){
            var i = 0;
            for (i = 0; i < idActiveCategory.categories.length; i++){
                if ( subcategories[ranker].id == idActiveCategory.categories[i].id) {
                  idActiveCategory.categories[i].ranker = ranker;
                  break;
                }
            }
  
          }
          idActiveCategory.categories.sort ( (o1, o2) =>  o1.ranker - o2.ranker);
          setArbol([...arbol]);
          setOpenReorder(false)

       }).catch( (error) => {
           alert('Error: ' + error.description)
       })
       



  }
   
  return (
    <div>
      <p>Jerarquia de categorias</p>

        
        <Grid container spacing={1}>
            <Grid container item xs={6} spacing={1} style={{ display: "flex", justifyContent: "flex-start" }} >
               <Button onClick={() => showModalDelete() } > Delete categoria  </Button>
               <Button onClick={() => showModalReorder() } > Reordenar  </Button>
            
            </Grid>

            <Grid container item xs={6} spacing={1} style={{ display: "flex", justifyContent: "flex-start" }} >

            </Grid>

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
                        eliminarSubcategory();
                     }}
                   type="primary">
                   Si
               </Button>
             ]}
          >
          
          <h2>¿Desea eliminar  la subcategoria?</h2>
          <p>{idActiveCategory.name} </p>
       </Modal>


       <Modal
             visible={openReorder}
             footer={[
               <Button key="2"
                   onClick={() =>setOpenReorder(false)}
                 >Cancelar</Button>,
               <Button key="3" 
                   onClick={() => {
                         reorder();
                     }}
                   type="primary">
                   Reordenar
               </Button>
             ]}
          >
          
          <h2>Reordenar categoria</h2>
          <p>{categoryToOrder.name} </p>
          <ReorderCategoryForm  category={categoryToOrder} updateSubcategories={setSubcategories} />
       </Modal>
 

    </div>
  );
}

export default HierarchyCategory;
