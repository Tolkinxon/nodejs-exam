let token = window.localStorage.getItem('token');
token = token ? token : '';
if(!token) window.location = '/login.html';

const elList = document.querySelector('.js-employee-orders-list');
const elOrder = document.querySelector('.js-order-template').content;
const elLogout = document.querySelector('.js-logout');

elLogout.addEventListener('click', ()=>{
    window.localStorage.setItem('token', '');
    window.location.reload();
})
let act_count = 0;

function render(arr, node){
    node.innerHTML = '';
    const fragment = document.createDocumentFragment();

    arr.forEach(({createdAt, name, id, status, clientName, total_price, emp_id}) => {
        if(status != 1){
            const clone = elOrder.cloneNode(true);
            clone.querySelector('.js-date').textContent = createdAt.split('/')[0];
            clone.querySelector('.js-name').textContent = name;
            clone.querySelector('.js-technics-price').textContent = total_price;
            clone.querySelector('.js-client-name').textContent = clientName;
            clone.querySelector('.js-btn').dataset.id = `${id}/${emp_id}`;
            fragment.append(clone);
        }
    });
    node.append(fragment);
}

function timestamp(){
    const now = new Date();
    const datestamp = now.toISOString().slice(0, 10);
    const timestamp = `${now.getHours()}:${now.getMinutes()}`; 
    return `${datestamp}/${timestamp}`
}



async function employeeOrders(token) {
    const req = await fetch('http://localhost:4000/api/acts/employee',{
        headers:{
            authorization: token
        }
    });

    const res = await req.json();
    act_count = res.filter(item => item.status == 0).length;
    render(res, elList);
}
if(token) employeeOrders(token);

async function updateOrderStatus(id, data) {
    const req = await fetch(`http://localhost:4000/api/acts/${id}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    });
    const res = await req.json();
    console.log(res);
}

async function updateEmployee(id, data) {
    const req = await fetch(`http://localhost:4000/api/employees/${id}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    });
    const res = await req.json();
    console.log(res);
}

elList.addEventListener('click', (evt)=>{
    if(evt.target.matches('.js-btn')){
        const conf = confirm('Are your sure?');
        if(conf){
            const id = evt.target.dataset.id.split('/')[0];
            const empId = evt.target.dataset.id.split('/')[1]
            const updatedData = {
                updatedAt: timestamp(),
                status: 1
            }
            
            updateOrderStatus(id, updatedData);
            updateEmployee(empId, {act_count: Number(act_count)-1, updatedAt: updatedData.updatedAt})
            window.location.reload();
        }
    }
})





