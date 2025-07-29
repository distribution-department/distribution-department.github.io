import {ItemInfoData} from "./item-info-data.js";

export class FullSalesChart {
    constructor(storageData, monthes, sumYear, categories, sumCategory, fullCategory, fullCategoryMounthly) {
        this.storageData = storageData;
        this.monthes = monthes;
        this.sum2023Monthes = sumYear[2023];
        this.sum2024Monthes = sumYear[2024];
        this.sum2025Monthes = sumYear[2025];

        this.categories = categories;
        this.fullCategory = fullCategory;
        this.fullCategoryMounthly = fullCategoryMounthly;
        this.sum2023Category = sumCategory[2023];
        this.sum2024Category = sumCategory[2024];
        this.sum2025Category = sumCategory[2025];

        this.allSalesDataBtn = document.querySelector('.all-sales');
        this.chooseCategoryBtn = document.querySelector('.choose-grope');
        this.selectedCategory = document.querySelector('.selected-grope');
        this.allCategoryDataBtn = document.querySelector('.all-gropes');
        this.chartInstance = null; // ← сюда будет сохраняться экземпляр графика
        this.init();
    }

    init() {
        this.createMainChart(this.monthes, this.sum2023Monthes, this.sum2024Monthes, this.sum2025Monthes);
        let elems = document.querySelector('.selected-grope');
        M.FormSelect.init(elems);

        this.allCategoryDataBtn.addEventListener('click', () => {
            let categoriesNames = [];
            let categoriesSumm = [];
            this.fullCategory.forEach(({category}) => categoriesNames.push(category));
            this.fullCategory.forEach(({total}) => categoriesSumm.push(total));

            this.ctreateFullCategoryDataChart(categoriesNames, categoriesSumm);
        })
        this.allSalesDataBtn.addEventListener('click', () => {
            this.createMainChart(this.monthes, this.sum2023Monthes, this.sum2024Monthes, this.sum2025Monthes);
        })
        this.chooseCategoryBtn.addEventListener('click', () => {
            if (this.selectedCategory.value == '0') return
            const categoryName = this.selectedCategory.value;
            const filtered = {
                2023: [],
                2024: [],
                2025: []
            };

            Object.keys(this.fullCategoryMounthly).forEach(year => {
                this.fullCategoryMounthly[year].forEach(entry => {
                    if (entry.category === categoryName) {
                        filtered[year].push({
                            month: entry.month,
                            total: entry.total
                        });
                    }
                });
            });

            let grope2023data = [];
            filtered[2023].forEach(({month, total}) => {
                grope2023data.push(total);
            })

            let grope2024data = [];
            filtered[2024].forEach(({month, total}) => {
                grope2024data.push(total);
            })

            let grope2025data = [];
            filtered[2025].forEach(({month, total}) => {
                grope2025data.push(total);
            })

            this.createByCategoryChart(this.monthes, grope2023data, grope2024data, grope2025data, categoryName);
        })

        new ItemInfoData(this.storageData);
    };

    createMainChart(monthes, data2023, data2024, data2025) {
        let title = `Общие продажи ТНП`;
        const labels = monthes;

        const data = {
            labels: labels,
            datasets: [
                {
                    label: '2023',
                    data: data2023,
                },
                {
                    label: '2024',
                    data: data2024,
                },
                {
                    label: '2025',
                    data: data2025,
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

        const canvas = document.getElementById('fullEpc');

        // ✅ Уничтожение предыдущего графика, если он существует
        if (this.chartInstance) {
            this.chartInstance.destroy();
        }

        // 🎯 Создание нового графика
        this.chartInstance = new Chart(canvas, config);
    };

    createByCategoryChart(monthes, data2023, data2024, data2025, category) {
        let title = `Динамика продаж в разрезе категории ${category}`;
        const labels = monthes;

        const data = {
            labels: labels,
            datasets: [
                {
                    label: '2023',
                    data: data2023,
                },
                {
                    label: '2024',
                    data: data2024,
                },
                {
                    label: '2025',
                    data: data2025,
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

        const canvas = document.getElementById('fullEpc');

        // ✅ Уничтожение предыдущего графика, если он существует
        if (this.chartInstance) {
            this.chartInstance.destroy();
        }

        // 🎯 Создание нового графика
        this.chartInstance = new Chart(canvas, config);
    };

    ctreateFullCategoryDataChart(categories, sales) {
        let title = `Общие продажи ТНП по категориям за 2023,2024,2025`;
        const data = {
            labels: categories,
            datasets: [{
                label: 'Продажи в категории',
                data: sales,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)',
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)',
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)',
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)',
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)',
                    'rgb(255, 99, 132)'
                ],
                borderWidth: 1
            }]
        };

        const config = {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
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

        const canvas = document.getElementById('fullEpc');

        // ✅ Уничтожение предыдущего графика, если он существует
        if (this.chartInstance) {
            this.chartInstance.destroy();
        }

        // 🎯 Создание нового графика
        this.chartInstance = new Chart(canvas, config);
    }

}