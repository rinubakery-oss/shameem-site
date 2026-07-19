const fs = require('fs');

function inspectLcp(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  console.log(`\n========================================`);
  console.log(`Inspecting LCP details for: ${filePath}`);
  console.log(`========================================`);
  
  const targetAudits = [
    'largest-contentful-paint-element',
    'lcp-lazy-loaded',
    'render-blocking-resources'
  ];
  
  targetAudits.forEach(auditId => {
    const audit = data.audits[auditId];
    if (audit) {
      console.log(`\nAudit: ${auditId} (Score: ${audit.score})`);
      console.log(`Title: ${audit.title}`);
      console.log(`Explanation: ${audit.explanation || 'None'}`);
      if (audit.details && audit.details.items) {
        console.log(`Items (${audit.details.items.length}):`);
        audit.details.items.forEach((item, i) => {
          console.log(`  ${i + 1}. Node/Url: ${item.node ? item.node.snippet : (item.url || 'N/A')}`);
          if (item.node && item.node.selector) {
            console.log(`     Selector: ${item.node.selector}`);
          }
        });
      }
    } else {
      console.log(`Audit ${auditId} not found.`);
    }
  });
}

inspectLcp('c:/Users/ByteLand/Desktop/shameem-kottakkal/.lighthouseci/lhr-1772991556468.json');
inspectLcp('c:/Users/ByteLand/Desktop/shameem-kottakkal/lighthouse-final-v2.json');
inspectLcp('c:/Users/ByteLand/Desktop/shameem-kottakkal/lighthouse-result.json');
