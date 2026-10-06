import fs from 'fs';
import path from 'path';

const pdfContent = `%PDF-1.4
1 0 obj
<<
  /Type /Catalog
  /Pages 2 0 R
>>
endobj
2 0 obj
<<
  /Type /Pages
  /Kids [3 0 R]
  /Count 1
>>
endobj
3 0 obj
<<
  /Type /Page
  /Parent 2 0 R
  /Resources <<
    /Font <<
      /F1 4 0 R
    >>
  >>
  /MediaBox [0 0 612 792]
  /Contents 5 0 R
>>
endobj
4 0 obj
<<
  /Type /Font
  /Subtype /Type1
  /BaseFont /Helvetica-Bold
>>
endobj
5 0 obj
<<
  /Length 320
>>
stream
BT
/F1 22 Tf
50 720 Td
(TC Web & Studio - Creative Digital Services) Tj
/F1 14 Tf
0 -40 Td
(Official Capabilities & Service Packages Brochure) Tj
/F1 11 Tf
0 -40 Td
(1. Website Design & Development - High performance modern websites) Tj
0 -25 Td
(2. Social Media Management - Consistent brand curation & engagement) Tj
0 -25 Td
(3. Instagram Account Management - Grid aesthetics, reels & stories) Tj
0 -25 Td
(4. Video Editing & Content Creation - High-retention short-form video) Tj
0 -25 Td
(5. Full Studio Retainer - Comprehensive creative partnership) Tj
0 -50 Td
(Contact: contact@tcwebstudio.com | Website: tcwebstudio.com) Tj
ET
endstream
endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000244 00000 n 
0000000331 00000 n 
trailer
<<
  /Size 6
  /Root 1 0 R
>>
startxref
704
%%EOF
`;

const dest = path.resolve('server/uploads/tc_services_brochure.pdf');
fs.writeFileSync(dest, pdfContent);
console.log('Sample PDF created at:', dest);
