export default class Utils {
    static callInterval(funcao: (...params: any[]) => Promise<void>, tempo: number, mensagemErro: string, This: any, ...params: any[]) {

        let intervalo = setInterval(() => {
            funcao.call(This, ...params).catch(tratarErro)
        }, tempo)

        funcao.call(This, ...params).catch(tratarErro)

        return intervalo

        function tratarErro(error: Error) {
            alert(mensagemErro)
            clearInterval(intervalo)
            console.error(error)
        }
    }

    static sleep(tempo: number) {
        return new Promise(resolve => {
            setTimeout(resolve, tempo)
        })
    }
}