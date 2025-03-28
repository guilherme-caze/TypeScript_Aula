
var categorias = [];
var produtos = [];
function criarCategoria(nome, descricao) {
    var novaCategoria = {
        id: categorias.length + 1,
        nome: nome,
        descricao: descricao,
        dataCriacao: new Date()
    };
    categorias.push(novaCategoria);
    return novaCategoria;
}
function listarCategorias() {
    return categorias;
}
function buscarCategoria(id) {
    return categorias.find(function (categoria) { return categoria.id === id; });
}
function atualizarCategoria(id, nome, descricao) {
    var categoria = buscarCategoria(id);
    if (categoria) {
        categoria.nome = nome;
        categoria.descricao = descricao;
    }
    return categoria;
}
function removerCategoria(id) {
    var index = categorias.findIndex(function (categoria) { return categoria.id === id; });
    if (index !== -1) {
        categorias.splice(index, 1);
        return true;
    }
    return false;
}
function criarProduto(nome, descricao, preco, quantidade, categoriaId) {
    var novoProduto = {
        id: produtos.length + 1,
        nome: nome,
        descricao: descricao,
        preco: preco,
        quantidade: quantidade,
        categoriaId: categoriaId,
        dataCriacao: new Date(),
        dataAtualizacao: new Date()
    };
    produtos.push(novoProduto);
    return novoProduto;
}
function listarProdutos() {
    return produtos;
}
function buscarProduto(id) {
    return produtos.find(function (produto) { return produto.id === id; });
}
function atualizarProduto(id, nome, descricao, preco, quantidade) {
    var produto = buscarProduto(id);
    if (produto) {
        produto.nome = nome;
        produto.descricao = descricao;
        produto.preco = preco;
        produto.quantidade = quantidade;
        produto.dataAtualizacao = new Date();
    }
    return produto;
}
function removerProduto(id) {
    var index = produtos.findIndex(function (produto) { return produto.id === id; });
    if (index !== -1) {
        produtos.splice(index, 1);
        return true;
    }
    return false;
}
// Função para exibir o menu principal
function exibirMenu() {
    console.log("1. Criar Categoria");
    console.log("2. Listar Categorias");
    console.log("3. Buscar Categoria");
    console.log("4. Atualizar Categoria");
    console.log("5. Remover Categoria");
    console.log("6. Criar Produto");
    console.log("7. Listar Produtos");
    console.log("8. Buscar Produto");
    console.log("9. Atualizar Produto");
    console.log("10. Remover Produto");
    console.log("0. Sair");
}
// Função principal para capturar entradas do usuário e executar as operações
function main() {
    var readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });
    function prompt() {
        exibirMenu();
        readline.question('Escolha uma opção: ', function (opcao) {
            switch (opcao) {
                case '1':
                    readline.question('Nome da Categoria: ', function (nome) {
                        readline.question('Descrição da Categoria: ', function (descricao) {
                            criarCategoria(nome, descricao);
                            console.log('Categoria criada com sucesso!');
                            prompt();
                        });
                    });
                    break;
                case '2':
                    console.table(listarCategorias());
                    prompt();
                    break;
                case '3':
                    readline.question('ID da Categoria: ', function (id) {
                        var categoria = buscarCategoria(parseInt(id));
                        console.log(categoria ? categoria : 'Categoria não encontrada');
                        prompt();
                    });
                    break;
                case '4':
                    readline.question('ID da Categoria: ', function (id) {
                        readline.question('Novo Nome: ', function (nome) {
                            readline.question('Nova Descrição: ', function (descricao) {
                                atualizarCategoria(parseInt(id), nome, descricao);
                                console.log('Categoria atualizada com sucesso!');
                                prompt();
                            });
                        });
                    });
                    break;
                case '5':
                    readline.question('ID da Categoria: ', function (id) {
                        removerCategoria(parseInt(id));
                        console.log('Categoria removida com sucesso!');
                        prompt();
                    });
                    break;
                case '6':
                    readline.question('Nome do Produto: ', function (nome) {
                        readline.question('Descrição do Produto: ', function (descricao) {
                            readline.question('Preço do Produto: ', function (preco) {
                                readline.question('Quantidade do Produto: ', function (quantidade) {
                                    readline.question('ID da Categoria: ', function (categoriaId) {
                                        criarProduto(nome, descricao, parseFloat(preco), parseInt(quantidade), parseInt(categoriaId));
                                        console.log('Produto criado com sucesso!');
                                        prompt();
                                    });
                                });
                            });
                        });
                    });
                    break;
                case '7':
                    console.table(listarProdutos());
                    prompt();
                    break;
                case '8':
                    readline.question('ID do Produto: ', function (id) {
                        var produto = buscarProduto(parseInt(id));
                        console.log(produto ? produto : 'Produto não encontrado');
                        prompt();
                    });
                    break;
                case '9':
                    readline.question('ID do Produto: ', function (id) {
                        readline.question('Novo Nome: ', function (nome) {
                            readline.question('Nova Descrição: ', function (descricao) {
                                readline.question('Novo Preço: ', function (preco) {
                                    readline.question('Nova Quantidade: ', function (quantidade) {
                                        atualizarProduto(parseInt(id), nome, descricao, parseFloat(preco), parseInt(quantidade));
                                        console.log('Produto atualizado com sucesso!');
                                        prompt();
                                    });
                                });
                            });
                        });
                    });
                    break;
                case '10':
                    readline.question('ID do Produto: ', function (id) {
                        removerProduto(parseInt(id));
                        console.log('Produto removido com sucesso!');
                        prompt();
                    });
                    break;
                case '0':
                    readline.close();
                    break;
                default:
                    console.log('Opção inválida!');
                    prompt();
                    break;
            }
        });
    }
    prompt();
}
main();
