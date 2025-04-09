let token = window.localStorage.getItem('token');
token = token ? token : '';
if(!token) window.location = '/login.html';

const elName = document.querySelector('.js-name');
const elEmail = document.querySelector('.js-email');
const elPassword = document.querySelector('.js-password');
const elForm = document.querySelector('.js-form');
const elBtn = document.querySelector('.js-btn');
const elLogout = document.querySelector('.js-logout');

elLogout.addEventListener('click', ()=>{
    window.localStorage.setItem('token', '');
    window.location.reload();
})

async function takingIdAdmin(token) {
    const req = await fetch('http://localhost:4000/api/admins',{
        headers:{
            authorization: token
        }
    });

    const res = await req.json();
    
    if(req.ok){
        delete res.role;
        const { email, password, phone_num, username } = res;
        elName.value = username;
        elPassword.value = password;
        elEmail.value = email;

        window.localStorage.setItem('userData', JSON.stringify(res));
    }
}
if(token) takingIdAdmin(token);


elForm.addEventListener('input', ()=>{
    elBtn.disabled = false;        
})

function timestamp(){
    const now = new Date();
    const datestamp = now.toISOString().slice(0, 10);
    const timestamp = `${now.getHours()}:${now.getMinutes()}`; 
    return `${datestamp}/${timestamp}`
}

async function update(id, data) {
    const req = await fetch(`http://localhost:4000/api/admins/${id}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    });
    const res = await req.json();
    console.log(res);
    
}

elForm.addEventListener('submit',(evt)=>{
    evt.preventDefault();

    const formData = new FormData(elForm);
    const user = Object.fromEntries(formData);
    user.updatedAt = timestamp();

    let userData = window.localStorage.getItem('userData');
    userData = userData ? JSON.parse(userData) : '';

    const updatedData = {...userData, ...user};
    update(updatedData.id, updatedData);
    return alert("Admin successfully updated");
});