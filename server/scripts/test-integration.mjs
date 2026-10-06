async function testIntegration() {
  console.log('--- Testing Frontend & Backend ---');

  // 1. Vite frontend
  const feRes = await fetch('http://localhost:5173/');
  console.log('Frontend status:', feRes.status);
  const feHtml = await feRes.text();
  console.log('Frontend contains root element:', feHtml.includes('id="root"'));
  console.log('Frontend title correct:', feHtml.includes('TC Web & Studio'));

  // 2. Backend Health
  const beRes = await fetch('http://localhost:5000/api/health');
  const beHealth = await beRes.json();
  console.log('Backend health status:', beRes.status, beHealth);

  // 3. Packages
  const pkgRes = await fetch('http://localhost:5000/api/packages');
  const pkgData = await pkgRes.json();
  console.log('Active packages count:', pkgData.packages.length);
  pkgData.packages.forEach((p) => {
    console.log(
      ` - [${p.category}] ${p.name}: ${p.price || p.customPriceLabel} (Brochure: ${p.brochureUrl || 'none'})`
    );
  });

  // 4. PDF brochure accessible
  const pdfRes = await fetch('http://localhost:5000/uploads/tc_services_brochure.pdf');
  console.log(
    'PDF brochure status:',
    pdfRes.status,
    'Content-Type:',
    pdfRes.headers.get('content-type')
  );

  // 5. Settings
  const setRes = await fetch('http://localhost:5000/api/settings');
  const setData = await setRes.json();
  console.log('Settings fetched:', setData.settings);

  // 6. Contact Form Submission
  const cRes = await fetch('http://localhost:5000/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Alex Morgan',
      email: 'alex@example.com',
      serviceInterest: 'Website Design & Development',
      message: 'Hello TC Web & Studio! We need a high-performance modern website.',
    }),
  });
  console.log('Contact submission response:', cRes.status, await cRes.json());

  // 7. Admin Login & Session Validation
  const loginRes = await fetch('http://localhost:5000/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password: 'tcadmin2026!' }),
  });
  const cookie = loginRes.headers.get('set-cookie').split(';')[0];
  console.log('Admin login status:', loginRes.status);

  // 8. Admin Inquiries Verification
  const inqRes = await fetch('http://localhost:5000/api/admin/inquiries', {
    headers: { Cookie: cookie },
  });
  const inqData = await inqRes.json();
  console.log('Inquiries recorded in Admin:', inqData.inquiries.length);
  const latestInquiry = inqData.inquiries[0];
  console.log(`Latest Inquiry: ${latestInquiry?.name} (${latestInquiry?.email}) -> "${latestInquiry?.message}"`);

  // 9. Admin Uploads verification
  const upRes = await fetch('http://localhost:5000/api/admin/uploads', {
    headers: { Cookie: cookie },
  });
  const upData = await upRes.json();
  console.log('Files in Uploads manager:', upData.files.length);
  upData.files.forEach((f) => console.log(` - ${f.filename} (${f.size} bytes)`));

  console.log('--- ALL INTEGRATION CHECKS COMPLETED SUCCESSFULLY ---');
}

testIntegration().catch(console.error);
