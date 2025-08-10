export class ItemInfoData {
    constructor(data) {
        this.data = data;

        this.serchItemBtn = document.querySelector('.search-item');
        this.serchItemData = document.querySelector('#item_name');

        this.itemName = document.querySelector('.item__name');
        this.itemArticle = document.querySelector('.item__article');
        this.itemGrope = document.querySelector('.item__grope');

        this.itemSales2023uah = document.querySelector('.sales-money-23');
        this.itemSales2024uah = document.querySelector('.sales-money-24');
        this.itemSales2025uah = document.querySelector('.sales-money-25');

        this.itemSales2023count = document.querySelector('.sales-count-23');
        this.itemSales2024count = document.querySelector('.sales-count-24');
        this.itemSales2025count = document.querySelector('.sales-count-25');

        this.monthes = [
            'январь', 'февраль', 'март', 'апрель', 'май', 'июнь',
            'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'
        ];

        this.fullSales2023 = [];
        this.fullSales2024 = [];
        this.fullSales2025 = [];

        this.chartSelector = document.querySelector('.item-info__chart');
        this.chartItemInstance = null; // ← сюда будет сохраняться экземпляр графика

        this.item = {
            name: '---',
            article: '---',
            grope: '---',
            sales2023uah: 0,
            sales2023count: 0,
            sales2024uah: 0,
            sales2024count: 0,
            sales2025uah: 0,
            sales2025count: 0
        }

        this.init();
    }

    init() {
        this.closeData();

        this.serchItemBtn.addEventListener('click', () => {
            getData();
        });
        document.addEventListener('keydown', (event) => {
            if (event.code === 'Enter' || event.code === 'NumpadEnter') {
                getData();
            }
        });

        let getData = () => {
            let searchElement = this.serchItemData.value.trim();

            if (searchElement === '') return;
            this.getDataForTitle(searchElement);
        }
    }

    closeData() {
        this.itemName.innerHTML = this.item.name;
        this.itemArticle.innerHTML = this.item.article;
        this.itemGrope.innerHTML = this.item.grope;

        this.itemSales2023uah.innerHTML = this.item.sales2023uah;
        this.itemSales2024uah.innerHTML = this.item.sales2024uah;
        this.itemSales2025uah.innerHTML = this.item.sales2025uah;

        this.itemSales2023count.innerHTML = this.item.sales2023count;
        this.itemSales2024count.innerHTML = this.item.sales2024count;
        this.itemSales2025count.innerHTML = this.item.sales2025count;
    };

    getDataForTitle(searchElement) {
        let filtered = this.data.filter(item => item.article == searchElement);
        if (filtered.length < 1) {
            M.toast({
                html: 'Товар не найден', classes: 'red-text text-lighten-5 red lighten-1'
            })
        } else {
            this.item.name = filtered[0].title;
            this.item.article = filtered[0].article;
            this.item.grope = filtered[0].grope;

            let year2023 = filtered.filter(item => item.year == 2023);
            this.fullSales2023 = [...year2023];
            let year2024 = filtered.filter(item => item.year == 2024);
            this.fullSales2024 = [...year2024];
            let year2025 = filtered.filter(item => item.year == 2025);
            this.fullSales2025 = [...year2025];

            let year2023u = Math.round(year2023.reduce((sum, item) => sum + (item.saleMoney || 0), 0));
            let year2023c = Math.round(year2023.reduce((sum, item) => sum + (item.saleCount || 0), 0));
            this.item.sales2023uah = year2023u;
            this.item.sales2023count = year2023c;

            let year2024u = Math.round(year2024.reduce((sum, item) => sum + (item.saleMoney || 0), 0));
            let year2024c = Math.round(year2024.reduce((sum, item) => sum + (item.saleCount || 0), 0));
            this.item.sales2024uah = year2024u;
            this.item.sales2024count = year2024c;

            let year2025u = Math.round(year2025.reduce((sum, item) => sum + (item.saleMoney || 0), 0));
            let year2025c = Math.round(year2025.reduce((sum, item) => sum + (item.saleCount || 0), 0));
            this.item.sales2025uah = year2025u;
            this.item.sales2025count = year2025c;

            this.itemName.innerHTML = this.item.name;
            this.itemArticle.innerHTML = this.item.article;
            this.itemGrope.innerHTML = this.item.grope;

            this.itemSales2023uah.innerHTML = this.item.sales2023uah.toLocaleString();
            this.itemSales2023count.innerHTML = this.item.sales2023count.toLocaleString();

            this.itemSales2024uah.innerHTML = this.item.sales2024uah.toLocaleString();
            this.itemSales2024count.innerHTML = this.item.sales2024count.toLocaleString();

            this.itemSales2025uah.innerHTML = this.item.sales2025uah.toLocaleString();
            this.itemSales2025count.innerHTML = this.item.sales2025count.toLocaleString();

            this.getDataForChart();
        }
    }

    getDataForChart() {
        const monthlySales23 = this.monthes.map(month => {
            const monthData = this.fullSales2023.filter(item => item.month === month);
            if (monthData.length > 0) {
                const total = monthData.reduce((sum, item) => sum + (item.saleCount || 0), 0);
                return Math.round(total);
            } else {
                return null;
            }
        });
        const monthlySales24 = this.monthes.map(month => {
            const monthData = this.fullSales2024.filter(item => item.month === month);
            if (monthData.length > 0) {
                const total = monthData.reduce((sum, item) => sum + (item.saleCount || 0), 0);
                return Math.round(total);
            } else {
                return null;
            }
        });
        const monthlySales25 = this.monthes.map(month => {
            const monthData = this.fullSales2025.filter(item => item.month === month);
            if (monthData.length > 0) {
                const total = monthData.reduce((sum, item) => sum + (item.saleCount || 0), 0);
                return Math.round(total);
            } else {
                return null;
            }
        });
        this.createItemChart(monthlySales23, monthlySales24, monthlySales25);
    }

    createItemChart(sales23, sales24, sales25) {
        this.chartSelector.style.display = 'block';

        let title = `Динамика продаж в штуках`;
        const labels = this.monthes;

        const data = {
            labels: labels,
            datasets: [
                {
                    label: '2023',
                    data: sales23,
                },
                {
                    label: '2024',
                    data: sales24,
                },
                {
                    label: '2025',
                    data: sales25,
                },
            ]
        };

        const config = {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: title
                    }
                }
            },
        };

        const canvas = document.getElementById('itemChart');

        // ✅ Уничтожение предыдущего графика, если он существует
        if (this.chartItemInstance) {
            this.chartItemInstance.destroy();
        }

        // 🎯 Создание нового графика
        this.chartItemInstance = new Chart(canvas, config);
    };
}