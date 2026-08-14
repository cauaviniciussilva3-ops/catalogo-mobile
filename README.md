# Catálogo Interativo Mobile com Listagem de Produtos

Projeto desenvolvido em React Native utilizando o framework Expo para apresentação de produtos de uma loja online. A aplicação consome dados de uma API REST externa em tempo real e organiza os itens por categorias.

---

## Pré-requisitos

Antes de iniciar, certifique-se de ter instalado em sua máquina:
- **Node.js** (versão LTS recomendada).
- **Git** instalado no computador.
- Aplicativo **Expo Go** instalado no celular (Android ou iOS) OU um emulador configurado.

---

## Passo a Passo para Executar o Projeto

### 1. Clonar o repositório
Abra o terminal e execute o comando abaixo para baixar o projeto:
```bash
git clone [https://github.com/cauaviniciussilva3-ops/catalogo-mobile.git](https://github.com/cauaviniciussilva3-ops/catalogo-mobile.git)

2. Entrar na pasta do projeto

cd catalogo-mobile
---
3. Instalar as dependências
Execute o comando abaixo para instalar as bibliotecas necessárias:

npm install

---
4. Iniciar a aplicação

npx expo start
---

5. Visualizar o aplicativo

No celular: Abra o aplicativo Expo Go, selecione a opção de escanear QR Code e aponte a câmera para o código exibido no terminal.

No navegador (Web): Pressione a tecla w no terminal com a aplicação rodando.
---

⚠️ Solução de Problemas Comuns (Troubleshooting)
Erro de permissão no PowerShell do Windows (PSSecurityException)
Se ao tentar rodar comandos no terminal do Windows (como npx expo start ou scripts do Node) o sistema exibir uma mensagem de erro informando que a execução de scripts foi desabilitada, siga os passos abaixo:

Abra o terminal do VS Code ou o PowerShell.

Execute o comando para liberar a execução de scripts na sessão atual:

(Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass)
---

Digite A (Sim para Todos) se for solicitado e pressione Enter.

Tente executar o comando npx expo start novamente.
---

 Estrutura do Projeto

src/
├── app/          # Ponto de entrada e rotas da aplicação
├── screens/      # Telas (Login, Catálogo com Abas e Detalhes)
├── services/     # Configuração das requisições com Axios
└── store/        # Gerenciamento de estado global com Redux Toolkit

---
 Funcionalidades Implementadas
Autenticação (Login): Validação dos campos de entrada e gerenciamento do estado de usuário via Redux Toolkit.

Listagem e Categorização: Navegação por abas para alternar entre produtos masculinos e femininos consumindo a API DummyJSON via Axios.

Tela de Detalhes: Exibição detalhada de preço, desconto, imagem e descrição completa de cada item.

Logout: Limpeza do estado de acesso e retorno à tela de login.


---

Depois de colar tudo dentro do seu `README.md` no VS Code e salvar com **Ctrl + S**, é só mandar estes 3 comandos no terminal para subir pro GitHub:

```powershell
git add README.md
git commit -m "docs: atualizando readme"
git push