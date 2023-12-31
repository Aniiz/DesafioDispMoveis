//Arquivo: apritesheet.js
//Função construtura para objeto apritesheet

/*Spritesheet será responsável por:

• Avançar a animação, escolhendo qual o quadro a ser desenhado no momento;
• Calcular as posições de recorte e realizar o clipping, dados os números
de linhas e colunas;
• Gerenciar o tempo entre um quadro e outro. 

*/
function Spritesheet(context, imagem, linhas, colunas, iniLine, initCol) {
   this.context = context;
   this.imagem = imagem;
   this.numLinhas = linhas;
   this.numColunas = colunas;
   this.intervalo = 0;
   this.linha = iniLine;
   this.coluna = initCol;
   this.fimDoCilo = null;
   this.largura = null
   this.altura = null
}
Spritesheet.prototype = {
   proximoQuadro: function (horizontal) {
      var agora = new Date().getTime();

      // Se ainda não tem último tempo medido 
      if (!this.ultimoTempo) this.ultimoTempo = agora;

      if (horizontal) {

         // Já é hora de mudar de coluna? 
         if (agora - this.ultimoTempo < this.intervalo) return;

         if (this.coluna < this.numColunas - 1) {
            this.coluna++;
         }
         else {
            this.linha = 0;

            // Avisar que acabou um ciclo!
            if (this.fimDoCiclo) this.fimDoCiclo();
         }

         // Guardar hora da última mudança
         this.ultimoTempo = agora;
      } else {

         // Já é hora de mudar de coluna? 
         if (agora - this.ultimoTempo < this.intervalo) return;

         if (this.linha < this.numLinhas - 1) {
            this.linha++;
         }
         else {
            this.linha = 0;

            // Avisar que acabou um ciclo!
            if (this.fimDoCiclo) this.fimDoCiclo();
         }

         // Guardar hora da última mudança
         this.ultimoTempo = agora;
      }

   },//Não esquecer dessa vírgula sempre que for criar um novo método.

   //Animar spritesheet
   desenhar: function (x, y, espelharVerticalmente) {
      var largura = this.imagem.width / this.numColunas;
      var altura = this.imagem.height / this.numLinhas;

      this.largura = largura;
      this.altura = altura;

      // Inverte a escala verticalmente se espelharVerticalmente for true
      if (espelharVerticalmente) {
         this.context.scale(1, -1);
         y = -y - altura; // Ajusta a posição Y para compensar a inversão
      }

      this.context.drawImage(
         this.imagem,
         largura * this.coluna,
         altura * this.linha,
         largura,
         altura,
         x,
         y,
         largura,
         altura
      );

      // Restaura a escala para o estado original
      if (espelharVerticalmente) {
         this.context.scale(1, -1);
      }
   }
}
