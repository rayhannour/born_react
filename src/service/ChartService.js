import axios from 'axios';

export default class ChartService {

    getChartsLine() {
        return  axios.get('/servlet/StatGeneralCoronaVirus');
    }

    getChartsBar() {
        return  axios.get('/servlet/StatGeneralCoronaVirus');
    }
}
