let tg = window.Telegram.WebApp;

let usercard = document.getElementById("usercard");

let h1 = document.createElement("h1");

h1.innerText = `${tg.initDataUnsafe.user.first_name} ${tg.initDataUnsafe.user.last_name} ,`;

usercard.appendChild(h1);

document.addEventListener("DOMContentLoaded", function() {
    const now = new Date();
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const daysContainer = document.getElementById("daysContainer");

    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let activeDayDiv;

    const scheduleData = {
        "01/06/24": ["Иностранный язык"],
        "03/06/24": ["Дискретная математика", "Дискретная математика", "Дискретная математика", "Физическая культура"],
        "04/06/24": ["Дискретная математика", "Дискретная математика", "Дискретная математика", "Дискретная математика", "Иностранный язык"],
        "05/06/24": ["Дискретная математика", "Дискретная математика", "Дискретная математика", "Физическая культура"],
        "06/06/24": ["Дискретная математика", "Дискретная математика", "Дискретная математика", "Иностранный язык"],
        "07/06/24": ["Дискретная математика", "Дискретная математика", "Дискретная математика"]
    };

    for (let i = 1; i <= daysInMonth; i++) {
        const dayDiv = document.createElement("div");
        dayDiv.classList.add("my-div");

        const circleDiv = document.createElement("div");
        circleDiv.classList.add("circle");
        circleDiv.textContent = i;

        const dayName = document.createElement("p");
        const date = new Date(now.getFullYear(), now.getMonth(), i);
        dayName.textContent = dayNames[date.getDay()];

        dayDiv.appendChild(circleDiv);
        dayDiv.appendChild(dayName);
        daysContainer.appendChild(dayDiv);

        const formattedDate = `${String(i).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getFullYear()).slice(-2)}`;

        if (i === now.getDate()) {
            dayDiv.classList.add('active');
            circleDiv.style.background = 'linear-gradient(#B4B2E2, #9293DF)';
            dayDiv.style.color = 'white';
            activeDayDiv = dayDiv;
            updateCouplesContent(formattedDate);
        }

        dayDiv.addEventListener('click', function() {
            if (activeDayDiv) {
                activeDayDiv.classList.remove('active');
                activeDayDiv.querySelector('.circle').style.background = '#28272C';
                activeDayDiv.style.color = '#5D5C61';
            }

            this.classList.add('active');
            this.querySelector('.circle').style.background = 'linear-gradient(#B4B2E2, #9293DF)';
            this.style.color = 'white';
            activeDayDiv = this;
            updateCouplesContent(formattedDate);
        });
    }

    const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const year = now.getFullYear();
    const monthName = monthNames[now.getMonth()];
    const currentDate = `${monthName}, ${year}`;

    document.getElementById("currentDateDiv").innerText = currentDate;

    if (activeDayDiv) {
        const index = Array.prototype.indexOf.call(daysContainer.children, activeDayDiv);
        const offset = Math.max(index - 1, 0);
        daysContainer.scrollLeft = daysContainer.children[offset].offsetLeft - daysContainer.offsetWidth / 2 + activeDayDiv.offsetWidth / 2;
    }

    function updateCouplesContent(date) {
        const couplesContainer = document.querySelector(".contour");
        const coupleDivs = couplesContainer.querySelectorAll(".couple");
        const schedule = scheduleData[date];

        let allEmpty = true;
        coupleDivs.forEach((div, index) => {
            if (schedule && schedule[index]) {
                div.textContent = schedule[index];
                allEmpty = false;
            } else {
                div.textContent = "";
            }
        });

        if (allEmpty) {
            coupleDivs.forEach((div) => {
                div.textContent = "выходной";
            });
        }
    }

    // Ensure the content is updated for the initial active date
    const initialActiveDate = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getFullYear()).slice(-2)}`;
    updateCouplesContent(initialActiveDate);
});