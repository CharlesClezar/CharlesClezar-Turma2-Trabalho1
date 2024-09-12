const Biblioteca = require("../src/biblioteca");

describe('Biblioteca', () => {
    let biblioteca;

    beforeEach(() => {
        biblioteca = new Biblioteca();
    });

    test('deve adicionar um livro', () => {
        const livro = { id: 1, titulo: 'Capitães de areia', autor: 'Autor', ano: 2000, genero: 'Fantasia' };
        biblioteca.adicionarLivro(livro);
        expect(biblioteca.listarLivros()).toContain(livro);
    });

    test('deve remover um livro', () => {
        const livro = { id: 1, titulo: 'Capitães de areia', autor: 'Autor', ano: 2000, genero: 'Fantasia' };
        biblioteca.adicionarLivro(livro);
        biblioteca.removerLivro(1);
        expect(biblioteca.buscarLivroPorId(1)).toBeUndefined();
    });

    test('deve buscar um livro por ID', () => {
        const livro = { id: 1, titulo: 'Capitães de areia', autor: 'Autor', ano: 2000, genero: 'Fantasia' };
        biblioteca.adicionarLivro(livro);
        expect(biblioteca.buscarLivroPorId(1)).toEqual(livro);
    });

    test('deve buscar livros por título', () => {
        const livro1 = { id: 1, titulo: 'Capitães de areia', autor: 'Autor', ano: 2000, genero: 'Fantasia' };
        const livro2 = { id: 2, titulo: 'O Senhor dos Anéis', autor: 'Autor2', ano: 2001, genero: 'Fantasia' };
        biblioteca.adicionarLivro(livro1);
        biblioteca.adicionarLivro(livro2);
        expect(biblioteca.buscarLivroPorTitulo('O Senhor')).toContain(livro2);
    });

    test('deve listar livros emprestados e disponíveis', () => {
        const livro1 = { id: 1, titulo: 'Capitães de areia', autor: 'Autor', ano: 2000, genero: 'Fantasia', emprestado: true };
        const livro2 = { id: 2, titulo: 'O Senhor dos Anéis', autor: 'Autor2', ano: 2001, genero: 'Fantasia', emprestado: false };
        biblioteca.adicionarLivro(livro1);
        biblioteca.adicionarLivro(livro2);
        expect(biblioteca.listarLivrosEmprestados()).toContain(livro1);
        expect(biblioteca.listarLivrosDisponiveis()).toContain(livro2);
    });

    test('deve emprestar e devolver um livro', () => {
        const livro = { id: 1, titulo: 'Capitães de areia', autor: 'Autor', ano: 2000, genero: 'Fantasia' };
        biblioteca.adicionarLivro(livro);
        expect(biblioteca.emprestarLivro(1, 123)).toBe(true);
        expect(biblioteca.buscarLivroPorId(1).emprestado).toBe(true);
        expect(biblioteca.devolverLivro(1)).toBe(true);
        expect(biblioteca.buscarLivroPorId(1).emprestado).toBe(false);
    });

    test('deve atualizar informações de um livro', () => {
        const livro = { id: 1, titulo: 'Capitães de areia', autor: 'Autor', ano: 2000, genero: 'Fantasia' };
        biblioteca.adicionarLivro(livro);
        biblioteca.atualizarInformacaoLivro(1, { titulo: 'TesteAtualiza TITULO', autor: 'TesteAtualiza AUTOR' });
        const livroAtualizado = biblioteca.buscarLivroPorId(1);
        expect(livroAtualizado.titulo).toBe('TesteAtualiza TITULO');
    });

    test('deve adicionar e remover um membro', () => {
        const membro = { id: 1, nome: 'Charles' };
        biblioteca.adicionarMembro(membro);
        expect(biblioteca.listarMembros()).toContain(membro);
        biblioteca.removerMembro(1);
        expect(biblioteca.buscarMembroPorId(1)).toBeUndefined();
    });

    test('deve contar livros e membros', () => {
        expect(biblioteca.contarLivros()).toBe(0);
        expect(biblioteca.contarMembros()).toBe(0);
        const livro = { id: 1, titulo: 'Capitães de areia', autor: 'Autor', ano: 2000, genero: 'Fantasia' };
        biblioteca.adicionarLivro(livro);
        const membro = { id: 1, nome: 'Charles'};
        biblioteca.adicionarMembro(membro);
        expect(biblioteca.contarLivros()).toBe(1);
        expect(biblioteca.contarMembros()).toBe(1);
    });

    test('deve listar livros por autor e gênero', () => {
        const livro1 = { id: 1, titulo: 'Capitães de areia', autor: 'Autor', ano: 2000, genero: 'fantasia' };
        const livro2 = { id: 2, titulo: 'O Senhor dos Anéis', autor: 'Autor2', ano: 2001, genero: 'fantasia' };
        biblioteca.adicionarLivro(livro1);
        biblioteca.adicionarLivro(livro2);
        expect(biblioteca.listarLivrosPorAutor('Autor')).toContain(livro1);
        expect(biblioteca.listarLivrosPorGenero('fantasia')).toContain(livro1);
        expect(biblioteca.listarLivrosPorGenero('fantasia')).toContain(livro2);
    });

    test('deve listar livros por ano', () => {
        const livro1 = { id: 1, titulo: 'Capitães de areia', autor: 'Autor', ano: 200, genero: 'fantasia' };
        const livro2 = { id: 2, titulo: 'O Senhor dos Anéis', autor: 'Autor2', ano: 200, genero: 'fantasia' };
        biblioteca.adicionarLivro(livro1);
        biblioteca.adicionarLivro(livro2);
        expect(biblioteca.listarLivrosPorAno(1925)).toContain(livro1);
        expect(biblioteca.listarLivrosPorAno(1960)).toContain(livro2);
    });
});