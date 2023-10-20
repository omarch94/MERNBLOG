import React ,{useEffect}from 'react'
import AdminSidebar from './AdminSidebar'
import "./admin-table.css"
import swal from "sweetalert"
import {useSelector,useDispatch} from "react-redux"
import {deteleteCategory, fetchCategories} from "../../redux/apiCalls/categoryApiCall"
   
const CategoriesTable = () => {
    const {categories}=useSelector(state=>state.category)
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(fetchCategories())
      },[])
     // delete Category handler
     const deleteCategoryHandler = (categoryId) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((isOk) => {
            if (isOk) {
              dispatch(deteleteCategory(categoryId))
            } 
          });
          
      };
  return (
      <section className='table-container'>
       <AdminSidebar/>
    <div className="table-wrapper">
        <h1 className="table-title">Categories</h1>
        <table className="table">
            <thead>
                <tr>
                    <th>Count</th>
                    <th>Category title</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {categories.map((category,index)=>(
                    <tr key={category._id}>
                        <td >{index+1}</td>
                        <td>
                            <b>{category.title}</b>
                        </td>
                        <td>
                            <div className="table-button-group">
                                <button onClick={()=>deleteCategoryHandler(category?._id)}>Delete Category </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>

   </section>
  )
}

export default CategoriesTable
