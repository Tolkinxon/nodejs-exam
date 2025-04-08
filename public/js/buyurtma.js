let token = window.localStorage.getItem('token');
token = token ? token : '';
if(!token) window.location = '/login.html';

const elForm = document.querySelector('.js-form');
const elTechnics = document.querySelector('.js-technics-list');
const elEployees = document.querySelector('.js-employees-list');
const elUserName = document.querySelector('.js-user-name');
const elUserNumber = document.querySelector('.js-user-number');
const elUserPassword = document.querySelector('.js-user-password');

const elPrice = document.querySelector('.js-price');
const elBtn = document.querySelector('.js-btn');


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

function renderEmployees(arr, node){
    node.innerHTML = '';
    const fragment = document.createDocumentFragment();

    const option1 = document.createElement('option');
    option1.value = '';
    option1.textContent = 'Ishchi tanlang';
    option1.selected = true;
    option1.disabled = true;
    option1.hidden = true;

    arr.forEach(({username, id, act_count}) => {
            if(act_count < 3){
                const option = document.createElement('option');
                option.value = `${id}/${act_count}`;
                option.textContent = username;
                fragment.append(option);
            }
    });
    node.append(option1, fragment);
}

function renderTechnics(arr, node){
    node.innerHTML = '';
    const fragment = document.createDocumentFragment();

    const option1 = document.createElement('option');
    option1.value = '';
    option1.textContent = 'Texnikani tanlang';
    option1.selected = true;
    option1.disabled = true;
    option1.hidden = true;

    arr.forEach(({name, id}) => {
        const option = document.createElement('option');
        option.value = id;
        option.textContent = name
        fragment.append(option);
    });
    node.append(option1,fragment);
}

function timestamp(){
    const now = new Date();
    const datestamp = now.toISOString().slice(0, 10);
    const timestamp = `${now.getHours()}:${now.getMinutes()}`; 
    return `${datestamp}/${timestamp}`
}

async function postClient(data) {
    const req = await fetch('http://localhost:4000/api/clients',{
        method: "POST",
        headers:{
            "Content-type":"application/json"
        },
        body: JSON.stringify(data)
    });
    const res = await req.json();
    if(req.ok) return res.id;
    else return alert(res.message);
}

async function postAct(data) {
    const req = await fetch('http://localhost:4000/api/acts',{
        method: "POST",
        headers:{
            "Content-type":"application/json"
        },
        body: JSON.stringify(data)
    });
    const res = await req.json();
    console.log(res);
}

async function checkEmail(data) {
    const req = await fetch('http://localhost:4000/api/auth/check-email',{
        method: "POST",
        headers:{
            "Content-type":"application/json"
        },
        body: JSON.stringify({email: data})
    });
    const res = await req.json();
    return res
}

elForm.addEventListener('input', async (evt)=>{
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let formData  = new FormData(elForm);
    formData = Object.fromEntries(formData);

    if(emailPattern.test(formData.email)) {
        console.log(formData.email);
        const user = await checkEmail(formData.email);

        elUserPassword.disabled = false;
        elUserNumber.disabled = false;
        elUserName.disabled = false;

        console.log(user.user);
        

        if(user.user){
            const { password, phone, username } = user.user
            elUserPassword.value = password;
            elUserNumber.value = phone;
            elUserName.value = username;
        }
    }

    if(formData.tech_id) {
        let prices = window.localStorage.getItem('prices');
        prices = prices ? JSON.parse(prices):'';

        const foundedPrice = prices.find(item => item.tech_id == formData.tech_id);
        elPrice.value = foundedPrice.price;
        elPrice.disabled = false;
    }

    const values = Object.values(formData);
    const checking = values.every(item => item != '');
    if(checking && values.length == 7) elBtn.disabled = false;
    else elBtn.disabled = true;
});

elForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    let formData  = new FormData(elForm);
    formData = Object.fromEntries(formData);

    const act_count = formData.emp_id.split('/')[1];
    const updatedAt = timestamp();
    formData.emp_id = formData.emp_id.split('/')[0];
    updateEmployee(formData.emp_id, {act_count: Number(act_count) + 1, updatedAt});

    const clientKeys = ["username", "email", "phone", "password"];
    const clientData = clientKeys.reduce((obj, key) => {
        if (key in formData) {
            obj[key] = formData[key];
        }
        return obj;
    }, {});
    clientData.createdAt = timestamp();
    
    const actKeys = ["total_price", "tech_id", "emp_id" ];
    const actData = actKeys.reduce((obj, key) => {
        if (key in formData) {
            obj[key] = formData[key];
        }
        return obj;
        }, {});
    actData.createdAt = timestamp();
    actData.status = 0;
    actData.date = timestamp().split('/')[0];

    const id = await postClient(clientData);
    actData.client_id = id;
    postAct(actData);  
    window.location = 'royhat.buyurtmalar.html'; 
})

const urls = [
    'http://localhost:4000/api/prices',
    'http://localhost:4000/api/technics',
    'http://localhost:4000/api/employees'
  ];
  const promises = urls.map(url => fetch(url).then(res => res.json()));
  Promise.all(promises)
    .then(data => {
        window.localStorage.setItem('prices', JSON.stringify(data[0]));
        renderTechnics(data[1], elTechnics);
        renderEmployees(data[2], elEployees);
    })
    .catch(err => {
      console.error('Error fetching one of the URLs:', err);
    });