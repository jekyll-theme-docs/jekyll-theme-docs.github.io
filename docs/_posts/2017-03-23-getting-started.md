---
title: Getting Started
description: Getting started with Jekyll Theme Docs
keywords: jekyll theme docs, documentation theme
author:
  name: Natan Felles
---

## Docs Structure

Diferente de outros temas, o Jekyll Theme Docs foi desenvolvido para trabalhar com uma estrutura de arquivos pré-definida onde a estrutura de _posts_ e _categorias_ é organizada por diretórios.

```
| docs/
    | index.md
    | _posts/
        | 2017-03-24-general-post.md
    | google/
        | index.md
        | _posts/
            | 2017-03-24-create-account.md
        | gmail/
            | index.md
            | _posts/
                | 2017-03-24-how-to-send-emails.md
        | drive/
            | index.md
            | _posts/
                | 2017-03-24-uploading-to-cloud.md
    | linux/
        | index.md
        | _posts/
            | 2017-03-24-what-is.md
        | distros/
            | index.md
            | _posts/
                | 2017-03-24-debian.md
                | 2017-03-24-centos.md
```

### Docs _Categoria Pai_{: .small}

O principal diretório deste tema é o _/docs/_ que corresponderá a url _/docs/_ no seu website. Por isso é importante que você configure o arquivo _/docs/index.md_ conforme suas necessidades. Basicamente você só precisa trocar o valor da variável _title_.

Qualquer post que você queira que seja relativo a url _/docs/_ deve ser adicionado dentro de _/docs/_posts/_.

Por exemplo: O arquivo */docs/_posts/2017-03-23-getting-started.md* corresponderá a url */docs/getting-started*.

### Categorias

Todo diretório, exceto *_posts*, dentro de _/docs/_ será considerado uma categoria principal e dentro dele você deve adicionar um arquivo chamado _index.md_.

Supondo que seu site tenha uma categoria principal chamada _Google_ você poderia adicionar o seguinte arquivo: _/docs/google/index.md_ e então essa categoria será acessível pela url _/docs/google/_.

Todos os posts relativos a categoria _Google_ devem ser adicionados dentro de _/docs/google/_posts/_.

Digamos que haja um post explicando como criar uma conta, então você poderia adicioná-lo nessa forma: _/docs/google/_posts/2017-03-23-create-account.md_. A url relativa será _/docs/google/create-account_.

### Sub-Categorias

Seguindo a lógica aplicada em Categorias, digamos que a categoria Google possuo uma sub-categoria chamada Gmail. Então essa deve ser adicionada desta forma: _/docs/google/gmail/index.md_. Sendo que você deverá criar os posts dessa subcategoria em */docs/google/gmail/_posts/*.
