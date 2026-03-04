import { useRef, useState } from "react"
import Webcam from "react-webcam"
import supabase from "../services/supabase"

const CameraDropzone = ({ onUpload }) => {
  const webcamRef = useRef(null)
  const [preview, setPreview] = useState(null)
  const [capturing, setCapturing] = useState(false)
  const [openCamera, setOpenCamera] = useState(false)

  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot()
    if (!imageSrc) return

    setPreview(imageSrc)
    setCapturing(true)
    setOpenCamera(false)

    // Convert base64 → Blob
    const res = await fetch(imageSrc)
    const blob = await res.blob()

    const fileName = `${crypto.randomUUID()}.jpg`
    const filePath = `students/${fileName}`

    const { error } = await supabase.storage
      .from("student-photos")
      .upload(filePath, blob, { contentType: "image/jpeg" })

    if (error) {
      alert("Camera upload failed")
      setCapturing(false)
      return
    }

    const { data } = supabase.storage
      .from("student-photos")
      .getPublicUrl(filePath)

    onUpload(data.publicUrl)
    setCapturing(false)
  }

  return (
    <div
      style={{
        border: "2px dashed #aaa",
        padding: "20px",
        textAlign: "center",
        cursor: "pointer",
        borderRadius: "8px",
        width: "100%",
        maxWidth: "300px"
      }}
    >
      {!openCamera && !preview && (
        <div onClick={() => setOpenCamera(true)}>
          <p>Click to open camera</p>
        </div>
      )}

      {openCamera && !preview && (
        <>
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={250}
            videoConstraints={{ facingMode: "user" }}
          />
          <button onClick={capture} style={{ marginTop: 10 }}>
            Capture
          </button>
        </>
      )}

      {preview && (
        <>
          <img
            src={preview}
            alt="Captured"
            style={{
              width: 150,
              height: 150,
              objectFit: "cover",
              borderRadius: 8
            }}
          />
          {capturing && <p>Uploading...</p>}
        </>
      )}
    </div>
  )
}

export default CameraDropzone
