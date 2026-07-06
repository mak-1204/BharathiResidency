const fs = require('fs');
let c = fs.readFileSync('src/app/App.tsx', 'utf8');
c = c.replace(/wa\.me\/919790377717/g, 'wa.me/919994400311');
c = c.replace(/Murali will reply shortly/g, 'Akshay will reply shortly');
c = c.replace(/href="tel:\+919790377717"(\s+)className="fixed bottom-6/g, 'href="tel:+919994400311"$1className="fixed bottom-6');
fs.writeFileSync('src/app/App.tsx', c);
console.log('done');
