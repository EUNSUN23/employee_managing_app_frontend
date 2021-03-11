import * as actionTypes from "../actions/actionTypes";

// <-- setCategory -->

const initCategory = (data) => {
    return {type:actionTypes.EMP_INIT_CATEGORY, category:data}
  }
  
  const getDeptAPI = async () => {
    const deptRes = await axios.get("http://localhost:3008/api/dept");
    return deptRes.data.packet;
  }
  
  const getTitleAPI = async()=>{
    const titleRes = await axios.get("http://localhost:3008/api/title");
    return titleRes.data.packet;
  }
  
 const getCategoryAPI = async () => {
    return Promise.all([getDeptAPI, getTitleAPI]).then((res)=>{return {dept:res[0], title:res[1]}})
  }
  
  export const setCategory = async () => {
  return (dispatch) => {
    let category;
    try{
      const res = await getCategoryAPI();
      const dept = res.dept.map((obj)=>{return obj.dept_name}).unshift("dept");
      const title = res.title.map((obj)=>{return obj.title}).unshift("title");
      category = {dept:dept, title:title};
      console.log("CATEGORY", category);
      dispatch(initCategory(category));
    }catch(err){
      console.log(err);
    }
  };}


// <-- setOption -->

export const setOption = (option) => {
    return {type:actionTypes.BAR_SET_OPTION, option:option};
}

// <-- setValue -->

export const setOptVal = (selected) =>{
    return{type:actionTypes.BAR_OPT_VAL, selected:selected};
}

export const setInpVal = (name) => {
    return {type:actionTypes.BAR_INP_VAL, name:name};
}