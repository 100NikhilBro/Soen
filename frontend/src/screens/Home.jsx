import React, { useContext,  useEffect,  useState } from 'react';
// import { useNavigate } from 'react-router';
import {UserContext} from '../context/user.context'
import axios from '../config/axios';
import { useNavigate } from 'react-router';

const Home = () => {

    const {user} = useContext(UserContext);
    console.log(user);


    const[modal,setModal] = useState(false);
    function modalhandler(){
        setModal(true);
    }

    const[fdata,setfdata] = useState({
        name:""
    })

    function changeHandler(e){
        setfdata({...fdata,[e.target.name]:e.target.value});
    }

    const[show,setshow] = useState([]);

   
    useEffect(()=>{
        axios.get("/all").then((res)=>{
            console.log(res.data);
            setshow(res.data.projects)
        }).then((e)=>{
            console.log(e);
        })
    },[show])



    function submitHandler(e){
        e.preventDefault();
        axios.post("/createProject",fdata).then((res)=>{
            console.log(res.data);
            setModal(false);
            setfdata("");
        }).then((e)=>{
            console.log(e);
        })
    }


    const navigate = useNavigate();

   

   



  return (

    <main className="min-h-screen p-8 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-black">
    <div className="flex justify-center items-center mb-10">
      <div className="projects">
        <button
          onClick={() => modalhandler()}
          className="text-black font-bold py-3 px-8 rounded-xl shadow-lg bg-gradient-to-r from-cyan-600 to-teal-500 hover:from-cyan-500 hover:to-teal-400 transition-all duration-300 transform hover:scale-105 flex items-center space-x-3"
        >
          <span>Project name</span>
          <i className="ri-link text-2xl"></i>
        </button>
      </div>
    </div>
  
    {modal && (
      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
        <div className="bg-gray-100 p-8 rounded-xl shadow-2xl w-96">
          <form onSubmit={(e) => submitHandler(e)} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="nameP" className="text-lg font-semibold text-gray-800">Name</label>
              <input
                onChange={(e) => changeHandler(e)}
                value={fdata.name}
                type="text"
                name="name"
                id="nameP"
                required
                className="w-full px-6 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter project name"
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl shadow-md hover:from-green-400 hover:to-emerald-400 hover:shadow-lg transition-all duration-300"
              >
                Create Project
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
  
  <div className="text-xl font-semibold text-teal-200">Total Projects: {show.length}</div>
  
    <div className="p-8 flex justify-center ">
      {show.length > 0 ? (
        <div className="space-y-4 flex">
         
         <div className='grid grid-cols-3 grid-rows-2 gap-1'>
         {show.map((val) => {
            return (
              <div className='flex justify-center w-full items-center'>
                <div key={val.id} className="p-4 bg-gradient-to-r  from-gray-700 to-gray-800 rounded-xl shadow hover:shadow-xl transition duration-300 h-[150px] w-[200px]">
                <div className="text-lg text-center items-center text-white font-medium justify-center
                flex flex-col gap-2 ">{val.name} <p>{val.users.length}</p>
               <button onClick={()=>navigate("/project",{state:val})}
                className='cursor-pointer'> <i class="ri-chat-ai-line"></i></button>
                </div>
              </div>
              </div>
            );
          })}
         </div>
        </div>
      ) : (
        <div className="text-gray-300 text-lg">No data</div>
      )}
    </div>
  </main>
  

  
   
  );
};

export default Home;
