import { TipoOcupacao } from "./tipos-basicos";

export class Jogo {    
    constructor(
        public grafo: number[][],
        public grafoEstado: TipoOcupacao[][],
        public posicoesTotal: number,
    ) {
        // Grafo - lista de adjacência - Contem os vizinhos
        this.grafo = [
            // Primeiro anel
            [1, 3],         // 0
            [0, 2, 9],      // 1
            [1, 4],         // 2
            [0, 5, 11],     // 3
            [2, 7, 12],     // 4
            [3, 6],         // 5
            [5, 7, 14],     // 6
            [4, 6],         // 7
            // Segundo anel
            [9, 11],        // 8
            [1, 8, 10, 17], // 9
            [9, 12],        // 10
            [3, 8, 13, 19], // 11
            [4, 10, 15, 20],// 12
            [11, 14],       // 13
            [6, 13, 15, 22],// 14
            [12, 14],       // 15
            // Terceiro anel
            [17, 19],       // 16
            [9, 16, 18],    // 17
            [17, 20],       // 18
            [11, 16, 21],   // 19
            [12, 18, 23],   // 20
            [19, 22],       // 21
            [14, 21, 23],   // 22
            [20, 22],       // 23
        ];

        // Grafo - matriz de adjacência - Contém o estado do grafo
        this.grafoEstado = new Array(posicoesTotal)
            .fill(-1)
            .map(_ => new Array(posicoesTotal).fill(-1));
        for (let i = 0; i < this.grafo.length; i++) {
            for (const j of this.grafo[i]) {
                this.grafoEstado[i][j] = TipoOcupacao.Vazio;
            }
        }

        
    }
}