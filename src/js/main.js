import '../css/style.css';

let name = localStorage.getItem('name');
document.querySelector('.username').textContent = name ? name : 'vieras'; //

