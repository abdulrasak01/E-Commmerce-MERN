import React from 'react'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";


const Search = () => {
  const navigate = useNavigate();
    const [keyWord,setKeyWord] = useState('')
   
   const searchHandler = ()=>{
      navigate("/search?keyword="+keyWord);
    }
    
  return (
    <div className="input-group">
        <input
          type="text"
          id="search_field"
          onChange={(e) => setKeyWord(e.target.value)}
          onBlur={searchHandler}
          className="form-control"
          placeholder="Enter Product Name ..."
        />
        <div className="input-group-append">
          <button onClick={searchHandler} id="search_btn" className="btn">
          <i className="fa fa-search" aria-hidden="true"></i>
          
          </button>
          
        </div>
      
      </div>
  )
}

export default Search