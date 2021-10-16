const slideList = () => {
    const burger = document.querySelector('.menu-bar');
    const nav = document.querySelector('nav ul');

    burger.addEventListener('click', () => {
        nav.classList.toggle('slide')
    })
}

const app = () => {
    slideList();
}

app();