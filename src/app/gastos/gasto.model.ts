export default class Gasto {
    constructor(
        public id: number,
        public data_registro: string,
        public data_gasto?: string,
        public descricao?: string,
        public valor?: number,
        public tipo?: number,
        public banco_id?: number
    ) { }
}