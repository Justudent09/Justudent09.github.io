let tg = window.Telegram.WebApp;

let usercard = document.getElementById("usercard");

let h1 = document.createElement("h1");

h1.innerText = `${tg.initDataUnsafe.user.first_name} ${tg.initDataUnsafe.user.last_name} ,`;

usercard.appendChild(h1);

document.addEventListener("DOMContentLoaded", function() {
    const schedules = [
        {
            ids: [],
            schedule: {
                "01/06/24": ["Противоправное поведение и правонарушение", "Противоправное поведение и правонарушение", "Противоправное поведение и правонарушение", "Иностранный язык"],
                "03/06/24": ["Иностранный язык", "Иностранный язык", "Иностранный язык", "Физическая культура"],
                "04/06/24": ["Иностранный язык", "Иностранный язык", "Иностранный язык", "ИОГП", "ИОГП"],
                "05/06/24": ["ИОГП", "ИОГП", "ИОГП", "Физическая культура"],
                "06/06/24": ["ИОГП", "ИОГП", "ИОГП", "ИОГП"],
                "07/06/24": ["ИОГП", "ИОГП", "ИОГП"]
            }
        },
        {
            ids: ["5136839421", "942573399", "887422835"],
            schedule: {
                "01/06/24": ["Иностранный язык"],
                "03/06/24": ["Дискретная математика", "Дискретная математика", "Дискретная математика", "Физическая культура"],
                "04/06/24": ["Дискретная математика", "Дискретная математика", "Дискретная математика", "Дискретная математика", "Иностранный язык"],
                "05/06/24": ["Дискретная математика", "Дискретная математика", "Дискретная математика", "Физическая культура"],
                "06/06/24": ["Дискретная математика", "Дискретная математика", "Дискретная математика", "Иностранный язык"],
                "07/06/24": ["Дискретная математика", "Дискретная математика", "Дискретная математика"]
            }
        },
        {
            ids: [],
            schedule: {
                "01/06/24": ["Иностранный язык", "Иностранный язык"],
                "03/06/24": ["Математика для менеджеров", "Математика для менеджеров", "Математика для менеджеров", "Физическая культура"],
                "04/06/24": ["Математика для менеджеров", "Математика для менеджеров", "Математика для менеджеров", "Иностранный язык"],
                "05/06/24": ["Иностранный язык", "Математика для менеджеров", "Математика для менеджеров", "Физическая культура"],
                "06/06/24": ["Иностранный язык", "Иностранный язык", "Иностранный язык"]
            }
        }
    ];

    const userId = tg.initDataUnsafe.user.id.toString();
    console.log('ID пользователя из Telegram:', userId);

    let schedule;

    for (const sched of schedules) {
        if (sched.ids.includes(userId)) {
            schedule = sched.schedule;
            break;
        }
    }

    if (!schedule) {
        document.body.innerHTML = '<div id="centeredText"><h1 style="color: white;">ИЗВИНИТЕ, ДОСТУП К ДАННОМУ БОТУ ОГРАНИЧЕН</h1></div>';
        return;
    }

    const now = new Date();
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const daysContainer = document.getElementById("daysContainer");
    const appealText = document.getElementById("appealText");
    const contour = document.getElementById("contour");

    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    let activeDayDiv;

    function formatDate(date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear()).slice(-2);
        return `${day}/${month}/${year}`;
    }

    function updateCouples(dateKey) {
        const couples = schedule[dateKey] || [];
        let coupleCount = 0;

        contour.innerHTML = '';

        const times = ["09:00", "10:40", "13:20", "15:00", "16:40"];

        for (let i = 0; i < couples.length; i++) {
            if (couples[i]) {
                const c1 = document.createElement('div');
                c1.className = 'c1';
                const time = document.createElement('p');
                time.className = 'time';
                time.textContent = times[i];

                const coupleDiv = document.createElement('div');
                coupleDiv.className = 'couple';
                coupleDiv.id = `couple${i + 1}`;
                coupleDiv.textContent = couples[i];

                c1.appendChild(time);
                c1.appendChild(coupleDiv);
                contour.appendChild(c1);

                coupleCount++;
            }
        }

        if (coupleCount === 0) {
            contour.innerHTML = '<div class="day-off">ВЫХОДНОЙ</div>';
        }
    }

    function updateAppealText(coupleCount) {
        switch (coupleCount) {
            case 0:
                appealText.textContent = "сегодня у вас выходной";
                break;
            case 1:
                appealText.textContent = "сегодня у вас одна пара";
                break;
            case 2:
                appealText.textContent = "сегодня у вас две пары";
                break;
            case 3:
                appealText.textContent = "сегодня у вас три пары";
                break;
            case 4:
                appealText.textContent = "сегодня у вас четыре пары";
                break;
            case 5:
                appealText.textContent = "сегодня у вас пять пар";
                break;
        }
    }

    const todayDateKey = formatDate(now);
    const todayCouples = schedule[todayDateKey] || [];
    updateCouples(todayDateKey);
    updateAppealText(todayCouples.length);

    for (let i = 1; i <= daysInMonth; i++) {
        const dayDiv = document.createElement("div");
        dayDiv.classList.add("my-div");

        const circleDiv = document.createElement("div");
        circleDiv.classList.add("circle");
        circleDiv.textContent = i;

        const dayName = document.createElement("p");
        const date = new Date(now.getFullYear(), now.getMonth(), i);
        const dateKey = formatDate(date);
        dayName.textContent = dayNames[date.getDay()];

        dayDiv.appendChild(circleDiv);
        dayDiv.appendChild(dayName);
        daysContainer.appendChild(dayDiv);

        if (i === now.getDate()) {
            dayDiv.classList.add('active');
            circleDiv.style.background = 'linear-gradient(#B4B2E2, #9293DF)';
            dayDiv.style.color = 'white';
            activeDayDiv = dayDiv;

            updateCouples(dateKey);
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

            updateCouples(dateKey);
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