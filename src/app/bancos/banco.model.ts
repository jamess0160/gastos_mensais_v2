export default class Banco {
    constructor(
        public id?: number,
        public nome?: string,
        public cor?: string,
    ) { }
}

export class Tile extends Banco {
    constructor(
        public totais: {
            alimentacao: string,
            transportes: string,
            geral: string
        },
        public total: number
    ) {
        super()
    }
}