# BEM VINDO AO READ-ME DA JAMILE SOBRE MVC!

_O QUE É?_

O padrão MVC (Model–View–Controller) é uma forma de organizar aplicações separando regras de negócio, interface e controle de ações do usuário.
Ele deixa o código mais organizado, mais fácil de manter e mais simples de expandir.

-----

_O QUE CADA SIGLA FAZ? - MODEL, VIEW E CONTROLLER_

## _MODEL_

O Model é responsável por tudo que envolve dados, por exemplo:

1. Armazenar informações

2. Criar, editar e remover itens

3. Aplicar regras de negócio

4. Validar dados

- ## Algumas funções de JavaScript relacionado a Model

      - adicionarProduto()
      
      - listarReservas()
      
      - removerUsuario()

----

## _VIEW_
A View é tudo o que o usuário vê e interage:

1. Formulários

2. Listas

3. Botões

4. Mensagens na tela

5. Ela não processa regras de negócio.
   
6. Sua única função é exibir informações e coletar dados para o Controller.

- ## Exemplos de funções da View:

        - obterDadosFormulario()
        
        - exibirProdutos(lista)
        
        - exibirMensagem("Produto criado!")

-----

## _CONTROLLER_

  O Controller é o intermediário entre a View e o Model.
  Ele processa as ações do usuário, decide o que fazer e coordena tudo.

1. Quando o usuário faz algo (clicar, enviar formulário, remover item):

2. A View chama o Controller.

3. O Controller pega os dados e valida.

4. O Controller chama o Model para salvar ou atualizar.

5. O Controller pede à View para mostrar o resultado.

- ## Exemplos de funções do Controller:

      - adicionarProduto()
      
      - removerReserva(id)
      
      - carregarLista()
