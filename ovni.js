//Arquivo: ovni.js
//Função construtura para objeto ovni

function Ovni(context, imagem, imgExplosao) {
   this.context = context;
   this.imagem = imagem;
   this.x = 0;
   this.y = 0;
   this.velocidade = 0;
   this.imgExplosao = imgExplosao;
}

/*Devemos cronometrar o movimento do 'Ovni' aplicando no método 
'atualizar', a fórmula a seguir: 

O incremento da posição do sprite, em pixels = 
velocidade * tempoDecorrido / 1000

Sendo:

• 'velocidade' em pixels por segundo;
• 'tempoDecorrido' em segundos (como o tempo dado por 'Date.getTime()' 
é em milissegundos, dividimos esse valor por 1000).

Podemos ajustar novas velocidades com valores maiores em 
'ovni.velocidade' da página HTML.*/

Ovni.prototype = {
   atualizar: function () {
      this.y +=
         this.velocidade * this.animacao.decorrido / 1000;

      if (this.y > this.context.canvas.height) {
         this.animacao.excluirSprite(this);
         this.colisor.excluirSprite(this);
      }
   },//Não esquecer dessa vírgula sempre que for criar um novo método.
   desenhar: function () {
      var ctx = this.context;
      var img = this.imagem;
      ctx.drawImage(img, this.x, this.y, img.width, img.height);
   },//Não esquecer dessa vírgula sempre que for criar um novo método.
   //Tratar as colisões | Definir retângulos de colisão
   retangulosColisao: function () {
      // Estes valores vão sendo ajustados aos poucos
      var rets =
         [
            { x: this.x + 20, y: this.y + 1, largura: 25, altura: 10 },
            { x: this.x + 2, y: this.y + 11, largura: 60, altura: 12 },
            { x: this.x + 20, y: this.y + 23, largura: 25, altura: 7 },
         ];

      // Desenhando os retângulos para visualização | Comentar após realizar modificações
      //var ctx = this.context;

      //for (var i in rets) {
      // ctx.save();
      //ctx.strokeStyle = 'yellow';
      //ctx.strokeRect(rets[i].x, rets[i].y, rets[i].largura, 
      //  rets[i].altura);
      //ctx.restore();
      //}
      return rets;
   },//Não esquecer dessa vírgula sempre que for criar um novo método.
   colidiuCom: function (outro) {
      // Se colidiu com um Tiro, os dois desaparecem
      if (outro instanceof Tiro) {
         this.animacao.excluirSprite(this);
         this.colisor.excluirSprite(this);
         this.animacao.excluirSprite(outro);
         this.colisor.excluirSprite(outro);

         var explosao = new Explosao(this.context, this.imgExplosao, this.x, this.y);
         this.animacao.novoSprite(explosao);
      }
   }
}
