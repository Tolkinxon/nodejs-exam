let token = window.localStorage.getItem('token');
token = token ? token : '';
if(!token) window.location = '/login.html';

const elForm = document.querySelector('.js-form');

function timestamp(){
    const now = new Date();
    const datestamp = now.toISOString().slice(0, 10);
    const timestamp = `${now.getHours()}:${now.getMinutes()}`; 
    return `${datestamp}/${timestamp}`
}

async function  postEmployee(data) {
    const req = await fetch('http://localhost:4000/api/employees', {
        method: 'POST',
        headers:{
            "Content-type":"application/json"
        },
        body: JSON.stringify(data)
    });
    const res = await req.json();

    console.log(res);
}


elForm.addEventListener('submit', (evt)=>{
    evt.preventDefault();
    let formData = new FormData(elForm);
    formData = Object.fromEntries(formData);
    formData.createdAt = timestamp();
    postEmployee(formData);
})