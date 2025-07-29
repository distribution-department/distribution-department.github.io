import {DataStorage} from "./modules/data-storage.js";
import {FoterData} from "./modules/foter-data.js";
import {HeaderTimeData} from "./modules/header-time-data.js";
import {RequestModule} from "./modules/request-module.js";

document.addEventListener('DOMContentLoaded', () => {
    new FoterData().init();
    new HeaderTimeData().init();
    let storage = new DataStorage();
    new RequestModule(storage);
})