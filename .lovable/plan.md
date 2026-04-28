Vou transformar a página inicial atual em um portal institucional fictício de campus educacional chamado “Campus Demo Fortaleza”, em página única, com estrutura completa para testes da solução NeoTalk de acessibilidade.

## O que será construído

1. Substituir a tela placeholder por uma home institucional completa
- Remover o placeholder atual da rota `/`.
- Criar uma página única, responsiva e organizada em seções.
- Manter todo o conteúdo fictício, sem uso de marca, logotipo, fotos ou textos oficiais de instituições reais.

2. Criar topo e navegação institucional
- Barra superior fina com “Portal Institucional Demo”, links de acessibilidade e busca.
- Header fixo com nome “Campus Demo Fortaleza”, subtítulo institucional fictício e menu principal.
- Menu desktop horizontal.
- Menu mobile com botão hambúrguer funcional.

3. Criar seções principais do portal
- Hero institucional com título, subtítulo, texto complementar, botões e imagem/placeholder genérico.
- Cards de acesso rápido com ícones, descrições e ação “Acessar”.
- Seção “Conheça nossos cursos” com abas/filtros visuais e cards de cursos fictícios.
- Seção “Notícias” com 4 notícias fictícias e botão “Ver todas as notícias”.
- Seção “Processos seletivos” com cards, status, períodos fictícios e botões de edital.
- Seção “Área do Estudante” com serviços acadêmicos.
- Seção “Pesquisa, Extensão e Inovação” com três blocos explicativos.
- Seção especial “Laboratório de Acessibilidade Digital” com painel visual do assistente e botões de simulação.
- Seção “Contatos do Campus” com dados e setores fictícios.
- Rodapé institucional grande com colunas e aviso de portal demonstrativo sem vínculo oficial.

4. Implementar acessibilidade interativa de demonstração
- Botão flutuante “Acessibilidade” no canto inferior direito.
- Painel lateral direito abrindo e fechando ao clique.
- Opções: Libras, Voz, Texto simplificado, Alto contraste, Aumentar fonte, Mapa do campus e Atendimento.
- Ações visuais funcionais no painel, sem backend obrigatório.

5. Aplicar identidade visual institucional fictícia
- Fundo branco/cinza claro.
- Verde escuro como cor principal, com detalhes discretos em azul e amarelo.
- Cards arredondados, hover states, boa hierarquia de títulos e espaçamento confortável.
- Tipografia limpa, legível e adequada para acessibilidade.
- Aparência séria, pública e educacional, mas claramente fictícia.

## Organização técnica

- Usar React + Tailwind CSS no arquivo da rota inicial `src/routes/index.tsx`.
- Componentizar a página internamente em blocos reutilizáveis para facilitar manutenção.
- Usar dados mockados em arrays para cursos, notícias, serviços, processos seletivos e contatos.
- Usar ícones leves com `lucide-react`, já compatível com React.
- Usar imagem genérica via URL segura/placeholder visual, sem referência oficial a instituições reais.
- Atualizar metadados básicos da página para “Campus Demo Fortaleza”.
- Não adicionar backend, autenticação ou banco de dados.

## Resultado esperado

Uma página única com aparência de portal público educacional brasileiro, fictícia e institucional, pronta para laboratório interno de testes NeoTalk com avatar em Libras, leitura por voz, texto simplificado e navegação assistida.