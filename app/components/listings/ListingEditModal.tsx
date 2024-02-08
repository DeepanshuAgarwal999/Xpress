'use client';
import React, { useState } from 'react'
interface ListingEditModalProps {
    editFeatures:any[];
    addEditFeature:(s:string,p:number)=>void;
    updateEditFeature:(s:string,p:number,i:number)=>void
    removeEditFeature:(featureIndex: number) => void;
    applyEdits:()=>void;
    vis:boolean;
    setVis:(e:boolean)=>void;
  }
const ListingEditModal: React.FC<ListingEditModalProps>= (({
    editFeatures,
    addEditFeature,
    removeEditFeature,
    updateEditFeature,
    applyEdits,
    vis,
    setVis

   
  }) => {
  return (
    <>

<div id="authentication-modal" tabIndex={-1} aria-hidden="true" className=" overflow-y-auto overflow-x-hidden fixed flex top-1/2 left-1/2 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full" >
      <div className="relative p-4 w-full max-w-md max-h-full">
        {/* Modal content */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Edit Services
            </h3>
            <button
            onClick={()=>setVis(!vis)}
             type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* Modal body */}
          <div className="p-4 md:p-5">
            <div className="space-y-4">
              {editFeatures.map((feature,index)=>(

              <div key={"ele"+index} className='flex justify-center items-center'>
                <input 
                type="text"
                onChange={(e)=>{
                  updateEditFeature(e.target.value,editFeatures[index].price,index)
                  setVis(true)
                }} defaultValue={feature?.service} className=" m-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                <input 
                type="number"
                onChange={(e)=>{
                  updateEditFeature(editFeatures[index].service,Number(e.target.value),index)
                  setVis(true)
                }}
                 defaultValue={feature?.price} className="m-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                <button
                onClick={()=>{removeEditFeature(index)
                setVis(true)}}
                 className='text-center  h-9 m-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
                delete
                </button>
               {editFeatures.length-1 == index && <button
                onClick={async()=>{
                    addEditFeature('',0)
                   await setVis(false)
                   await setVis(true)
                }}
                 className='text-center  h-9 m-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
                +
                </button>}
              </div>
              ))}
              
              
              <button onClick={async()=>{
                await applyEdits();
              }} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Apply changes</button>
              
            </div>
          </div>
        </div>
      </div>
    </div>

    </>
  )
})

export default ListingEditModal