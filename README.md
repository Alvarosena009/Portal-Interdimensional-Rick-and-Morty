# Portal Interdimensional — Rick and Morty

Projeto acadêmico de desenvolvimento front-end que consome a [Rick and Morty API](https://rickandmortyapi.com/documentation) e exibe personagens em cards criados dinamicamente com JavaScript.

## Tecnologias
- HTML5
- CSS3 puro (sem frameworks)
- JavaScript (Fetch API)

## Funcionalidades
- Consulta de personagens por meio de `fetch()`.
- Criação dinâmica dos cards com `document.createElement()` e `appendChild()`.
- Nome, imagem, status, gênero e espécie de cada personagem.
- Busca por nome e filtro por status na página carregada.
- Paginação, indicador de carregamento e tratamento de erro.
- Layout responsivo para computador e celular.

## Como executar
1. Extraia a pasta do projeto.
2. Abra `index.html` no navegador. Se preferir, utilize a extensão Live Server do VS Code.
3. É necessário estar conectado à internet para carregar os dados da API e a fonte externa.

## Estrutura
```text
galeria_rick_and_morty/
├── index.html
├── README.md
├── css/
│   └── style.css
└── js/
    └── script.js
```

## Publicar no GitHub Pages
1. Entre em https://github.com e crie um repositório público, por exemplo `portal-interdimensional`.
2. Envie os arquivos e pastas deste projeto para a raiz do repositório (o `index.html` deve ficar na raiz).
3. No repositório, acesse **Settings → Pages**.
4. Em **Build and deployment**, selecione **Deploy from a branch**.
5. Escolha a branch `main` e a pasta `/ (root)`, depois clique em **Save**.
6. Aguarde a publicação. O GitHub exibirá o endereço do site na mesma tela.

## API utilizada
Rick and Morty API — https://rickandmortyapi.com/api/character

Projeto desenvolvido para fins educacionais.
