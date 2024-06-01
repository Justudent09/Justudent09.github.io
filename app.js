let tg = window.Telegram.WebApp;

let usercard = document.getElementById("usercard");

let h1 = document.createElement("h1");

h1.innerText = `${tg.initDataUnsafe.user.first_name} ${tg.initDataUnsafe.user.last_name} ,`;

usercard.appendChild(h1);

document.getElementById('fileInput').addEventListener('change', handleFile, false);

let scheduleData = {};

function handleFile(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, {type: 'array'});
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, {header: 1});

        processData(jsonData);
    };

    reader.readAsArrayBuffer(file);
}

function processData(data) {
    scheduleData = {};
    for (let i = 0; i < data.length; i++) {
        const row = data[i];
        if (row[0] && row[0].match(/^\d{2}\/\d{2}\/\d{2}$/)) {
            const date = row[0];
            scheduleData[date] = [];
            for (let j = 2; j <= 6; j++) {
                if (data[i + j - 1]) {
                    scheduleData[date].push(data[i + j - 1][2] || "нет пары");
                }
            }
        }
    }

    // Обновление текущей даты
    const now = new Date();
    const formattedDate = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getFullYear()).slice(-2)}`;
    updateCouplesContent(formattedDate);
}

document.addEventListener('DOMContentLoaded', function() {
    const now = new Date();
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const daysContainer = document.getElementById("daysContainer");

    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let activeDayDiv;

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
});

function updateCouplesContent(date) {
    const couplesContainer = document.querySelector(".contour");
    const coupleDivs = couplesContainer.querySelectorAll(".couple");
    const schedule = scheduleData[date];

    if (!schedule || schedule.length === 0) {
        coupleDivs.forEach((div) => {
            div.textContent = "выходной";
        });
        return;
    }

    let allEmpty = true;
    coupleDivs.forEach((div, index) => {
        if (schedule[index]) {
            div.textContent = schedule[index];
            allEmpty = false;
        } else {
            div.textContent = "нет пары";
        }
    });

    if (allEmpty) {
        coupleDivs.forEach((div) => {
            div.textContent = "выходной";
        });
    }
}