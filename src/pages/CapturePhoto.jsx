import React, { useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import supabase from '../services/supabase';

const CapturePhoto = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const webcamRef = useRef(null);

    const [preview, setPreview] = useState(null);
    const [capturing, setCapturing] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    const handleCapture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        if (imageSrc) {
            setPreview(imageSrc);
        }
    };

    const handleRetake = () => {
        setPreview(null);
        setErrorMsg(null);
    };

    const handleUpload = async () => {
        if (!preview) return;

        setCapturing(true);
        setErrorMsg(null);

        try {
            // Convert base64 to Blob
            const res = await fetch(preview);
            const blob = await res.blob();

            const fileName = `students/${id}-${crypto.randomUUID()}.jpg`;

            // Upload to Storage
            const { error: uploadError } = await supabase.storage
                .from("student-photos")
                .upload(fileName, blob, { contentType: "image/jpeg" });

            if (uploadError) {
                throw new Error("Failed to upload photo. Please try again.");
            }

            // Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from("student-photos")
                .getPublicUrl(fileName);

            // Update Student Record
            const { error: updateError } = await supabase
                .from("students")
                .update({ photo_url: publicUrl })
                .eq("id", id);

            if (updateError) {
                throw new Error("Failed to update student record.");
            }

            // Success, route to card view
            navigate(`/card/${id}`);

        } catch (err) {
            console.error(err);
            setErrorMsg(err.message);
            setCapturing(false);
        }
    };

    return (
        <div className="page capture" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: "2rem auto", padding: "0 20px" }}>
            <h2 style={{ marginBottom: "10px", color: "#d32f2f" }}>Action Required: Photo Capture</h2>

            <div style={{ backgroundColor: "#f8f9fa", borderLeft: "4px solid #007bff", padding: "15px", marginBottom: "20px", maxWidth: "600px", borderRadius: "4px" }}>
                <h4 style={{ margin: "0 0 10px 0" }}>Strict Photo Guidelines:</h4>
                <ul style={{ margin: 0, paddingLeft: "20px" }}>
                    <li>You <strong>MUST</strong> use a clean, solid <strong>white backdrop</strong>.</li>
                    <li>Ensure your face is well-lit and clearly visible.</li>
                    <li>No hats, sunglasses, or face coverings.</li>
                    <li>Look directly at the camera.</li>
                </ul>
            </div>

            <div style={{ width: "100%", maxWidth: "400px", border: "2px dashed #ccc", padding: "10px", borderRadius: "8px", textAlign: "center", backgroundColor: "white" }}>

                {!preview ? (
                    <>
                        <Webcam
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            width="100%"
                            videoConstraints={{ facingMode: "user" }}
                            style={{ borderRadius: "4px", marginBottom: "15px" }}
                        />
                        <button
                            onClick={handleCapture}
                            style={{ padding: "12px 24px", fontSize: "16px", cursor: "pointer", borderRadius: "8px", backgroundColor: "#007bff", color: "white", border: "none", width: "100%" }}
                        >
                            Take Photo
                        </button>
                    </>
                ) : (
                    <>
                        <img src={preview} alt="Captured Preview" style={{ width: "100%", borderRadius: "4px", marginBottom: "15px" }} />
                        <div style={{ display: "flex", gap: "10px" }}>
                            <button
                                onClick={handleRetake}
                                disabled={capturing}
                                style={{ flex: 1, padding: "10px", fontSize: "16px", cursor: "pointer", borderRadius: "8px", backgroundColor: "#6c757d", color: "white", border: "none" }}
                            >
                                Retake
                            </button>
                            <button
                                onClick={handleUpload}
                                disabled={capturing}
                                style={{ flex: 1, padding: "10px", fontSize: "16px", cursor: "pointer", borderRadius: "8px", backgroundColor: "#28a745", color: "white", border: "none" }}
                            >
                                {capturing ? "Uploading..." : "Confirm & Upload"}
                            </button>
                        </div>
                    </>
                )}

                {errorMsg && (
                    <div style={{ marginTop: "15px", color: "red", fontSize: "14px" }}>
                        {errorMsg}
                    </div>
                )}

            </div>
        </div>
    );
};

export default CapturePhoto;
