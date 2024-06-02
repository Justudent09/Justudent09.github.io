let tg = window.Telegram.WebApp;


let usercard = document.getElementById("usercard");

let h1 = document.createElement("h1");

h1.innerText = `${tg.initDataUnsafe.user.first_name} ${tg.initDataUnsafe.user.last_name} ,`;

usercard.appendChild(h1);


document.addEventListener("DOMContentLoaded", function() {
            const schedule = {
                "01/06/24": ["Иностранный язык"],
                "03/06/24": ["Дискретная математика", "Дискретная математика", "Дискретная математика", "Физическая культура"],
                "04/06/24": ["Дискретная математика", "Дискретная математика", "Дискретная математика", "Дискретная математика", "Иностранный язык"],
                "05/06/24": ["Дискретная математика", "Дискретная математика", "Дискретная математика", "Физическая культура"],
                "06/06/24": ["Дискретная математика", "Дискретная математика", "Дискретная математика", "Иностранный язык"],
                "07/06/24": ["Дискретная математика", "Дискретная математика", "Дискретная математика"]
            };

            const now = new Date();
            const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
            const daysContainer = document.getElementById("daysContainer");
            const appealText = document.getElementById("appealText");

            const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

            let activeDayDiv;

            function formatDate(date) {
                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const year = String(date.getFullYear()).slice(-2);
                return `${day}/${month}/${year}`;
            }

            function updateCouples(dateKey) {
                console.log(`Updating couples for date: ${dateKey}`);
                const couples = schedule[dateKey] || [];
                let coupleCount = 0;

                for (let i = 1; i <= 5; i++) {
                    const coupleDiv = document.getElementById(`couple${i}`);
                    if (couples[i - 1]) {
                        coupleDiv.textContent = couples[i - 1];
                        coupleCount++;
                    } else {
                        coupleDiv.textContent = "";
                    }
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

            // Initialize the current day's couples and appeal text
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