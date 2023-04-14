import {  DELETE_SUBCATEGORY_URL } from '../endpoints';


export const deleteSubcategoryAction = (parentId, childId) => {
    
  return new Promise ( (resolve, reject) => {
      fetch(`${DELETE_SUBCATEGORY_URL}/category/${childId}/of/${parentId}`,{
            method: 'DELETE',
            headers:  new Headers({'Accept': 'application/json','content-type': 'application/json'})
          })
          .then( response => {
             if (response.status == 200) { 
                response.json().then( (result) => {
                   console.log("Se elimino la subcategoria");
                   return resolve(result)
                })
                
             }else{
                response.json().then( (errorHandled) => {
                    console.log("Error contralado en eliminacion subcategoria");
                    return reject(errorHandled)
                 })
             }

          })
          .catch(error => {
            return reject ({code : 'code01', description: 'eliminacion subcatetoria : ' + error})
          });

      });  

}



