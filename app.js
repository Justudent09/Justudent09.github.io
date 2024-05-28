document.addEventListener("DOMContentLoaded", function() {
    const divs = document.querySelectorAll('.my-div');

    divs.forEach(div => {
        div.addEventListener('click', function() {
            divs.forEach(d => {
                d.classList.remove('active');
                d.querySelector('.circle').style.background = '#28272C';
                d.style.color = '#5D5C61';
            });
            this.classList.add('active');
            this.querySelector('.circle').style.background = 'linear-gradient(#B4B2E2, #9293DF)';
            this.style.color = 'white';
        });
    });
});



let tg = window.Telegram.WebApp;

let usercard = document.getElementById("usercard");

let h1 = document.createElement("h1");

h1.innerText = `${tg.initDataUnsafe.user.first_name} ${tg.initDataUnsafe.user.last_name} ,`;

usercard.appendChild(h1);



        // Получаем user_id из initDataUnsafe
        const user_id = tg.initDataUnsafe.user.id;

        if (user_id) {
            // Формируем URL для изображения профиля
            document.getElementById("profileImage").src = `/path/to/your/images/${user_id}.png`;
        } else {
            console.error("User ID not found in Telegram initData");
        }