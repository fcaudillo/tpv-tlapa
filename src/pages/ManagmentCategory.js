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

const ManagmentCategory = (props) => {
  const valueContext = useContext(ApplicationContext);
  const [categories, setCategories] = React.useState([]);
  const categoryRef = useRef();
  const [ tabKeyGeneral, setTabKeyGeneral] = React.useState("");
  const [listProductCategory, setListProductCategory] = React.useState([]);
  const [visibleDelete, setVisibleDelete] = React.useState(false) 
  const [visibleFormCategory, setVisibleFormCategory] = React.useState(false);
  const dispatch = useDispatch()
  const [productDelete, setProductDelete] = React.useState({})
  const [inputSearch, setInputSearch] = React.useState('');
  const [options, setOptions] = React.useState([]);
  const textSearch = React.useRef(new BehaviorSubject(""));
  const searchProduct = useSelector(store => store.searchProduct);
  const { products } = searchProduct
  const [ loadingUpdateCategory , setLoadingUpdateCategory] = React.useState(true);
  const [ activeCodebar, setActiveCodebar ] = React.useState(false);
  const globalCodebar = useSelector(store => store.reducer.globalCodebar);
  const changeTab = useSelector(store => store.changeTab);
  const [formCategoryRef] = Form.useForm();
  const [mode, setMode] = React.useState("Nuevo");
  const [categoryEdit, setCategoryEdit] = React.useState({});
  const [openConfirmDelete, setOpenConfirmDelete] = React.useState(false);
  



  const upPositionArray = (index) => {
     if (index > 0){
        var tmp = listProductCategory[index - 1];
        listProductCategory[index-1] = listProductCategory[index];
        listProductCategory[index ] = tmp;
        setListProductCategory([...listProductCategory]);
     }
  }

  const downPositionArray = (index) => {
    if (index < listProductCategory.length - 1){
        var tmp = listProductCategory[index + 1];
        listProductCategory[index+1] = listProductCategory[index];
        listProductCategory[index ] = tmp;
        setListProductCategory([...listProductCategory]);
     }
  }


  const columns = [
    {
      title: 'Action',
      key: 'action',
      render: (id, record, index) => (
        <>
                <Space size="middle">
                <a onClick={() => {
                    upPositionArray(index);            
                }}  >Arriba</a>
                </Space>
                <Space size="middle">
                <a onClick={() => {
                    setProductDelete({sku: record.sku, description: record.product.descripcion})
                    setVisibleDelete(true);            
                }}>Delete</a>
                </Space>
                <Space size="middle">
                <a onClick={() => {
                    downPositionArray(index);        
                }}>Abajo</a>
                </Space>               
        </>
      ),
    },
    {
      title: 'Codigo interno',
      dataIndex: 'sku',
      key: 'sku',
      render: text => <p>{text}</p>,
    },
    {
      title: 'Descripcion',
      key: 'sku',
      render: (text, record) => (
         <p>{record.product.descripcion}</p>
      )
      
    }
  ]

  const columnsProducts = [
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => {
              addProductToCategory(record.codigoInterno);          
          }}>Add</a>
        </Space>
      ),
    },
    {
      title: 'Codigo interno',
      dataIndex: 'codigoInterno',
      key: 'codigoInterno',
      render: text => <p>{text}</p>,
    },
    {
      title: 'Descripcion',
      key: 'sku',
      dataIndex: 'descripcion'      
    }
  ]

  React.useEffect( () => {
    console.log(products); 

  },[products])

  React.useEffect ( () => {

    if (changeTab && 'tab' in changeTab) {
      setTabKeyGeneral(changeTab.tab)
    }
  },[changeTab])

  React.useEffect( () => {

    if ( categoryRef.current == null || categoryRef.current.value == null) {
        return;
    }

    if ( 'barcode' in globalCodebar && activeCodebar) {
      addProductToCategory(globalCodebar.barcode);
    }
    
  },[globalCodebar])

React.useEffect(() => {
    const fetchCategories = async () => {
        var categories = await funcs.findByCategories();
        setCategories(categories);
        
        // subscribe to 
        const subscription = textSearch.current.asObservable()
            .pipe(
                debounceTime(500),
                filter(data => data.length > 3)
            ).subscribe(text => {
                ajax.post(SEARCH_AUTOCOMPLETE,
                    { textSearch: text, maxOccurrences: 200 },
                    { 'Content-Type': 'application/json' })
                    .pipe(
                        map(r => r.response.aggregations.autocomplete),
                        mergeMap(m => m.buckets),
                        map(e => ({ value: e.key })),
                        toArray()
                    )
                    .subscribe(data => {
                        setOptions(data);
                        console.log('data = ' + data);
                    });
            });

        // Return a cleanup function to unsubscribe
        return () => {
            subscription.unsubscribe();
        };
    };

    fetchCategories();
}, []);

  const enviaTest = () => {
    dispatch(actions.modifyGlobalCodebar({"barcode": '1514', "date": new Date()}));
  }

  const loadProductsCategory = async (key) => {
      
      if (key && Number(key))  {
          setListProductCategory([]);
          var category =  await funcs.findProductsCategory(key);
          console.log(category);
          setListProductCategory(category.products);
      }

  }

  const addProductToCategory = async (sku) => {

    if ( categoryRef.current == null || categoryRef.current.value == null) {
        alert("Seleccione una categoria")
        return;
    }

    if (tabKeyGeneral != 'prodcate') {
      return;
    }

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

  const onChangeCategory = () => {
       loadProductsCategory([]);
       if (categoryRef.current != null){
            console.log("category = " + categoryRef.current.value);
            
            if (categoryRef.current.value != null) {
                loadProductsCategory(categoryRef.current.value);
            }
       }

  }

  const reordenarLista = () => {
    if (categoryRef.current.value != null) {
        setLoadingUpdateCategory(true);
        var products = listProductCategory.map(item => { return { 'sku': item.sku, 'ranker': item.ranker}})
        var data = {
            "categoryId" : categoryRef.current.value,
            "products" : products
        };

        funcs.reorderCategoryList(data)
             .then ( (result) => {
                 console.log(result)
                 setLoadingUpdateCategory(false)
             }).catch ( (error) => {
                console.log (error);
                setLoadingUpdateCategory(false)
             });

    }


  }


  const deleteItem = async (sku) => {

     if ( categoryRef.current == null || categoryRef.current.value == null) {
        alert("Seleccione una categoria")
        return;
    } 

    funcs.deleteRelationProduct(categoryRef.current.value,sku)
         .then ( async (result) => {
            console.log(result)
            await loadProductsCategory(categoryRef.current.value);
            setVisibleDelete(false);
         }).catch ( (error) => {
          console.log (error);
         });
    
  }

   const onSearch = (dataSearch) => {
    
    textSearch.current.next(dataSearch);
    console.log('on search ' + dataSearch);

    
  };

  const onSelect = (data) => {
    console.log('onSelect', data);
    dispatch(SearchProductAction(
        {
          type: "DESCRIPTION",
          description: data,
          page: 1,
          sizePage: 200
        }
      ))
  };

  const onChange = (data) => {
    setInputSearch(data);
  };

  const saveCategory = () => {
    console.log("llamando save/update Category")
    formCategoryRef.submit()
    console.log("fin ")
  }

  const goNewCategory = async (value) => {
    var categories = await funcs.findByCategories();
    setCategories(categories);
    categoryRef.current.value = value;
    await loadProductsCategory(categoryRef.current.value)
  }

  const deleteCategorySelected = () => {

      funcs.deleteCategory(categoryEdit.id)
           .then( async ( result ) => {
               setOpenConfirmDelete(false);
               setVisibleFormCategory(false);
               var categories = await funcs.findByCategories();
               setCategories(categories);
               setListProductCategory([]);
           }).catch ( (error) => {
              alert(error.description)
           });


  }


  return (
    <div>
      <p>Productos por categoria</p>

        <Grid container spacing={1}>
           <Grid container item xs={6} spacing={1} >
                <Grid item xs={12} >
                  <label htmlFor="categories">Categoria</label>
                  <select id="categories" ref={categoryRef} options={categories} onChange={onChangeCategory}>
                      { categories.map ( (category) => (
                      <option key={category.id} value={category.key}>{category.key} - {category.name}</option>
                      ))}
                  </select>  
                  <br/>
                  <button  onClick={reordenarLista}  color="primary" loading={ loadingUpdateCategory }  >
                        Reordenar lista
                  </button>
                  <Switch checkedChildren="1" unCheckedChildren="0" onClick={() => setActiveCodebar(!activeCodebar)} checked={activeCodebar} />
                  <br/>
                  <Table columns={columns} dataSource={listProductCategory} rowKey="id" />
                </Grid> 

            </Grid>
            <Grid item xs={1}>
                  <Button onClick={() => { 
                              setVisibleFormCategory (true); 
                              setMode("Nuevo"); 
                              setCategoryEdit({});
                          }}>Nuevo</Button>
                  <Button onClick={() => { 
                              setVisibleFormCategory (true); 
                              setMode("Editar"); 
                              var i = 0;
                              for ( i = 0; i < categories.length; i++){
                                if (categories[i].key == categoryRef.current.value) {
                                  setCategoryEdit(categories[i]);
                                  break;
                                }
                              }
                          }}>Editar</Button>
                    <Button onClick={() => { 
                             	dispatch(actions.modifyGlobalCodebar({"barcode": '1414', "qty": 1,"addToTicket": 0, "date": new Date()}));

                          }}>Test</Button>

           </Grid>
           <Grid container item xs={5} spacing={1}>
                <Grid item xs={12}>
                     <span>

                        <AutoComplete
                        value={inputSearch}
                        options={options}
                        style={{
                            width: 200,
                        }}
                        onSelect={onSelect}
                        onSearch={onSearch}
                        onChange={onChange}
                        >
                        <InputAutocomplete.Search size="large" placeholder="Buscar productos..." enterButton />
                        </AutoComplete>
                    </span>  
                    <br/>
                    <Table columns={columnsProducts} dataSource={products} rowKey="id" />
                </Grid>

            </Grid>

        </Grid>
        

         <Modal
             visible={visibleDelete}
             footer={[
               <Button key="2"
                   onClick={() =>setVisibleDelete(false)}
                 >No</Button>,
               <Button key="3" 
                   onClick={() => {
                      deleteItem(productDelete.sku);
                     }}
                   type="primary">
                   Si
               </Button>
             ]}
          >
          
          <h2>¿Desea eliminar este producto de la categoria?</h2>
          <p>{productDelete.description} </p>
       </Modal>

       <Modal
            title= {mode == "Nuevo" ? "Nueva categoria" : "Editar categoria"}
            centered
            visible={visibleFormCategory}
            footer={[
              <Button key="1"
                  disabled = { mode == "Nuevo" ? true : false}
                  onClick={() => setOpenConfirmDelete(true)}
                >Eliminar</Button>,
              <Button key="2"
                  onClick={() => setVisibleFormCategory(false)}
                >Cancelar</Button>,
              <Button key="3" 
                  onClick={() => saveCategory()}
                  type="primary">
                  Guardar
              </Button>
            ]}


            width={1000}
          >

          
            <FormCategory formInstance={formCategoryRef} 
                          goNewCategory = { (category) => goNewCategory(category) }  
                          hideModal={ () => setVisibleFormCategory(false)} 
                          mode={mode}  
                          category = {categoryEdit}/>
       </Modal>

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

export default ManagmentCategory;
