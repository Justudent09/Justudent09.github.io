document.addEventListener("DOMContentLoaded", function() {
    const divs = document.querySelectorAll('.my-div');

    divs.forEach(div => {
        div.addEventListener('click', function() {
            divs.forEach(d => {
                d.classList.remove('active'); // Удаление класса 'active' со всех div
                d.querySelector('.circle').style.background = '#28272C'; // Сброс цвета фона у всех circle
                d.style.color = '#5D5C61'; // Сброс цвета текста у всех my-div
            });
            this.classList.add('active'); // Добавление класса 'active' на нажатый div
            this.querySelector('.circle').style.background = 'linear-gradient(#B4B2E2, #9293DF)'; // Изменение цвета фона у circle на нажатом div
            this.style.color = 'white'; // Изменение цвета текста на нажатом div
        });
    });
});

