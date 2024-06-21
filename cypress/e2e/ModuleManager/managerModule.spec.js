describe('Gerenciar módulo para permissão', () => {
    beforeEach(() => {
        cy.setAuthToken();
        cy.visit('/');
    });

    it('Cadastrar um novo módulo de permissão com sucesso', () => {
        cy.visit('/modulos/gerenciar');
        cy.get('input[name="name"]').type('Financeiro');
        cy.get('input[name="applicationId"]').type('SGC').type('{enter}'); // Supondo que o campo autocomplete se completa com {enter}
        cy.get('button').contains('Salvar').click();
        cy.contains('Módulo salvo com sucesso').should('be.visible');
    });
    it('Visualizar a lista de módulos para permissão', () => {
        cy.contains('Financeiro').should('be.visible');
        cy.contains('SGC').should('be.visible');
    });

    it('Pesquisar um módulo de permissão por nome', () => {
        cy.get('input[placeholder="Pesquisar"]').type('Financeiro');
        cy.contains('Financeiro').should('be.visible');
        cy.contains('RH').should('not.exist');
    });

    it('Ordenar a lista de módulos por nome', () => {
        cy.get('th').contains('Nome').click();
        cy.get('tbody tr').first().contains('Financeiro'); 
        cy.get('th').contains('Nome').click();
        cy.get('tbody tr').first().contains('RH'); 
    });

    it('Tentar cadastrar um módulo de permissão sem preencher o campo obrigatório "Nome"', () => {
        cy.visit('/modulos/gerenciar');
        cy.get('input[name="applicationId"]').type('SGC').type('{enter}');
        cy.get('button').contains('Salvar').click();
        cy.contains('Todos os campos são obrigatórios').should('be.visible');
    });

    it('Editar um módulo de permissão existente com sucesso', () => {
        cy.contains('Financeiro').parent().find('button[aria-label="edit"]').click();
        cy.get('input[name="name"]').clear().type('Financeiro Corporativo');
        cy.get('button').contains('Salvar').click();
        cy.contains('Módulo atualizado com sucesso').should('be.visible');
    });

    it('Tentar editar um módulo de permissão para um nome já existente', () => {
        cy.contains('Financeiro').parent().find('button[aria-label="edit"]').click();
        cy.get('input[name="name"]').clear().type('RH');
        cy.get('button').contains('Salvar').click();
        cy.contains('O nome RH já está em uso').should('be.visible');
    });
    
    it('Cancelar a exclusão de um módulo de permissão', () => {
        cy.contains('Financeiro').parent().find('button[aria-label="delete"]').click();
        cy.contains('Tem certeza de que deseja excluir este módulo?').should('be.visible');
        cy.get('button').contains('Cancelar').click();
        cy.contains('Financeiro').should('be.visible');
    });
    it('Excluir um módulo de permissão com sucesso', () => {
        cy.contains('Financeiro').parent().find('button[aria-label="delete"]').click();
        cy.contains('Tem certeza de que deseja excluir este módulo?').should('be.visible');
        cy.get('button').contains('Confirmar').click();
        cy.contains('Módulo excluído com sucesso').should('be.visible');
    });



    it('Visualizar detalhes de um módulo de permissão', () => {
        cy.contains('Financeiro').click();
        cy.url().should('include', '/modulos/editar');
        cy.contains('Nome: Financeiro').should('be.visible');
        cy.contains('Aplicativo relacionado: SGC').should('be.visible');
    });

    it('Verificar a existência de botões de ação para cada módulo', () => {
        cy.contains('Financeiro').parent().find('button[aria-label="edit"]').should('be.visible');
        cy.contains('Financeiro').parent().find('button[aria-label="delete"]').should('be.visible');
    });

    it('Verificar a presença de mensagens de feedback após ações', () => {
        cy.contains('Financeiro').parent().find('button[aria-label="edit"]').click();
        cy.get('input[name="name"]').clear().type('Financeiro Corporativo');
        cy.get('button').contains('Salvar').click();
        cy.contains('Módulo atualizado com sucesso').should('be.visible');
    });

    it('Nenhum módulo encontrado após pesquisa', () => {
        cy.get('input[placeholder="Pesquisar"]').type('XYZ');
        cy.contains('Nenhum módulo encontrado').should('be.visible');
    });

    it('Filtrar módulos por aplicativo relacionado', () => {
        cy.get('select[aria-label="Aplicativo"]').select('SGC');
        cy.contains('Financeiro').should('be.visible');
        cy.contains('RH').should('not.exist');
    });

    it('Verificar a responsividade da lista de módulos', () => {
        cy.viewport('iphone-6');
        cy.contains('Financeiro').should('be.visible');
        cy.viewport('macbook-15');
        cy.contains('Financeiro').should('be.visible');
    });

    it('Exportar lista de módulos para CSV', () => {
        cy.get('button[aria-label="Exportar para CSV"]').click();
        cy.readFile('cypress/downloads/modules.csv').should('exist');
    });

    it('Paginação na lista de módulos', () => {
        cy.get('button[aria-label="Próxima página"]').click();
        cy.url().should('include', 'page=2');
    });
});
