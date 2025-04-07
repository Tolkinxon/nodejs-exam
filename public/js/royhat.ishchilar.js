let token = window.localStorage.getItem('token');
token = token ? token : '';
if(!token) window.location = '/login.html';

const elList = document.querySelector('.js-list');
const elTemplate = document.querySelector('.js-item').content;

function renderEmployees(arr, node){
    node.innerHTML = '';
    const fragment = document.createDocumentFragment();

    
    arr.forEach(({username, act_count}) => {
        const clone = elTemplate.cloneNode(true);
        clone.querySelector('.js-name').textContent = username;
        clone.querySelector('.js-act_count').textContent = act_count;

        if(act_count == 3) clone.querySelector('.js-busy').style.display = "block";
        fragment.append(clone);
    });
    node.append(fragment);
    
}

async function  allEmployees() {
    const req = await fetch('http://localhost:4000/api/employees');
    const res = await req.json();
    
    renderEmployees(res, elList);
}
allEmployees();