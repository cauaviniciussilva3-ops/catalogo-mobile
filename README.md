# Catálogo Interativo Mobile com Listagem de Produtos

Projeto desenvolvido em React Native utilizando Expo para a apresentação de produtos de uma loja online. A aplicação realiza o consumo de dados de uma API REST externa e organiza os itens por categorias.

## Funcionalidades Implementadas

- **Tela de Login:** Validação de campos de entrada e armazenamento do estado do usuário através do Redux Toolkit.
- **Listagem por Abas:** Navegação entre categorias masculinas e femininas com consumo da API DummyJSON via Axios.
- **Tela de Detalhes:** Exibição de informações completas do produto selecionado, incluindo imagem, título, preço, percentual de desconto e descrição.
- **Logout:** Encaminhamento do usuário de volta para a tela inicial e limpeza das informações do estado global.

## Tecnologias e Bibliotecas

- React Native com Expo
- Redux Toolkit (Gerenciamento de Estado)
- Axios (Requisições HTTP)
- React Navigation / Expo Router (Navegação)

## Estrutura do Código

```text
src/
├── app/          # Ponto de entrada e configuração da navegação
├── screens/      # Componentes das telas (LoginScreen, HomeScreen, DetailScreen)
├── services/     # Módulo de configuração da API via Axios
└── store/        # Configuração do estado global com Redux Toolkit