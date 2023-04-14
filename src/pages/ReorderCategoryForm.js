import React from "react";
import './styles/ReorderCategoryForm.css'
import { Table, Tag, Space } from 'antd';

const ReorderCategoryForm = ({category, updateSubcategories}) => {

    const [subcategories, setSubcategories] = React.useState([]);


    React.useEffect( () => {

        if (category && 'categories' in category){
            setSubcategories(category.categories);
            updateSubcategories(subcategories);
        }
        
     
      },[category])

    const upPositionArray = (index) => {
        if (index > 0){
           var tmp = subcategories[index - 1];
           subcategories[index-1] = subcategories[index];
           subcategories[index ] = tmp;
           setSubcategories([...subcategories]);
           updateSubcategories(subcategories);
        }
     }
   
     const downPositionArray = (index) => {
       if (index < subcategories.length - 1){
           var tmp = subcategories[index + 1];
           subcategories[index+1] = subcategories[index];
           subcategories[index ] = tmp;
           setSubcategories([...subcategories]);
           updateSubcategories(subcategories);
        }
     }
   

    return (
      <div className="container_subcategorias">
           <table>
              <tr>
                <th style={{width:"30%"}}></th>
                <th>Clave</th>
                <th style={{width:"100%", paddingLeft:"6px"}}>Categoria</th>
              </tr>
              {
              subcategories.map((cat,index) => {
                return (
                  <tr>
                     <td style={{width:"30%"}}>
                        <span>
                            <button onClick={() => {
                                      upPositionArray(index);            
                                  }}>
                              arriba
                            </button>
                            <button className="btnAbajo" onClick={() => {
                                      downPositionArray(index);            
                                  }}>
                              abajo
                            </button>
                        </span>
                     </td>
                     <td style={{width:"40px"}}>{cat.key}</td>
                     <td style={{width:"100%", paddingLeft:"6px"}}>{cat.name}</td>

                  </tr>

                  );
              })}
           </table>

      </div>

    );
};


export default ReorderCategoryForm;

