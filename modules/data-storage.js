export class DataStorage {
    constructor() {
        this._fullData = [];
        this._dataOf2023 = [];
        this._dataOf2024 = [];
        this._dataOf2025 = [];
    }

    // Getters
    get fullData() {
        return this._fullData;
    }

    get dataOf2023() {
        return this._dataOf2023;
    }

    get dataOf2024() {
        return this._dataOf2024;
    }

    get dataOf2025() {
        return this._dataOf2025;
    }

    // Setters
    set fullData(data) {
        this._fullData = data;
    }

    set dataOf2023(data) {
        this._dataOf2023 = data;
    }

    set dataOf2024(data) {
        this._dataOf2024 = data;
    }

    set dataOf2025(data) {
        this._dataOf2025 = data;
    }
}