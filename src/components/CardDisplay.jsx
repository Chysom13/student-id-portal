import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Edit, Trash2, IdCardIcon } from 'lucide-react'
import Barcode from "react-barcode"
import supabase from '../services/supabase'
import { useEffect, useState } from 'react'
import ApiBarcode from './ApiBarcode'

const CardDisplay = ({studentInfo, onDelete}) => {

  const navigate = useNavigate()

  const handelDelete = async () => {
    const { data, error } = await supabase
      .from('students')
      .delete()
      .eq('id', studentInfo.id)
      .select()

      if(data){
        onDelete(studentInfo.id)
        
      }
  }

  const handelShow = () => {
    navigate('/card/'+studentInfo.id)
  }

  const barcodeValue = `Name: ${studentInfo.name}|Mat_No: ${studentInfo.matric_number}`




  return (
    <div className='smoothie-card'>
      <div className="home-card-details">
        <img src={studentInfo.photo_url} alt={studentInfo.name} className="student-photo"/>

        <div className="details">
          <h3>{studentInfo.name}</h3>
          <p>{studentInfo.matric_number}</p>
          <p>{studentInfo.department}</p>
        </div>
      </div>
        <Link to={'/' + studentInfo.id} className='delete'><Edit /></Link>
        <Link to={'/card/' + studentInfo.id} className='rating'><IdCardIcon /></Link>
        {/* <div className="delete"><Trash2 onClick={handelDelete}/></div> */}
        <div className="barcode">
          <ApiBarcode name={studentInfo.name} matric={studentInfo.matric_number} department={studentInfo.department} />
        </div>
    </div>
  )
}

export default CardDisplay