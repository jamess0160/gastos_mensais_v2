export default class Gasto {
    constructor(
        public id?: string,
        public data_registro?: string,
        public data_gasto?: string,
        public descricao?: string,
        public valor?: string,
        public tipo?: string,
        public banco_id?: string
    ) { }
}