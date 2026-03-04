import { useState } from "react"
import { useNavigate } from "react-router-dom"
import supabase from "../services/supabase"
import ImageDropzone from "../components/ImageDropzone"
import CameraDropzone from "../components/CameraCapture"



const Register = () => {
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [matric_number, setMatNumber] = useState("")
  const [department, setDept] = useState("")
  const [level, setLevel] = useState("")
  const [college, setCollege] = useState("")
  const [photo_url, setPhotoUrl] = useState("")
  const [formError, setFormError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!name || !matric_number || !department || !level || !photo_url || !college) {
      setFormError("Please fill in all fields and upload a photo")
      return
    }

    const { error } = await supabase.from("students").insert([
      {
        name,
        matric_number,
        department,
        level,
        college,
        photo_url
      }
    ])

    if (error) {
      setFormError(error.message)
    } else {
      navigate("/")
    }
  }

  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />

        <label>Matric Number:</label>
        <input value={matric_number} onChange={(e) => setMatNumber(e.target.value)} />

        <label htmlFor="college">College:</label>
        <input id='college' value={college} onChange={(e) => setCollege(e.target.value)}/>

        <label>Department:</label>
        <input value={department} onChange={(e) => setDept(e.target.value)} />

        <label>Level:</label>
        <input value={level} onChange={(e) => setLevel(e.target.value)} />

        <label>Student Photo:</label>
        {/* <h4>Upload or Capture Photo</h4> */}

        <ImageDropzone onUpload={setPhotoUrl} />

        {/* <p>OR</p>

        <CameraDropzone onUpload={setPhotoUrl} /> */}


        <button>Register</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default Register
