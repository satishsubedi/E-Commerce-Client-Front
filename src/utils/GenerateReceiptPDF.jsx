import ReceiptPDF from "../components/Receipt/Receipt";
import { pdf } from "@react-pdf/renderer";

const GenerateReceiptPDF = async (order) => {
  // 🔥 Force fresh render with key and prevent caching issues
  const blob = await pdf(
    <ReceiptPDF key={Date.now()} order={order} />
  ).toBlob();
  const blobUrl = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = blobUrl;
  link.download = `receipt_${order._id.slice(-6)}_${Date.now()}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(blobUrl); // ✅ clear old blob to avoid stale PDF
};

export default GenerateReceiptPDF;
