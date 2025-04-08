const elForm = document.querySelector('.js-form');

async function login(data) {
    const req = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-type': "application/json"
        },
        body: JSON.stringify(data)
    });

    const res = await req.json();
    if(req.ok){
        window.localStorage.setItem('token', res.accessToken);
        if(res.role == 'admins') return window.location = 'admin.html';
        else if(res.role == 'employees') return window.location = 'ishchi.html';
        else if(res.role == 'clients') return window.location = 'client.html';
    }
    
}

elForm.addEventListener('submit',(evt)=>{
    evt.preventDefault();
    let formData = new FormData(elForm);
    formData = Object.fromEntries(formData);
    login(formData);
})