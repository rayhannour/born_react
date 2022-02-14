import axios from 'axios';

export default class PrisonStatService {

    getStatPrisonService() {
        return  axios.get('/servlet/ServletTableDataCovid').then((res) => res.data.data);
    }

    
}
