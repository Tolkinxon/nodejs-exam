let token = window.localStorage.getItem('token');
token = token ? token : '';
if(!token) window.location = '/login.html';
const elLogout = document.querySelector('.js-logout');

elLogout.addEventListener('click', ()=>{
    window.localStorage.setItem('token', '');
    window.location.reload();
})