let token = window.localStorage.getItem('token');
token = token ? token : '';
if(!token) window.location = '/login.html';

const elList = document.querySelector('.js-list');
const elTemplate = document.querySelector('.js-item').content;

function renderActs(arr, node){
    node.innerHTML = '';
    const fragment = document.createDocumentFragment();
    let technics = window.localStorage.getItem('technics');
    technics = technics ? JSON.parse(technics):[];

    arr.forEach(({tech_id, status, createdAt, updatedAt}) => {
        const clone = elTemplate.cloneNode(true);
        clone.querySelector('.js-name').textContent = technics[tech_id-1].name;
        if(updatedAt) clone.querySelector('.js-date').textContent = updatedAt.split('/')[0];
        else clone.querySelector('.js-date').textContent = createdAt.split('/')[0];

        if(status) clone.querySelector('.js-status-1').style.display = 'block';
        else clone.querySelector('.js-status-0').style.display = 'block';
        fragment.append(clone);
    });
    node.append(fragment);
    
}

const urls = [
    'http://localhost:4000/api/technics',
    'http://localhost:4000/api/acts'
  ];
  const promises = urls.map(url => fetch(url).then(res => res.json()));
  Promise.all(promises)
    .then(data => {
        window.localStorage.setItem('technics', JSON.stringify(data[0]));
        renderActs(data[1], elList);
    })
    .catch(err => {
      console.error('Error fetching one of the URLs:', err);
    });