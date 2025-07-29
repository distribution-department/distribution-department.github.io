import {FullSalesChart} from "./full-sales-chart.js";

export class RequestModule {
    constructor(storage) {
        this.storage = storage;
        this.sectionBody = document.querySelector('.section-body');
        this.preloader = document.querySelector('.preloader');

        this.monthes = [
            'январь', 'февраль', 'март', 'апрель', 'май', 'июнь',
            'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'
        ];
        this.years = [2023, 2024, 2025];
        this.sumsByYear = {
            2023: [],
            2024: [],
            2025: []
        };

        this.categories = [];
        this.fullCategorySales = null;
        this.sumsByCategory = {
            2023: [],
            2024: [],
            2025: []
        };
        this.sumsByCategoryMounthly = {
            2023: [],
            2024: [],
            2025: []
        };

        this.init();
    }

    init(){
        this.getAllData()
    }

    async getAllData() {
        console.log('Загрузка инициирована ...');

        const fullDataObject = {"2023": [], "2024": [], "2025": []};
        let resultArrayData = [];

        const urls = [
            //--------------- 2023 --------------//
            {
                url: 'https://script.google.com/macros/s/AKfycbyUblQrHWt6tgF2_yvX20G98wnKcMsgunHwPBP3O6QN7psf8VGNECCAkg5whHEO6fVXKQ/exec',
                year: '2023',
                key: 'sales2023_6'
            },
            {
                url: 'https://script.google.com/macros/s/AKfycbwJ8iuCtGHQLns10i3iYMdH_Zdva3E4ggCSLxBSRqYrfDpLBumt1H530e3QwNNqvor2/exec',
                year: '2023',
                key: 'sales2023_7'
            },
            {
                url: 'https://script.google.com/macros/s/AKfycbzs2jzLoxCrTJ8ybx8_2WP07ZMOXiBmHp9r27Q2nnK6gtHr-QWBmKWY-YH4kMH7cr8WjA/exec',
                year: '2023',
                key: 'sales2023_8'
            },
            {
                url: 'https://script.google.com/macros/s/AKfycbwAWZPDfDie_TGtpzbx2iYTl4AyD4Mv50QhYzc95AtpeIMHqY6VhrXD71de1gMIiLA/exec',
                year: '2023',
                key: 'sales2023_9'
            },
            {
                url: 'https://script.google.com/macros/s/AKfycbwslfCuzVe3BuIa_DwIYSbPe7OaMR7wRb7khj_y9Sj0GxOoscIvswdB6F5-Obitu1kHfw/exec',
                year: '2023',
                key: 'sales2023_10'
            },
            {
                url: 'https://script.google.com/macros/s/AKfycbwOCsRgmrEFl2PtkSwNfggUOaL3aVaQsYaIG8WNCpDreneZSUjGR2XMCheYOFbDPGsr/exec',
                year: '2023',
                key: 'sales2023_11'
            },
            {
                url: 'https://script.google.com/macros/s/AKfycbx39YFZ8WQY_1UvCO7nkzVXQGRWe6rM5n6DSi4csiIq_YSe6sZb9n5yb3JT_qDcaZok/exec',
                year: '2023',
                key: 'sales2023_12'
            },

            //--------------- 2024 --------------//
            {
                url: 'https://script.google.com/macros/s/AKfycbx39Mrr-Cg2bh5HNESMJoQb9FhsPNSMFQfjudXl7Rp2BkBO1UtsNl6jJvWvBhtdUJ1Q/exec',
                year: '2024',
                key: 'sales2024_1'
            },
            {
                url: 'https://script.google.com/macros/s/AKfycbxrOzXDzahxQpk1fHa21CmoQN3iJl9beUG4TPDIDjIuQviDItjWRR6RoU7k_0i9N3Rbhw/exec',
                year: '2024',
                key: 'sales2024_2'
            },
            {
                url: 'https://script.google.com/macros/s/AKfycbxtyl_iDDTdTQ1_siX9XiZ3YM2FSTavV0b9Nbueyd3wmS8aXTE6Sgo3PqFHsr26Gjmw/exec',
                year: '2024',
                key: 'sales2024_3'
            },
            {
                url: 'https://script.google.com/macros/s/AKfycbzY7lC0l66GOoeC5TFkNPFJ_C_YSWslqT5Xrxcf5FEnqW74bIkDEJBW5B3ogXAswq5-/exec',
                year: '2024',
                key: 'sales2024_4'
            },
            {
                url: 'https://script.google.com/macros/s/AKfycbzDu7CSFtCaAio3gTO824jtte62Yu-Uf21JhiI76Mz7z0O3MoRSOwQABa42_pzVRSXT/exec',
                year: '2024',
                key: 'sales2024_5'
            },
            {
                url: 'https://script.google.com/macros/s/AKfycbwedT75BPZH0Xcjbfp3VnS3Haw2p4gKFGZhBr_q4r8KKJzjp0ZJz0zSiJgNE86MwtaS1w/exec',
                year: '2024',
                key: 'sales2024_6'
            },
            {
                url: 'https://script.google.com/macros/s/AKfycbzGR9IQxWiGsp7g6MTJjD--7Wu8DdFpelcGuKX8hKq0mWyJAClDw4RRa09qAdtyvgNTJQ/exec',
                year: '2024',
                key: 'sales2024_7'
            },
            {
                url: 'https://script.google.com/macros/s/AKfycbxfn5kuJZlBQ41SNeLcMyyk5VnK7ntND6y2VSPNBCJ39ulTWvQuoU50GbvEAkov4g2d/exec',
                year: '2024',
                key: 'sales2024_8'
            },
            {
                url: 'https://script.google.com/macros/s/AKfycbwkkAc8g-NxBCq4BWg1TZxWH7knfKjDn4269rEjz1X1HGy7mMuQkewoR-hCVlC0LGbp/exec',
                year: '2024',
                key: 'sales2024_9'
            },
            {
                url: 'https://script.google.com/macros/s/AKfycbxnXSI9xOhWVUwmSnkqY0PAtSxWG8Hqkp6Gze8sCMCni46iAYFW4J8xoJDbjrKzrr3NZw/exec',
                year: '2024',
                key: 'sales2024_10'
            },
            {
                url: 'https://script.google.com/macros/s/AKfycbywkbfSBZl8OwLvI2vYULBh7emGg_7vocw3h2sV41ALFwrKwHGZRCp4_vFiY4MW6ekh/exec',
                year: '2024',
                key: 'sales2024_11'
            },
            {
                url: 'https://script.google.com/macros/s/AKfycbyesnwQChYOIF7SRUWxQiqIGK5qQhwS4hjXEzcmNKeE-wzShhjJ_McxEIcaXm7n8SvK/exec',
                year: '2024',
                key: 'sales2024_12'
            },

            //--------------- 2025 --------------//
            {
                url: 'https://script.google.com/macros/s/AKfycbx7vhu1hUGugwTtNcW1yLxEiFS8ijeRPVUsh6K9yrH0SQQmQzXtPEW9qgb1naI2alry/exec',
                year: '2025',
                key: 'sales2025_1'
            },
            {
                url: 'https://script.google.com/macros/s/AKfycbw7kIOvC9YOojewL_PEsPRosKd1Ue7pQmoCG5Q4U-47W00EFLXJzwXMtVtDvaiBCrHd/exec',
                year: '2025',
                key: 'sales2025_2'
            },
            {
                url: 'https://script.google.com/macros/s/AKfycbyl4IF1HUoZdAV1ZePil8wusy5Uy4ELRMhnkGotv8HRbzJCPuntB2BTrvilyu4May8pbg/exec',
                year: '2025',
                key: 'sales2025_3'
            },
            {
                url: 'https://script.google.com/macros/s/AKfycby9qqMRhlQ5_R6hR-i-16fsTUJYaZncq6tR8V5NaaS-qks83fpVqO4EMS2_KJiltve8pQ/exec',
                year: '2025',
                key: 'sales2025_4'
            },
            {
                url: 'https://script.google.com/macros/s/AKfycbyNe9yO7EHdov9eIF7lCBaar4Cszjem_Tnb1GGGxapT0MGvzsjSY--g0tNmez3gPOaHPg/exec',
                year: '2025',
                key: 'sales2025_5'
            },
            {
                url: 'https://script.google.com/macros/s/AKfycbyg9diEyRZiOnifnR3NsIppXJNMYPfZE0cK1ewahNzgtLG4jpzW2Myycv5-DeUQs3cbeg/exec',
                year: '2025',
                key: 'sales2025_6'
            }
        ];

        for (const item of urls) {
            const monthElement = document.querySelector(`.${item.key}`);

            try {
                const response = await fetch(item.url);
                const data = await response.json();
                fullDataObject[item.year].push(data[item.key]);
                console.log(`✅ Загружено ${item.key}`);

                if (monthElement) {
                    monthElement.style.backgroundColor = '#c8e6c9'; // светло-зелёный
                    monthElement.style.fontWeight = 'bold';
                }
            } catch (error) {
                console.warn(`⚠️ Ошибка при загрузке ${item.key}:`, error.message);
                if (monthElement) {
                    monthElement.style.backgroundColor = '#ffcdd2'; // светло-красный
                    monthElement.style.fontWeight = 'bold';
                }
            }
        }
        resultArrayData = Object.values(fullDataObject).flat().flat();

        this.storage.fullData = [...resultArrayData];
        this.storage.dataOf2023 = [...resultArrayData.filter(year => year.year == 2023)];
        this.storage.dataOf2024 = [...resultArrayData.filter(year => year.year == 2024)];
        this.storage.dataOf2025 = [...resultArrayData.filter(year => year.year == 2025)];

        this.onSuccess();
        console.log('Загрузка завершена!');
    }

    getMounthlySales() {
        this.monthes.forEach(month => {
            this.years.forEach(year => {
                const monthData = this.storage.fullData.filter(item => item.year == year && item.month === month);

                if (monthData.length > 0) {
                    const total = monthData.reduce((sum, item) => sum + (item.saleMoney || 0), 0);
                    this.sumsByYear[year].push(Math.round(total));
                } else {
                    this.sumsByYear[year].push(null);
                }
            });
        });
    }

    getCategories() {
        this.categories = this.storage.fullData.map(item => item.grope);
        this.categories = [...new Set(this.categories)];
        this.categories.sort();
    }

    getCategorySales() {
        this.years.forEach(year => {
            const sales = this.categories.map(category => {
                const categoryData = this.storage.fullData.filter(item => item.year == year && item.grope === category);

                const total = categoryData.reduce((sum, item) => sum + (item.saleMoney || 0), 0);

                return {
                    category,
                    total: categoryData.length > 0 ? Math.round(total) : 0 // или null, если надо
                };
            });

            // сортировка от большего к меньшему
            sales.sort((a, b) => b.total - a.total);

            this.sumsByCategory[year] = sales;
        });
    }

    getTotalByCategory() {
        const summary = {};

        this.years.forEach(year => {
            const yearData = this.sumsByCategory[year] || [];

            yearData.forEach(({category, total}) => {
                if (!summary[category]) {
                    summary[category] = 0;
                }

                summary[category] += total || 0;
            });
        });

        // Преобразуем в отсортированный массив, если нужно
        this.fullCategorySales = Object.entries(summary)
            .map(([category, total]) => ({category, total}))
            .sort((a, b) => b.total - a.total); // от большего к меньшему
    }

    getYearMonthCategoryTotals() {
        this.years.forEach(year => {
            this.monthes.forEach(month => {
                this.categories.forEach(category => {
                    const items = this.storage.fullData.filter(item =>
                        item.year == year &&
                        item.month == month &&
                        item.grope == category
                    );

                    const total = items.reduce((sum, item) => sum + (item.saleMoney || 0), 0);

                    this.sumsByCategoryMounthly[year].push({
                        month,
                        category,
                        total: items.length > 0 ? Math.round(total) : null // или null
                    });
                });
            });
        });
    }

    onSuccess() {
        this.getMounthlySales();
        this.getCategories();
        this.getCategorySales();
        this.getTotalByCategory();
        this.getYearMonthCategoryTotals();

        this.preloader.style.display = 'none';
        this.sectionBody.style.display = 'block';
        new FullSalesChart(this.storage.fullData,
            this.monthes,
            this.sumsByYear,
            this.categories,
            this.sumsByCategory,
            this.fullCategorySales,
            this.sumsByCategoryMounthly)
    }
}