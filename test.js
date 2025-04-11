import fetch from "node-fetch"

async function takeData(){
    const req = await fetch('https://jsonplaceholder.typicode.com/posts');
    const res = await req.json();
    console.log(res);
}

takeData();