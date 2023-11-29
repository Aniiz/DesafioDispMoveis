//Arquivo: fundo.js
//Função construtura para objeto fundo

function Fundo(context, imagem) {
   this.context = context;
   this.imagem = imagem;
   this.velocidade = 0;
   this.posicaoEmenda = 0;
}
/*O 'Fundo' deve mover-se a uma velocidade constante. Isso 
deve ser implementado no método 'atualizar' com base na fórmula
a seguir (fórmula para animação cronometrada): 

O incremento da posição do sprite, em pixels = 
velocidade * tempoDecorrido / 1000

Sendo:

• 'velocidade' em pixels por segundo;
• 'tempoDecorrido' em segundos (como o tempo dado por 'Date.getTime()' 
é em milissegundos, dividimos esse valor por 1000).

Podemos ajustar novas velocidades com valores maiores na função
'configuracoesIniciais' da página HTML.*/

Fundo.prototype = {
   atualizar: function() {
      // Atualizar a posição de emenda
      this.posicaoEmenda += 
         this.velocidade * this.animacao.decorrido / 1000;
      
      // Emenda passou da posição
      if (this.posicaoEmenda > this.imagem.height)
         this.posicaoEmenda = 0;
   },//Não esquecer dessa vírgula sempre que for criar um novo método.
   desenhar: function() {
      var img = this.imagem;  // Para facilitar a escrita
      
      // Primeira cópia
      var posicaoY = this.posicaoEmenda - img.height;
      this.context.drawImage(img, 0, posicaoY, img.width, img.height);
      
      // Segunda cópia
      posicaoY = this.posicaoEmenda;
      this.context.drawImage(img, 0, posicaoY, img.width, img.height);     
   }
}

