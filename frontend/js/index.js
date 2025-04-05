let token = window.localStorage.getItem('token');
token = token ? token : '';

async function checkToken(token) {
    const req = await fetch('http://localhost:4000/api/auth/check-token',{
        headers:{
            authorization: token
        }
    });

    const res = await req.json();
    console.log(res);
    
    if(req.ok){
        if(res.role == 'admins') return window.location = 'admin.html';
        else if(res.role == 'employees') return window.location = 'ishchi.html';
        else if(res.role == 'clients') return window.location = 'client.html';
    }
}

if(token) checkToken(token);