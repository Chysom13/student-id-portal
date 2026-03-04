import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import supabase from "../services/supabase"
import IdCard from "../components/IdCard"
import { usePDF } from 'react-to-pdf'

const DisplayCard = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [card, setCard] = useState(null)
  const [loading, setLoading] = useState(true)
  const [printingStatus, setPrintingStatus] = useState("")

  const { toPDF, targetRef } = usePDF({ filename: 'university-id.pdf' })

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("students")
        .select()
        .eq("id", id)
        .single()

      if (error) {
        navigate("/", { replace: true })
        return
      }
      if (data) {
        setCard(data)
        setLoading(false)
      }

    }

    fetchData()
  }, [id, navigate])

  const handlePrint = async () => {
    if (card.has_printed) return

    setPrintingStatus("Generating PDF...")
    try {
      // Small timeout to allow state changes to flush if needed
      await new Promise(resolve => setTimeout(resolve, 100))

      await toPDF()

      setPrintingStatus("Updating records...")
      const { error } = await supabase
        .from("students")
        .update({ has_printed: true })
        .eq("id", id)

      if (!error) {
        setCard(prev => ({ ...prev, has_printed: true }))
        setPrintingStatus("")
      } else {
        setPrintingStatus("PDF generated, but failed to update status in Database.")
      }
    } catch (err) {
      console.error(err)
      setPrintingStatus("Failed to generate PDF.")
    }
  }

  if (loading) return <h3 style={{ textAlign: "center", marginTop: "2rem" }}>Loading ID card...</h3>
  if (!card) return null

  return (
    <div className="page" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: "2rem auto", maxWidth: "800px" }}>

      {/* The Printable Area */}
      <div ref={targetRef} style={{ padding: "20px", background: "white", borderRadius: "8px" }}>
        <div className="student-card">
          <IdCard student={card} />
        </div>
      </div>

      <div style={{ marginTop: "2rem", textAlign: "center", width: "100%", maxWidth: "400px" }}>
        {card.has_printed ? (
          <div style={{ padding: "15px", backgroundColor: "#fff3cd", color: "#856404", borderRadius: "8px", border: "1px solid #ffeeba", textAlign: "left" }}>
            <strong>Notice:</strong> Your ID card has already been printed. Please contact central administration if you require a reprint.
          </div>
        ) : (
          <button
            onClick={handlePrint}
            disabled={!!printingStatus && printingStatus !== "Failed to generate PDF."}
            style={{
              padding: "12px 24px",
              fontSize: "16px",
              cursor: "pointer",
              borderRadius: "8px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              fontWeight: "bold",
              width: "100%"
            }}
          >
            {printingStatus || "Download ID Card"}
          </button>
        )}
      </div>

    </div>
  )
}

export default DisplayCard
