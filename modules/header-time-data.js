export class HeaderTimeData {
    constructor() {
        this.seconds = document.getElementById('seconds');
        this.minutes = document.getElementById('minutes');
        this.hours = document.getElementById('hours');
        this.dateString = document.getElementById('full-date');
        this.init();
        setInterval(() => this.init(), 1000);
    }

    init() {
        const now = new Date();
        this.seconds.innerHTML = (now.getSeconds() < 10 ? '0' : '') + now.getSeconds();
        this.minutes.innerHTML = (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
        this.hours.innerHTML = (now.getHours() < 10 ? '0' : '') + now.getHours();

        const days = [
            'Воскресенье',
            'Понедельник',
            'Вторник',
            'Среда',
            'Четверг',
            'Пятница',
            'Суббота'
        ];
        const day = now.getDay();
        const monthName = now.toLocaleString('default', {month: 'short'});
        const today = now.toLocaleString().slice(0, 2);

        this.dateString.innerHTML = `${today} ${monthName} ${days[day]}`;
    }
}