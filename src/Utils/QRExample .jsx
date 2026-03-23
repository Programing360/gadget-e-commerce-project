import { QRCodeCanvas } from "qrcode.react";

const QRExample = () => {
  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <h2 className="text-xl font-bold">Scan QR Code</h2>

      <QRCodeCanvas
        value="https://zeroomiro26.web.app"
        size={180}
        bgColor="#ffffff"
        fgColor="#000000"
        level="H"
      />
    </div>
  );
};

export default QRExample;