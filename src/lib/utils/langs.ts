export const langs = [
    "javascript",
    "typescript",
    "python",
    "java",
    "cobol",
    "ruby",
    "r",
    "go",
    "php",
    "c#",
    "c++",
    "swift",
    "dart",
    "assembly",
    "elixir",
    "lua",
    "kotlin",
    "rust",
    "scala",
    "haskell",
    "crystal",
]

export type LangProperty = {
    mainColor: string;
    area: string;
    createdAt: string;
}

export const properties: Record<string, LangProperty> = {
    javascript: { mainColor: "amarelo", area: "Desenvolvimento Web", createdAt: "1995" },
    typescript: { mainColor: "azul", area: "Desenvolvimento Web", createdAt: "2012" },
    python: { mainColor: "verde", area: "Ciência de Dados", createdAt: "1991" },
    java: { mainColor: "vermelho", area: "Desenvolvimento Web", createdAt: "1995" },
    cobol: { mainColor: "marrom", area: "Negócios", createdAt: "1959" },
    ruby: { mainColor: "rosa", area: "Desenvolvimento Web", createdAt: "1995" },
    r: { mainColor: "azul claro", area: "Ciência de Dados", createdAt: "1995" },
    go: { mainColor: "ciano", area: "Desenvolvimento Web", createdAt: "2009" },
    php: { mainColor: "azul ardósia", area: "Desenvolvimento Web", createdAt: "1995" },
    'c#': { mainColor: "roxo", area: "Desenvolvimento Web", createdAt: "2000" },
    'c++': { mainColor: "azul", area: "Desenvolvimento de Sistemas", createdAt: "1985" },
    swift: { mainColor: "laranja", area: "Desenvolvimento Mobile", createdAt: "2014" },
    dart: { mainColor: "azul", area: "Desenvolvimento Mobile", createdAt: "2011" },
    assembly: { mainColor: "azul", area: "Desenvolvimento de Sistemas", createdAt: "1949" },
    elixir: { mainColor: "roxo", area: "Desenvolvimento Web", createdAt: "2011" },
    lua: { mainColor: "azul escuro", area: "Desenvolvimento de Jogos", createdAt: "1993" },
    kotlin: { mainColor: "roxo", area: "Desenvolvimento Mobile", createdAt: "2011" },
    rust: { mainColor: "preto", area: "Desenvolvimento de Sistemas", createdAt: "2010" },
    scala: { mainColor: "vermelho", area: "Desenvolvimento Web", createdAt: "2004" },
    haskell: { mainColor: "roxo", area: "Acadêmica", createdAt: "1990" },
    crystal: { mainColor: "preto", area: "Desenvolvimento Web", createdAt: "2014" },
}