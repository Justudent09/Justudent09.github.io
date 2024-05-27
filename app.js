document.addEventListener("DOMContentLoaded", function() {
    const divs = document.querySelectorAll('.my-div');

    divs.forEach(div => {
        div.addEventListener('click', function() {
            // Удаление класса 'active' со всех div
            divs.forEach(d => d.classList.remove('active'));
            // Добавление класса 'active' на нажатый div
            this.classList.add('active');
        });
    });
});