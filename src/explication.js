const btnBlog = document.querySelector('#toggleblog');
const blogSection = document.querySelector('#blog-section');

btnBlog.addEventListener('click', () => {
    if (blogSection.classList.contains('hidden')) {
        blogSection.classList.remove('hidden');
        btnBlog.innerText = "Fermer les Rapports";
        blogSection.scrollIntoView({ behavior: 'smooth' });
    } else {
        blogSection.classList.add('hidden');
        btnBlog.innerText = "Ouvrir les Rapports de Mission";
    }
});