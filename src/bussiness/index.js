import { findCategories, 
         productsCategory, 
         productToCategory, 
         reorderList,
         deleteProductFromCategory,
         findProductBySku,
         saveCategoryGraph,
         updateCategoryGraph,
         deleteCategoryGraph,
         addCategoryToCategoryAction } from '../bussiness/actions/CategoryAction'
import { findSubcategoriesAction } from './actions/SubcategoriesSearchAction';


export const findByCategories = findCategories;
export const findProductsCategory = productsCategory;
export const addProductToCategory =  productToCategory;
export const reorderCategoryList = reorderList;
export const deleteRelationProduct = deleteProductFromCategory;
export const findProduct = findProductBySku;
export const saveCategory = saveCategoryGraph;
export const updateCategory = updateCategoryGraph;
export const deleteCategory = deleteCategoryGraph;
export const addCategoryToCategory = addCategoryToCategoryAction;
export const findSubcategories = findSubcategoriesAction;


