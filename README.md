# MatriculasOn

O MatriculasOn é um sistema de matrículas online.

### Tecnologias utilizadas:

- React
- TypeScript
- Vite
- Prettier
- React Router
- CSS

### Telas

<div style='display: flex'>
  <img src='./public/images/Login.jpg' style='width: 40%' />
  <img src='./public/images/Listagem de Alunos.jpg' style='width: 40%' />
  <img src='./public/images/Listagem de Cursos.jpg' style='width: 40%' />
  <img src='./public/images/Listagem de Permissões.jpg' style='width: 40%' />
  <img src='./public/images/Listagem de Usuários.jpg' style='width: 40%' />
  <img src='./public/images/Cadastro de Alunos.jpg' style='width: 40%' />
  <img src='./public/images/Cadastro de Permissões.jpg' style='width: 40%' />
  <img src='./public/images/Cadastro de Servidores.jpg' style='width: 40%' />
  <img src='./public/images/Cadastro de Usuários.jpg' style='width: 40%' />
  <img src='./public/images/Edição de Alunos.jpg' style='width: 40%' />
  <img src='./public/images/Edição de Curso.jpg' style='width: 40%' />
  <img src='./public/images/Edição de Permissões.jpg' style='width: 40%' />
  <img src='./public/images/Edição de Servidores.jpg' style='width: 40%' />
  <img src='./public/images/Exclusão de Curso.jpg' style='width: 40%' />
  <img src='./public/images/Exclusão de Permissões.jpg' style='width: 40%' />
  <img src='./public/images/Exclusão de Usuários.jpg' style='width: 40%' />
</div>

### Estrutura do projeto

```
app
│
└── src
    │
    ├── modules
    │   │
    │   ├── administradores
    │   │   ├── domain
    │   │   │   └── administradores.ts
    │   │   ├── infrastructure
    │   │   │   └── types
    │   │   ├── pages
    │   │   ├── views
    │   │   │   ├── hooks
    │   │   │   │   └── use-administradores.ts
    │   │   │   └── administradores-provider.tsx
    │   │   └── index.ts
    │   │
    │   └── alunos
    ├── pages
    │   ├── administradores
    │   │   └── index.ts
    │   └── alunos
    │       └── index.ts
    ├── services
    │   └── api
    │       └── api-client.ts
    └── ui
    │   ├── button
    │   │   ├── index.tsx
    │   │   └── styles.css
    │   └── layout
    │       ├── index.tsx
    │       └── styles.css
    ├── App.tsx
    ├── main.tsx
    ├── index.html
    └── index.css
```

### Padrões do projeto

#### 1) Como nomear branchs: <br/>

Os verbos devem ficar no tempo infinitivo

<tipo de alteração (em inglês)>/nome-da-branch

Exemplos de branchs: <br />

<ul>
  <li>feature/adicionar-busca</li>
  <li>bugfix/corrigir-login</li>
  <li>docs/atualizar-documentacao</li>
  <li>refactor/remover-codigo-desnecessario</li>
  <li>improvement/melhorar-api</li>
  <li>style/ajustar-estilos</li>
</ul>

#### 2) Como nomear commits: <br/>

Os verbos devem ficar no tempo presente do indicativo

Exemplos de mensagens de commit: <br />

<ul>
  <li>adiciona nova funcionalidade de busca</li>
  <li>corrige bug na página de login</li>
  <li>atualiza documentação do projeto</li>
  <li>remove código desnecessário</li>
  <li>melhora desempenho da API</li>
  <li>estiliza o componente Button</li>
</ul>

#### 3) Padrão dos estilos

Usar o `-` para separar os nomes das classes

Exemplo: <br />

`.button-text { color: gray }`

Para cada componente, usar o nome `styles.css` (no plural)

#### 4) Formatar o código

Em vez do formatador de código padrão, sempre utilizar o _prettier_ antes de fazer _push_
