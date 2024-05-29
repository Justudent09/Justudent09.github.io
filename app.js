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


const now = new Date();
        const monthNames = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        const year = now.getFullYear();
        const monthName = monthNames[now.getMonth()];
        const currentDate = `${monthName}, ${year}`;

        document.getElementById("currentDateDiv").innerText = currentDate;
      