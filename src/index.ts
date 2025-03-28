
import connection from './db';

async function buscarUsuarios() {
    const [rows] = await connection.execute('SELECT * FROM usuarios'); // substitua pela sua tabela
    console.log(rows);
}

buscarUsuarios();

interface Categoria {
    id: number;
    nome: string;
    descricao: string;
    dataCriacao: Date;
}

interface Produto {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    quantidade: number;
    categoriaId: number;
    dataCriacao: Date;
    dataAtualizacao: Date;
}

let categorias: Categoria[] = [];
let produtos: Produto[] = [];

function criarCategoria(nome: string, descricao: string): Categoria {
    const novaCategoria: Categoria = {
        id: categorias.length + 1,
        nome,
        descricao,
        dataCriacao: new Date()
    };
    categorias.push(novaCategoria);
    return novaCategoria;
}

function listarCategorias(): Categoria[] {
    return categorias;
}

function buscarCategoria(id: number): Categoria | undefined {
    return categorias.find(categoria => categoria.id === id);
}

function atualizarCategoria(id: number, nome: string, descricao: string): Categoria | undefined {
    const categoria = buscarCategoria(id);
    if (categoria) {
        categoria.nome = nome;
        categoria.descricao = descricao;
    }
    return categoria;
}

function removerCategoria(id: number): boolean {
    const index = categorias.findIndex(categoria => categoria.id === id);
    if (index !== -1) {
        categorias.splice(index, 1);
        return true;
    }
    return false;
}

function criarProduto(nome: string, descricao: string, preco: number, quantidade: number, categoriaId: number): Produto {
    const novoProduto: Produto = {
        id: produtos.length + 1,
        nome,
        descricao,
        preco,
        quantidade,
        categoriaId,
        dataCriacao: new Date(),
        dataAtualizacao: new Date()
    };
    produtos.push(novoProduto);
    return novoProduto;
}

function listarProdutos(): Produto[] {
    return produtos;
}

function buscarProduto(id: number): Produto | undefined {
    return produtos.find(produto => produto.id === id);
}

function atualizarProduto(id: number, nome: string, descricao: string, preco: number, quantidade: number): Produto | undefined {
    const produto = buscarProduto(id);
    if (produto) {
        produto.nome = nome;
        produto.descricao = descricao;
        produto.preco = preco;
        produto.quantidade = quantidade;
        produto.dataAtualizacao = new Date();
    }
    return produto;
}

function removerProduto(id: number): boolean {
    const index = produtos.findIndex(produto => produto.id === id);
    if (index !== -1) {
        produtos.splice(index, 1);
        return true;
    }
    return false;
}

// Menu principal
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

//  Capturando entradas do usuário para executar as operações
function main() {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    function prompt() {
        exibirMenu();
        readline.question('Escolha uma opção: ', (opcao: string) => {
            switch (opcao) {
                case '1':
                    readline.question('Nome da Categoria: ', (nome: string) => {
                        readline.question('Descrição da Categoria: ', (descricao: string) => {
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
                    readline.question('ID da Categoria: ', (id: string) => {
                        const categoria = buscarCategoria(parseInt(id));
                        console.log(categoria ? categoria : 'Categoria não encontrada');
                        prompt();
                    });
                    break;
                case '4':
                    readline.question('ID da Categoria: ', (id: string) => {
                        readline.question('Novo Nome: ', (nome: string) => {
                            readline.question('Nova Descrição: ', (descricao: string) => {
                                atualizarCategoria(parseInt(id), nome, descricao);
                                console.log('Categoria atualizada com sucesso!');
                                prompt();
                            });
                        });
                    });
                    break;
                case '5':
                    readline.question('ID da Categoria: ', (id: string) => {
                        removerCategoria(parseInt(id));
                        console.log('Categoria removida com sucesso!');
                        prompt();
                    });
                    break;
                case '6':
                    readline.question('Nome do Produto: ', (nome: string) => {
                        readline.question('Descrição do Produto: ', (descricao: string) => {
                            readline.question('Preço do Produto: ', (preco: string) => {
                                readline.question('Quantidade do Produto: ', (quantidade: string) => {
                                    readline.question('ID da Categoria: ', (categoriaId: string) => {
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
                    readline.question('ID do Produto: ', (id: string) => {
                        const produto = buscarProduto(parseInt(id));
                        console.log(produto ? produto : 'Produto não encontrado');
                        prompt();
                    });
                    break;
                    case '9':
                        readline.question('ID do Produto: ', (id: string) => {
                            readline.question('Novo Nome: ', (nome: string) => {
                                readline.question('Nova Descrição: ', (descricao: string) => {
                                    readline.question('Novo Preço: ', (preco: string) => {
                                        readline.question('Nova Quantidade: ', (quantidade: string) => {
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
                        readline.question('ID do Produto: ', (id: string) => {
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