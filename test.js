const now = new Date();
const timestamp = now.toISOString().slice(0, 19).replace("T", "/"); 
console.log(timestamp); 