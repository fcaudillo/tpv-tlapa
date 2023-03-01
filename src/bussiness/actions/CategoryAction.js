
import { URL_FIND_CATEGORIES, URL_UPLOAD_URL, URL_GRAPH_URL} from '../endpoints'
import { ajax } from 'rxjs/ajax'
import { Subject, BehaviorSubject, fromEvent, debounceTime, filter, map, mergeMap, toArray } from 'rxjs'
import { ADD_CATEGORY_TO_CATEGORY_URL } from '../endpoints';
import {
  ADD_CATEGORY_TO_CATEGORY_SUCCESS,
  ADD_CATEGORY_TO_CATEGORY_ERROR,
  ADD_CATEGORY_TO_CATEGORY_PURGE
} from '../types'

export const findCategories = async () => {

    var response = await fetch(URL_FIND_CATEGORIES,
    {
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        method: "GET"
    });

    const result = await response.json();

    return result;
}


export const productsCategory = async (categoryId) => {

    var response = await fetch(`${URL_UPLOAD_URL}/category/${categoryId}/products`,
    {
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        method: "GET"
    });

    const result = await response.json();

    return result;
}

export const findProductBySku = async (sku) => {

    var response = await fetch(`${URL_UPLOAD_URL}/findByCodigoInterno/${sku}/`,
    {
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        method: "GET"
    });

    if (response.status == 200){
        const result = await response.json();
        return result;
    }
    

    return {};
}

export const productToCategory = async (categoryId, data) => {

    var response = await fetch(`${URL_GRAPH_URL}/category/${categoryId}/product`,
    {
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(data)
    });

    const result = await response.json();

    return result;
}

export const reorderList = (data) => {
    
    return new Promise((resolve, reject) => {
            ajax.put(`${URL_GRAPH_URL}/category/{categoryIdParent}/add/{categoryIdChild}`,
                data,
                {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                }
            )
            .pipe(
                map(r  => r.response)
            )
            .subscribe (result => {
                console.log('result Action reorderList = ' + result);
                resolve(result);
            });
    });

}

export const deleteProductFromCategory = (categoryKey, sku) => {
    
    return new Promise((resolve, reject) => {
            ajax.delete(`${URL_GRAPH_URL}/category/${categoryKey}/product/${sku}`,
                {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                }
            )
            .pipe(
                map(r  => r.response)
            )
            .subscribe (result => {
                console.log('result Action reorderList = ' + result);
                resolve(result);
            });
    });

}


export const saveCategoryGraph = (data) => {
    console.log("Save category")
    console.log(data)
    return new Promise ( (resolve, reject) => {
          fetch(`${URL_GRAPH_URL}/category`,{
                method: 'POST',
                body: JSON.stringify(data),
                headers:  new Headers({'Accept': 'application/json','content-type': 'application/json'})
              })
              .then( response => {
                 if (response.status == 200) { 
                    response.json().then( (category) => {
                       console.log("Se guardo la categoria");
                       return resolve(category)
                    })
                    
                 }else{
                    response.json().then( (errorHandled) => {
                        console.log("Error contralado en el guardado");
                        return reject(errorHandled)
                     })
                 }
  
              })
              .catch(error => {
                return reject ({code : 'code01', desc:error})
              });
  
          });  
  
  }

  export const updateCategoryGraph = (data) => {
    console.log("Save category")
    console.log(data)
    return new Promise ( (resolve, reject) => {
          fetch(`${URL_GRAPH_URL}/category/${data.id}`,{
                method: 'PUT',
                body: JSON.stringify(data),
                headers:  new Headers({'Accept': 'application/json','content-type': 'application/json'})
              })
              .then( response => {
                 if (response.status == 200) { 
                    response.json().then( (category) => {
                       console.log("Se guardo la categoria");
                       return resolve(category)
                    })
                    
                 }else{
                    response.json().then( (errorHandled) => {
                        console.log("Error contralado en el guardado");
                        return reject(errorHandled)
                     })
                 }
  
              })
              .catch(error => {
                return reject ({code : 'code01', desc:error})
              });
  
          });  
  
  }

  export const deleteCategoryGraph = (categoryId) => {
    
    return new Promise ( (resolve, reject) => {
        fetch(`${URL_GRAPH_URL}/category/${categoryId}`,{
              method: 'DELETE',
              headers:  new Headers({'Accept': 'application/json','content-type': 'application/json'})
            })
            .then( response => {
               if (response.status == 200) { 
                  response.json().then( (result) => {
                     console.log("Se elimino la categoria");
                     return resolve(result)
                  })
                  
               }else{
                  response.json().then( (errorHandled) => {
                      console.log("Error contralado en eliminacion categoria");
                      return reject(errorHandled)
                   })
               }

            })
            .catch(error => {
              return reject ({code : 'code01', description:error})
            });

        });  

}


export const addCategoryToCategoryAction = (categoryIdParent, categoryIdChild) => {

  const config={
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST"
    }

  console.log('add category to category :',`${ADD_CATEGORY_TO_CATEGORY_URL}/category/${categoryIdParent}/add/${categoryIdChild}`, config);
  
  return ( dispatch ) => {
     if(categoryIdParent ===  'PURGE'){
      dispatch( { type: ADD_CATEGORY_TO_CATEGORY_PURGE, payload: 'PURGE'} )
    }else{
      var statusCode = 0
      fetch( `${ADD_CATEGORY_TO_CATEGORY_URL}/category/${categoryIdParent}/add/${categoryIdChild}`, config )
      .then(json => {
        json.json().then((responseJson) => {
          if (json.status === 200) {
            dispatch({ type: ADD_CATEGORY_TO_CATEGORY_SUCCESS, payload: { statusCode: 200, isOk: true, categoryIdChild}  })
          }else {
            dispatch({ type: ADD_CATEGORY_TO_CATEGORY_ERROR, payload: responseJson })
          }
        }); 
      }).catch(error => {
        dispatch({ type: ADD_CATEGORY_TO_CATEGORY_ERROR, payload: {code : 'code01', description:error} })
      });

    }
  }

}


