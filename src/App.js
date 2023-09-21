import React from "react";
import { toast } from "react-toastify";
import Navbar from "./components/Navbar.js";
import Filter from "./components/Filter";
import Cards from "./components/Cards";
import { apiUrl, filterData} from "./data.js";
import { useEffect, useState } from "react";
import Spinner from "./components/Spinner.js";

const App = () => {

  const [courses, setCourses] = useState(null);
  const[loading, setLoading] = useState(true);
  const [category, setCategory] = useState(filterData[0].title);

  async function fetchData(){
    setLoading(true);
    try{
      let response = await fetch(apiUrl);
      let output = await response.json();
      //output->
      setCourses(output.data);
    }
    catch(error){
      toast.error("Something went wrong");
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);
 
  return (
    <div className="flex flex-col min-h-screen bg-bgDark2">
      <div >
        <Navbar/>
      </div>
      <div>
        <div>
          <Filter filterData={filterData} category = {category} setCategory = {setCategory} />
        </div>
        <div className="w-11/12 max-w-[1200px] mx-auto flex justify-center items-center minh-h-[50vh]">
          {
            loading ? (<Spinner/>) : (<Cards courses = {courses} category={category}/>)
          }
        </div>
      </div>
     
    </div>
  );
};

export default App;
