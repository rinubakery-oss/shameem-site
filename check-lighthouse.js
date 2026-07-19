const fs = require('fs');
const path = require('path');

function checkFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }
  console.log(`\n========================================`);
  console.log(`Analyzing: ${path.basename(filePath)}`);
  console.log(`========================================`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  console.log('Category Scores:');
  for (const cat in data.categories) {
    console.log(`  - ${cat}: ${data.categories[cat].score * 100}`);
  }
  
  console.log('\nFailed Audits (Score < 100):');
  const failed = [];
  for (const audit in data.audits) {
    const a = data.audits[audit];
    if (a.score !== null && a.score < 1) {
      failed.push({
        id: audit,
        score: a.score * 100,
        title: a.title,
        description: a.description ? a.description.substring(0, 150) + '...' : ''
      });
    }
  }
  
  failed.sort((a, b) => a.score - b.score);
  failed.forEach(f => {
    console.log(`  [${f.score}] ${f.id}: ${f.title}`);
    // console.log(`      ${f.description}`);
  });
}

// Check standard lighthouse files
checkFile('c:/Users/ByteLand/Desktop/shameem-kottakkal/lighthouse-result.json');
checkFile('c:/Users/ByteLand/Desktop/shameem-kottakkal/lighthouse-final.json');
checkFile('c:/Users/ByteLand/Desktop/shameem-kottakkal/lighthouse-final-v2.json');

// Check files in .lighthouseci
const lhciDir = 'c:/Users/ByteLand/Desktop/shameem-kottakkal/.lighthouseci';
if (fs.existsSync(lhciDir)) {
  fs.readdirSync(lhciDir).forEach(file => {
    if (file.endsWith('.json')) {
      checkFile(path.join(lhciDir, file));
    }
  });
}
