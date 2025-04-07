let token = window.localStorage.getItem('token');
token = token ? token : '';
if(!token) window.location = '/login.html';

const elList = document.querySelector('.js-client-orders-list');
const elOrder = document.querySelector('.js-order-template').content;

function render(arr, node){
    node.innerHTML = '';
    const fragment = document.createDocumentFragment();

    arr.forEach(({createdAt, name, id, status, updatedAt, employeeName, total_price}) => {
        const clone = elOrder.cloneNode(true);
        if(status != 1){
            clone.querySelector('.js-date').textContent = createdAt.split('/')[0];
            clone.querySelector('.js-name').textContent = name;
            clone.querySelector('.js-technics-price').textContent = total_price;
            clone.querySelector('.js-employee-name').textContent = employeeName;
            clone.querySelector('.js-status-0').style.display = "block";
        } else {
            if(updatedAt){
                clone.querySelector('.js-date').textContent = updatedAt.split('/')[0];
                clone.querySelector('.js-employee-name').textContent = employeeName;
                clone.querySelector('.js-technics-price').textContent = total_price;
                clone.querySelector('.js-status-1').style.display = "block";
            } 
            else {
                clone.querySelector('.js-employee-name').textContent = employeeName;
                clone.querySelector('.js-status-1').style.display = "block";
                clone.querySelector('.js-technics-price').textContent = total_price;
                clone.querySelector('.js-date').textContent = createdAt.split('/')[0];
            } 
        }
        fragment.append(clone);
    });
    node.append(fragment);
}

async function clientOrders(token) {
    const req = await fetch('http://localhost:4000/api/acts/client',{
        headers:{
            authorization: token
        }
    });

    const res = await req.json();
    console.log(res);
    
    render(res, elList);
}
if(token) clientOrders(token);








