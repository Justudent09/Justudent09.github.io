document.addEventListener("DOMContentLoaded", function() {
            const now = new Date();
            const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
            const daysContainer = document.getElementById("daysContainer");

            // Массив с названиями дней недели
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

                if (i === now.getDate()) {
                    dayDiv.classList.add('active');
                    circleDiv.style.background = 'linear-gradient(#B4B2E2, #9293DF)';
                    dayDiv.style.color = 'white';
                    activeDayDiv = dayDiv;
                }

                // Добавляем обработчик событий для каждого div
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
                });
            }

            // Устанавливаем текущую дату в элемент с id "currentDateDiv"
            const monthNames = [
                "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
            ];

            const year = now.getFullYear();
            const monthName = monthNames[now.getMonth()];
            const currentDate = `${monthName}, ${year}`;

            document.getElementById("currentDateDiv").innerText = currentDate;

            // Прокручиваем к активному дню
            if (activeDayDiv) {
                const index = Array.prototype.indexOf.call(daysContainer.children, activeDayDiv);
                const offset = Math.max(index - 1, 0); // Учитываем, что первый элемент не должен прокручиваться слишком сильно
                daysContainer.scrollLeft = daysContainer.children[offset].offsetLeft - daysContainer.offsetWidth / 2 + activeDayDiv.offsetWidth / 2;
            }
        });