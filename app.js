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

if (tg.initDataUnsafe.user.photo_url) {
    let profileImageDiv = document.getElementById("profileImageDiv");
    let img = document.createElement("img");
    img.src = tg.initDataUnsafe.user.photo_url;
    img.alt = "Profile Photo";
    img.style.width = "100px";  // Вы можете настроить ширину по своему желанию
    img.style.height = "100px"; // Вы можете настроить высоту по своему желанию

    // Очищаем содержимое div перед добавлением нового изображения
    profileImageDiv.innerHTML = '';
    
    profileImageDiv.appendChild(img);
}