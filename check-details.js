const fs = require('fs');

function inspectFailedAudits(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  console.log(`\n========================================`);
  console.log(`Inspecting audits with details for: ${filePath}`);
  console.log(`========================================`);
  
  const targetAudits = [
    'button-name',
    'label-content-name-mismatch',
    'color-contrast',
    'is-crawlable',
    'heading-order',
    'link-name',
    'image-alt'
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
          console.log(`  ${i + 1}. Node: ${item.node ? item.node.snippet : 'N/A'}`);
          if (item.node && item.node.explanation) {
            console.log(`     Explanation: ${item.node.explanation}`);
          }
          if (item.node && item.node.selector) {
            console.log(`     Selector: ${item.node.selector}`);
          }
        });
      }
    } else {
      console.log(`Audit ${auditId} not found in this report.`);
    }
  });
}

inspectFailedAudits('c:/Users/ByteLand/Desktop/shameem-kottakkal/.lighthouseci/lhr-1772991556468.json');
inspectFailedAudits('c:/Users/ByteLand/Desktop/shameem-kottakkal/lighthouse-final-v2.json');
inspectFailedAudits('c:/Users/ByteLand/Desktop/shameem-kottakkal/lighthouse-result.json');
