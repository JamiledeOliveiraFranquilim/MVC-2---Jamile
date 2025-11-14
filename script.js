
       
        class ProdutoModel {
            constructor() {
                // Lista de produtos iniciais aleatórios
                this.produtos = [
                    { 
                        id: 1, 
                        nome: "Smartphone Samsung Galaxy", 
                        categoria: "Eletrônicos", 
                        preco: 1299.99, 
                        quantidade: 15,
                        descricao: "Smartphone Android com 128GB de armazenamento",
                        dataCriacao: "15/03/2024"
                    },
                    { 
                        id: 2, 
                        nome: "Camiseta Básica Preta", 
                        categoria: "Roupas", 
                        preco: 29.90, 
                        quantidade: 50,
                        descricao: "Camiseta 100% algodão",
                        dataCriacao: "10/03/2024"
                    },
                    { 
                        id: 3, 
                        nome: "Livro - O Poder do Hábito", 
                        categoria: "Livros", 
                        preco: 45.50, 
                        quantidade: 25,
                        descricao: "Best-seller sobre desenvolvimento pessoal",
                        dataCriacao: "20/03/2024"
                    }
                ];
            }

//Essa função pertence ao ProdutoController e faz a ponte entre
//o formulário (View) e o Model.
            adicionarProduto(produto) {
                const novoProduto = {
                    ...produto,
                    id: Date.now(),
                    dataCriacao: new Date().toLocaleDateString('pt-BR')
                };
                this.produtos.push(novoProduto);
                return novoProduto;
            }

            listarProdutos() {
                return this.produtos;
            }

            removerProduto(id) {
                this.produtos = this.produtos.filter(produto => produto.id !== id);
            }
        }

        class ProdutoView {
            constructor() {
                this.form = document.getElementById("produtoForm");
                this.listaProdutos = document.getElementById("listaProdutos");
            }
            obterDadosFormulario() {
                return {
                    nome: document.getElementById("nome").value,
                    categoria: document.getElementById("categoria").value,
                    preco: parseFloat(document.getElementById("preco").value),
                    quantidade: parseInt(document.getElementById("quantidade").value),
                    descricao: document.getElementById("descricao").value
                };
            }

            limparFormulario() {
                this.form.reset();
            }
//Essa função pertence à ProdutoView e é 
// responsável por mostrar a lista de produtos na tela. 
            exibirProdutos(produtos) {
                if (produtos.length === 0) {
                    this.listaProdutos.innerHTML = '<div class="sem-produtos">Nenhum produto cadastrado. Adicione o primeiro produto usando o formulário ao lado!</div>';
                    return;
                }

                this.listaProdutos.innerHTML = produtos.map(produto => `
                    <div class="produto-card">
                        <div class="produto-info">
                            <h3>${produto.nome}</h3>
                            <p><strong>Categoria:</strong> ${produto.categoria}</p>
                            <p><strong>Preço:</strong> R$ ${produto.preco.toFixed(2)}</p>
                            <p><strong>Estoque:</strong> ${produto.quantidade} unidades</p>
                            <p><strong>Descrição:</strong> ${produto.descricao || 'Nenhuma descrição fornecida'}</p>
                            <p class="data-criacao"><strong>Cadastrado em:</strong> ${produto.dataCriacao}</p>
                        </div>
                        <button class="btn-remover" onclick="controller.removerProduto(${produto.id})">Remover</button>
                    </div>
                `).join('');
            }

            exibirMensagem(mensagem, tipo = 'sucesso') {
                const mensagemAnterior = document.querySelector('.mensagem');
                if (mensagemAnterior) {
                    mensagemAnterior.remove();
                }

                const divMensagem = document.createElement('div');
                divMensagem.className = `mensagem mensagem-${tipo}`;
                divMensagem.textContent = mensagem;

                const header = document.querySelector('header');
                header.after(divMensagem);

                setTimeout(() => {
                    divMensagem.remove();
                }, 3000);
            }
        }

        class ProdutoController {
            constructor(model, view) {
                this.model = model;
                this.view = view;

                this.view.form.addEventListener("submit", (event) => {
                    event.preventDefault();
                    this.adicionarProduto();
                });

                this.exibirProdutos();
            }
//Essa função pertence ao ProdutoController 
// e faz a ponte entre o formulário (View) e o Model.
            adicionarProduto() {
                try {
                    const dados = this.view.obterDadosFormulario();

                    if (!dados.nome || !dados.categoria || !dados.preco) {
                        this.view.exibirMensagem('Por favor, preencha todos os campos obrigatórios.', 'erro');
                        return;
                    }

                    this.model.adicionarProduto(dados);

                    this.exibirProdutos();
                    this.view.limparFormulario();
                    this.view.exibirMensagem('Produto cadastrado com sucesso!');
                    
                } catch (error) {
                    this.view.exibirMensagem('Erro ao cadastrar produto.', 'erro');
                }
            }

            removerProduto(id) {
                if (confirm('Tem certeza que deseja remover este produto?')) {
                    this.model.removerProduto(id);
                    this.exibirProdutos();
                    this.view.exibirMensagem('Produto removido com sucesso!');
                }
            }

            exibirProdutos() {
                const produtos = this.model.listarProdutos();
                this.view.exibirProdutos(produtos);
            }
        }

        
        const model = new ProdutoModel();
        const view = new ProdutoView();
        const controller = new ProdutoController(model, view);