import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import supabase from '../services/supabase'
import ImageDropzone from "../components/ImageDropzone"


const Update = () => {
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [matric_number, setMatNumber] = useState('')
    const [department, setDept] = useState('')
    const [level, setLevel] = useState('')
    const [college, setCollege] = useState('')
    const [formError, setFormError] = useState(null)
    const [photo_url, setPhotoUrl] = useState(null)


    const { id } = useParams()


    const handelSubmit = async (e) => {
        e.preventDefault()

        if(!name || !matric_number || !department || !level || !college){
            setFormError("Please fill in all fields")
            return
        }

        const { data, error} = await supabase
            .from('students')
            .update({name, matric_number, department, level, college, photo_url})
            .eq('id', id)
            .select()
        if(error){
            setFormError("Please fill in all fields")
        }
        if(data){
            setFormError(null)
            navigate('/')
        }

    }

    useEffect(() => {
        const fetchData = async () => {
            const {data, error} = await supabase
                .from('students')
                .select()
                .eq('id', id)
                .single()

            if(error){
                navigate('/', {replace: true})
            }
            if(data){
                setName(data.name)
                setLevel(data.level)
                setMatNumber(data.matric_number)
                setCollege(data.college)
                setDept(data.department)
                setPhotoUrl(data.photo_url)
                console.log(data);
                
            }
        }
        fetchData()
    }, [id, navigate])

  return (
    <div className='page update'>
        <form onSubmit={handelSubmit}>
            <label htmlFor="name">Name:</label>
            <input 
                type='text'
                id='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <label htmlFor="matric_number">Matric_Number:</label>
            <input 
                type='text'
                id='matric_number'
                value={matric_number}
                onChange={(e) => setMatNumber(e.target.value)}
            />

            <label htmlFor="college">College:</label>
            <input 
                type='text'
                id='college'
                value={college}
                onChange={(e) => setCollege(e.target.value)}
            />

            <label htmlFor="department">Department:</label>
            <input 
                type='text'
                id='department'
                value={department}
                onChange={(e) => setDept(e.target.value)}
            />

            <label htmlFor="level">Level:</label>
            <input 
                type='text'
                id='level'
                value={level}
                onChange={(e) => setLevel(e.target.value)}
            />

            <label>Update Photo:</label>
            <ImageDropzone
            onUpload={setPhotoUrl}
            existingImage={photo_url}
            />


            <button>Update</button>

            {formError && <p className='error'>{formError}</p>}

        </form>
    </div>
  )
}

export default Update