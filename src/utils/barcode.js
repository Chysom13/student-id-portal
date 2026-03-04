import Barcode from "react-barcode";

export const barCode = (student) => {
    const barcodeValue = `Name: ${student.name}|Mat_No: ${student.matric_number}`
    return <Barcode value={barcodeValue}
              width={.8}
              height={50}
              fontSize={16}
              displayValue={false}/>
}