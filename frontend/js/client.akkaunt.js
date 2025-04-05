let token = window.localStorage.getItem('token');
token = token ? token : '';
if(!token) window.location = '/login.html';

const elName = document.querySelector('.js-name');
const elPhoneNumber = document.querySelector('.js-phone-number');
const elEmail = document.querySelector('.js-email');
const elPassword = document.querySelector('.js-password');
const elForm = document.querySelector('.js-form')
const elBtn = document.querySelector('.js-btn')

async function takingIdClient(token) {
    const req = await fetch('http://localhost:4000/api/clients',{
        headers:{
            authorization: token
        }
    });

    const res = await req.json();
    
    
    if(req.ok){
        delete res.role;
        const { email, password, phone, username } = res;
        elName.value = username;
        elPassword.value = password;
        elEmail.value = email;
        elPhoneNumber.value = phone;

        window.localStorage.setItem('clientData', JSON.stringify(res));
    }
}
if(token) takingIdClient(token);


async function update(id, data) {
    const req = await fetch(`http://localhost:4000/api/clients/${id}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    });
    const res = await req.json();
    console.log(res);
}

function timestamp(){
    const now = new Date();
    const datestamp = now.toISOString().slice(0, 10);
    const timestamp = `${now.getHours()}:${now.getMinutes()}`; 
    return `${datestamp}/${timestamp}`
}


elForm.addEventListener('input', ()=>{
    elBtn.disabled = false;        
})



elForm.addEventListener('submit',(evt)=>{
    evt.preventDefault();

    const formData = new FormData(elForm);
    const user = Object.fromEntries(formData);
    user.updatedAt = timestamp();

    let clientData = window.localStorage.getItem('clientData');
    clientData = clientData ? JSON.parse(clientData) : '';

    const updatedData = {...clientData, ...user};
    update(updatedData.id, updatedData);   
});