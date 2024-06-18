let tg = window.Telegram.WebApp;

let usercard = document.getElementById("usercard");

let h1 = document.createElement("h1");

h1.innerText = `${tg.initDataUnsafe.user.first_name} ${tg.initDataUnsafe.user.last_name},`;

usercard.appendChild(h1);

document.addEventListener("DOMContentLoaded", function() {
    const schedules = [
                {
            course: "1",
            direction: "management",
            schedule: {
                "01/06/24": [
                    { subject: "Иностранный язык", room: "А1" },
                    { subject: "Иностранный язык", room: "А1" },
                ],
                "03/06/24": [
                    { subject: "Математика для менеджеров", room: "А1" },
                    { subject: "Математика для менеджеров", room: "А1" },
                    { subject: "Математика для менеджеров", room: "А1" },
                    { subject: "Физическая культура" }
                ],
                "04/06/24": [
                    { subject: "Математика для менеджеров", room: "А1" },
                    { subject: "Математика для менеджеров", room: "А1" },
                    { subject: "Математика для менеджеров", room: "А1" },
                    { subject: "Иностранный язык", room: "А1" }
                ],
                "05/06/24": [
                    { subject: "Иностранный язык", room: "А1" },
                    { subject: "Математика для менеджеров", room: "А1" },
                    { subject: "Математика для менеджеров", room: "А1" },
                    { subject: "Физическая культура" }
                ],
                "06/06/24": [
                    { subject: "Иностранный язык", room: "А1" },
                    { subject: "Иностранный язык", room: "А1" },
                    { subject: "Иностранный язык", room: "А1" }
                ],
                "07/06/24": [
                    { subject: "Иностранный язык", room: "А1" }
                ]
            }
        },
        {
            course: "1",
            direction: "pmi",
            schedule: {
                "01/06/24": [
                    { subject: "Иностранный язык", room: "А2" }
                ],
                "03/06/24": [
                    { subject: "Дискретная математика", room: "А2" },
                    { subject: "Дискретная математика", room: "А2" },
                    { subject: "Дискретная математика", room: "А2" },
                    { subject: "Физическая культура" }
                ],
                "04/06/24": [
                    { subject: "Дискретная математика", room: "А2" },
                    { subject: "Дискретная математика", room: "А2" },
                    { subject: "Дискретная математика", room: "А2" },
                    { subject: "Иностранный язык", room: "А2" }
                ],
                "05/06/24": [
                    { subject: "Дискретная математика", room: "А2" },
                    { subject: "Дискретная математика", room: "А2" },
                    { subject: "Дискретная математика", room: "А2" },
                    { subject: "Физическая культура" }
                ],
                "06/06/24": [
                    { subject: "Дискретная математика", room: "А2" },
                    { subject: "Дискретная математика", room: "А2" },
                    { subject: "Дискретная математика", room: "А2" },
                    { subject: "Иностранный язык", room: "А2" }
                ],
                "07/06/24": [
                    { subject: "Дискретная математика", room: "А2" },
                    { subject: "Дискретная математика", room: "А2" },
                    { subject: "Дискретная математика", room: "А2" }
                ]
            }
        },
        {
            course: "1",
            direction: "jurisprudence",
            schedule: {
                "01/06/24": [
                    { subject: "Противоправное поведение и правонарушение", room: "Л1" },
                    { subject: "Противоправное поведение и правонарушение", room: "Л1" },
                    { subject: "Противоправное поведение и правонарушение", room: "Л1" },
                    { subject: "Иностранный язык", room: "Л1" }
                ],
                "03/06/24": [
                    { subject: "Иностранный язык", room: "Л1" },
                    { subject: "Иностранный язык", room: "Л1" },
                    { subject: "Иностранный язык", room: "Л1" },
                    { subject: "Физическая культура" }
                ],
                "04/06/24": [
                    { subject: "Иностранный язык", room: "Л1" },
                    { subject: "Иностранный язык", room: "Л1" },
                    { subject: "Иностранный язык", room: "Л1" },
                    { subject: "ИОГП", room: "Л1" },
                    { subject: "ИОГП", room: "Л1" }
                ],
                "05/06/24": [
                    { subject: "ИОГП", room: "Л1" },
                    { subject: "ИОГП", room: "Л1" },
                    { subject: "ИОГП", room: "Л1" },
                    { subject: "Физическая культура" }
                ],
                "06/06/24": [
                    { subject: "ИОГП", room: "Л1" },
                    { subject: "ИОГП", room: "Л1" },
                    { subject: "ИОГП", room: "Л1" },
                    { subject: "ИОГП", room: "Л1" }
                ],
                "07/06/24": [
                    { subject: "ИОГП", room: "Л1" },
                    { subject: "ИОГП", room: "Л1" },
                    { subject: "ИОГП", room: "Л1" }
                ]
            }
        }
    ];

    const userId = tg.initDataUnsafe.user.id.toString();
    console.log('ID пользователя из Telegram:', userId);

    let schedule;

    const storedCourse = localStorage.getItem('course');
    const storedDirection = localStorage.getItem('direction');

    if (storedCourse && storedDirection) {
        for (const sched of schedules) {
            if (sched.course === storedCourse && sched.direction === storedDirection) {
                schedule = sched.schedule;
                break;
            }
        }
        if (schedule) {
            document.getElementById('formContainer').classList.add('hidden');
            document.getElementById('mainContent').classList.remove('hidden');
            showSchedule(schedule);
        }
    } else {
        document.getElementById('formContainer').classList.remove('hidden');
    }

    document.getElementById('userForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const course = document.getElementById('course').value;
        const direction = document.getElementById('direction').value;
        const password = document.getElementById('password').value;

        console.log(`Введенные данные - Курс: ${course}, Направление: ${direction}, Пароль: ${password}`);

        if (password === '12345678') {
            for (const sched of schedules) {
                if (sched.course === course && sched.direction === direction) {
                    schedule = sched.schedule;
                    break;
                }
            }

            if (schedule) {
                localStorage.setItem('course', course);
                localStorage.setItem('direction', direction);
                // Анимация скрытия формы
                document.getElementById('formContainer').classList.add('slide-out-left');
                setTimeout(() => {
                    document.getElementById('formContainer').classList.add('hidden');
                    document.getElementById('mainContent').classList.remove('hidden');
                    showSchedule(schedule);
                }, 500); // время анимации совпадает с CSS анимацией
            } else {
                alert('Нет расписания для выбранного курса и направления.');
            }
        } else {
            alert('Неверный пароль');
        }
    });

    function showSchedule(schedule) {
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
                    coupleDiv.textContent = couples[i].subject;

                    const roomDiv = document.createElement('div');
                    roomDiv.className = 'room';
                    roomDiv.textContent = couples[i].room || '';
                    roomDiv.style.position = 'absolute';
                    roomDiv.style.bottom = '5%';
                    roomDiv.style.right = '5%';
                    roomDiv.style.fontSize = '150%';

                    coupleDiv.appendChild(roomDiv);
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

        const todayDateKey = formatDate(now);
        const todayCouples = schedule[todayDateKey] || [];
        updateCouples(todayDateKey);
        updateAppealText(todayCouples.length); // Обновить текст только один раз для сегодняшнего дня

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
    }

    const notificationsDiv = document.querySelector('.notifications');
    const notificationsPanel = document.getElementById('notificationsPanel');
    const overlay = document.getElementById('overlay');

    notificationsDiv.addEventListener('click', function(event) {
        notificationsPanel.classList.toggle('show');
        overlay.classList.toggle('show');
        document.body.classList.toggle('no-scroll');
        event.stopPropagation();
    });

    overlay.addEventListener('click', function() {
        notificationsPanel.classList.remove('show');
        overlay.classList.remove('show');
        document.body.classList.remove('no-scroll');
    });

    notificationsPanel.addEventListener('click', function(event) {
        event.stopPropagation();
    });

    // Показать кнопку удаления при нажатии на иконку профиля
    const profileIcon = document.querySelector('.icon-profile');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Удалить все данные';
    deleteButton.style.display = 'none';
    deleteButton.addEventListener('click', function() {
        localStorage.clear();
        alert('Все данные удалены. Пожалуйста, обновите страницу.');
        location.reload(); // Перезагрузить страницу после удаления данных
    });

    document.body.appendChild(deleteButton);

    profileIcon.addEventListener('click', function() {
        deleteButton.style.display = 'block'; // Показать кнопку при нажатии на иконку профиля
    });

    function updateAppealText(coupleCount) {
        const appealText = document.getElementById("appealText");
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

    function showSchedule(schedule) {
        const now = new Date();
        const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
        const daysContainer = document.getElementById("daysContainer");
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
                    coupleDiv.textContent = couples[i].subject;

                    const roomDiv = document.createElement('div');
                    roomDiv.className = 'room';
                    roomDiv.textContent = couples[i].room || '';
                    roomDiv.style.position = 'absolute';
                    roomDiv.style.bottom = '5%';
                    roomDiv.style.right = '5%';
                    roomDiv.style.fontSize = '150%';

                    coupleDiv.appendChild(roomDiv);
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

        const todayDateKey = formatDate(now);
        const todayCouples = schedule[todayDateKey] || [];
        updateCouples(todayDateKey);
        updateAppealText(todayCouples.length); // Обновить текст только один раз для сегодняшнего дня

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
    }

    const notificationsDiv = document.querySelector('.notifications');
    const notificationsPanel = document.getElementById('notificationsPanel');
    const overlay = document.getElementById('overlay');

    notificationsDiv.addEventListener('click', function(event) {
        notificationsPanel.classList.toggle('show');
        overlay.classList.toggle('show');
        document.body.classList.toggle('no-scroll');
        event.stopPropagation();
    });

    overlay.addEventListener('click', function() {
        notificationsPanel.classList.remove('show');
        overlay.classList.remove('show');
        document.body.classList.remove('no-scroll');
    });

    notificationsPanel.addEventListener('click', function(event) {
        event.stopPropagation();
    });
});