export class FoterData {
    constructor() {
        this.footerElement = document.querySelector('.section-footer');
        this.init();
    }

    init() {
        let date = new Date();
        let currentYear = 2025;
        if (date.toLocaleDateString().slice(6) == currentYear){
            this.footerElement.innerHTML = `© TNP Analizer ${currentYear}`;
        } else {
            this.footerElement.innerHTML = `© TNP Analizer 2025 - ${date.toLocaleDateString().slice(6)}`;
        }

    }
}