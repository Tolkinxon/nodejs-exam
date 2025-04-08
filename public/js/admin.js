let token = window.localStorage.getItem('token');
token = token ? token : '';
if(!token) window.location = '/login.html';
