import Cookies from 'js-cookie'

export const signInAction = (data) => {

  
  const config={
    method: 'POST',
    body:JSON.stringify(data),
    headers:{'Content-Type':'application/json'}
  };

}


 export const editarProducto = (urlBase, codigo) => {
    let promise = new Promise((resolve, reject) => {
      fetch(urlBase+ "/findByCodigoInterno/" + codigo )
      .then(response => response.json())
      .then(producto => {
         fetch(urlBase + "/find_historico/" + producto.proveedorId +"/" + producto.codigoProveedor)
            .then(response => response.json())
            .then(dataHist => {
                console.log(producto)
                console.log(dataHist)
                resolve({data:producto, dataHistico: dataHist})
            })
            .catch(error => reject(error));

        });    
    });
    return promise;
  } 

  export const saveProducto = (urlBase, data, add ) => {
    var url = urlBase + "/producto/" + (add ? "agregar" : "update");
    console.log("enviado datos a " + url);
    console.log(data);
    let promise = new Promise((resolve, reject) => {
      fetch(url,
        {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'X-CSRFToken': Cookies.get('csrftoken')
            },
            method: "POST",
            body: JSON.stringify(data)
        })
        .then(function(res){
           
            console.log("Se agrego/actualizo con exito")
            if (res.ok){
               
              resolve ({'result':'success'})
            }else {
              console.log("ocurrio un error consulta dministrador")
              reject ({'error':'consulte administrador'})
            }
            
    
          })
        .catch(function(res){ 
          console.log("ocurrio un error: " + res)
          reject ({'error':'El producto ya existe'}) 
        })

    })

    return promise;

  }
