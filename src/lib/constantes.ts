import { NumJogador } from "./tipos-basicos"

export const Cores = {
    Branco: '#fff',
    Verde: '#5dd306',
    Vermelho: '#d30606'
}

export const CorPecas = {
    [NumJogador.SemJogador]: Cores.Branco,
    [NumJogador.Jogador1]: Cores.Verde,
    [NumJogador.Jogador2IA]: Cores.Vermelho
}
