
        document.addEventListener('DOMContentLoaded', function() {
            const generateBtn = document.getElementById('generate-btn');
            const downloadBtn = document.getElementById('download-btn');
            const qrContainer = document.getElementById('qr-container');
            const qrName = document.getElementById('qr-name');
            const qrText = document.getElementById('qr-text');
            const qrTitle = document.getElementById('qr-title');
            const errorElement = document.getElementById('error');
            const qrCodeElement = document.getElementById('qrcode');
            
            let qrCode = null;
            
            generateBtn.addEventListener('click', generateQRCode);
            downloadBtn.addEventListener('click', downloadQRCode);
            
            function generateQRCode() {
                const name = qrName.value.trim();
                const text = qrText.value.trim();
                
                // Reset error message
                errorElement.textContent = '';
                
                if (!name) {
                    errorElement.textContent = 'Please enter a name for the QR code';
                    return;
                }
                
                if (!text) {
                    errorElement.textContent = 'Please enter content for the QR code';
                    return;
                }
                
                // Clear previous QR code
                qrCodeElement.innerHTML = '';
                
                // Display container
                qrContainer.style.display = 'flex';
                qrTitle.textContent = name;
                
                // Generate new QR code
                qrCode = new QRCode(qrCodeElement, {
                    text: text,
                    width: 200,
                    height: 200,
                    colorDark: '#000000',
                    colorLight: '#ffffff',
                    correctLevel: QRCode.CorrectLevel.H
                });
            }
            
            function downloadQRCode() {
                if (!qrCode) return;
                
                // Get the QR code image
                const img = qrCodeElement.querySelector('img');
                if (!img) return;
                
                // Create a temporary link
                const link = document.createElement('a');
                link.href = img.src;
                link.download = `${qrName.value.trim() || 'qrcode'}.png`;
                
                // Trigger download
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        });
