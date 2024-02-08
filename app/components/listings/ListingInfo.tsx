'use client';

import { IconType } from 'react-icons';
import Avatar from '../Avatar';
import { SafeUser } from '@/app/types';
import ListingCategory from './ListingCategory';
import Button from '../Button';
import { Feature } from '@prisma/client';
import { use, useState } from 'react';
import ListingEditModal from './ListingEditModal';


interface ListingInfoProps {
  user: SafeUser;
  features: Feature[];
  description: string;
  currentUser:SafeUser|null|undefined;
  category:
  | {
    icon: IconType;
    label: string;
    description: string;
  }
  | undefined;
  addFeature: (featureIndex: number) => void;
  editFeatures:any[];
  addEditFeature:(s:string,p:number)=>void;
  updateEditFeature:(s:string,p:number,i:number)=>void
  removeEditFeature:(featureIndex: number) => void;
  applyEdits:()=>void;
  featureVisibility: boolean[];
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  currentUser,
  user,
  category,
  features,
  editFeatures,
  addEditFeature,
  removeEditFeature,
  updateEditFeature,
  applyEdits,
  addFeature,
  featureVisibility,
 
}) => {
  const[modalVis,setModalVis]=useState(false)
  return (
    <>
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div
          className="
        text-xl 
        font-semibold 
        flex 
        flex-row 
        items-center
        gap-2
      "
        >
          <div>Owner {user?.name}</div>
          <Avatar src={user?.image} />
        </div>
        <div
          className="
          
            font-light
            text-neutral-500
          "
        >
          <div className="grid grid-cols-3  font-semibold text-black">
         <text>
              Service
            </text>
           <div className="ml-5">
             Price
             </div>
           <div className="">

           </div>
          </div>
          {
            features.map((feature,index) => (
              // eslint-disable-next-line react/jsx-key
              featureVisibility[index] &&(
              // eslint-disable-next-line react/jsx-key
              <div className="grid grid-cols-3  py-2">
               <div className="">
                {feature.service}
                </div>
                
                {` ₹ ${feature.price} `}
                  
                <div className='flex '>
                <Button label="Add" onClick={() => addFeature(index)} />
                {currentUser?.id == user.id &&
                <Button label="Edit" onClick={() => setModalVis(!modalVis)} />}
                </div>
              </div>
              )
            ))
          }

        </div>
      </div>

      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category?.label}
          description={category?.description}
        />
      )}
    </div>
    {modalVis && <ListingEditModal 
    editFeatures={editFeatures}
    addEditFeature={addEditFeature}
    removeEditFeature={removeEditFeature}
    updateEditFeature={updateEditFeature}
    applyEdits={applyEdits}
    vis={modalVis}
    setVis={setModalVis}
    />}
   

    </>
  );
};

export default ListingInfo;
