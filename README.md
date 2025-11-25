# ZATAN - Zoneamento do Litoral Sul de PE

Sistema de sinalização interativa inteligente voltado à disseminação de informações sobre o Zoneamento Ambiental e Territorial das Atividades Náuticas (ZATAN) no litoral sul de Pernambuco.

## 📋 Sobre o Projeto

O ZATAN é uma plataforma digital responsiva que integra tecnologias acessíveis, como códigos QR incorporados em placas físicas, instaladas em pontos estratégicos da orla do litoral sul de Pernambuco. Ao escanear os QR codes, os usuários são direcionados para esta plataforma, onde encontram:

- Vídeos explicativos sobre o zoneamento e suas regras
- Áudios guias com orientações acessíveis em diferentes idiomas
- Mapas interativos com georreferenciamento das zonas de uso
- Informações atualizadas, alertas e sugestões de rotas
- Funcionalidades educativas e participativas (quizzes, boas práticas)
- Canais para feedback da população

## 🚀 Tecnologias Utilizadas

- **HTML5** - Estrutura semântica e acessível
- **CSS3** - Estilização moderna com variáveis CSS e design responsivo
- **JavaScript (Vanilla)** - Funcionalidades interativas sem dependências externas

## 📁 Estrutura do Projeto

```
projetonovo/
├── index.html                 # Página inicial
├── o-que-e-zatan.html         # Página sobre o ZATAN
├── mapa-interativo.html        # Mapa interativo das zonas
├── areas-regras.html           # Áreas e regras detalhadas
├── qr-code.html                # Informações sobre QR Code
├── quiz.html                   # Quiz educativo
├── contato.html                # Formulário de contato/feedback
├── README.md                   # Este arquivo
└── assets/
    ├── css/
    │   ├── themes.css          # Variáveis de tema e cores
    │   ├── base.css            # Reset e estilos base
    │   ├── layout.css          # Layout geral (header, footer, etc.)
    │   └── components.css       # Componentes reutilizáveis
    ├── js/
    │   ├── i18n.js             # Sistema de internacionalização
    │   ├── menu.js             # Controle do menu mobile
    │   ├── quiz.js             # Sistema de quiz
    │   ├── main.js             # Funcionalidades gerais
    │   └── theme-toggle.js     # Alternância de tema (futuro)
    └── img/                    # Imagens (placeholders, se necessário)
```

## 🎨 Identidade Visual

O projeto utiliza uma paleta de cores inspirada em mar e litoral:

- **Turquesa** (#00A8A8) - Cor principal
- **Azul médio** (#1E88E5) - Cor secundária
- **Azul escuro** (#0A4A5C) - Header/Footer
- **Verde água claro** (#F5F9FA) - Fundos alternados

### Cores de Zona:
- **Vermelho** (#E53935) - Zona Restrita
- **Amarelo** (#FFB300) - Zona Regulada
- **Verde** (#43A047) - Zona Liberal

## 🌐 Funcionalidades

### 1. Navegação Responsiva
- Menu mobile com hambúrguer
- Navegação adaptável para diferentes tamanhos de tela
- Breadcrumb em todas as páginas internas

### 2. Sistema Multilíngue
- Suporte para Português, Inglês e Espanhol
- Seletor de idioma no header
- Traduções dinâmicas via JavaScript

### 3. Quiz Educativo
- 10 perguntas sobre zonas e regras
- Feedback imediato após cada resposta
- Pontuação final com mensagem personalizada
- Barra de progresso visual

### 4. Formulário de Contato
- Validação em tempo real
- Tipos de mensagem: Elogio, Dúvida, Sugestão, Denúncia
- Mensagens de sucesso/erro

### 5. Preparação para Mídia
- Estrutura HTML pronta para vídeos explicativos
- Espaços para áudios guias
- Placeholders visuais indicando onde o conteúdo será inserido

### 6. Acessibilidade
- Navegação por teclado
- Skip links
- ARIA labels
- Contraste adequado
- Estrutura semântica (header, main, nav, section, footer)

## 📱 Responsividade

O site foi desenvolvido com foco em **mobile first**, garantindo:

- Layout adaptável para telas pequenas (360px+)
- Botões grandes e fáceis de clicar em mobile
- Menu hambúrguer para navegação mobile
- Cards e grids responsivos
- Tabelas com scroll horizontal quando necessário

## 🔧 Como Usar

1. Abra o arquivo `index.html` em um navegador moderno
2. Navegue pelas páginas usando o menu
3. Teste o quiz na página `quiz.html`
4. Preencha o formulário de contato em `contato.html`

### Desenvolvimento Local

Para desenvolvimento, você pode usar um servidor local simples:

```bash
# Python 3
python -m http.server 8000

# Node.js (com http-server)
npx http-server

# PHP
php -S localhost:8000
```

Depois acesse `http://localhost:8000` no navegador.

## 📝 Próximos Passos (Futuro)

- [ ] Integração com biblioteca de mapas (Leaflet, Google Maps, Mapbox)
- [ ] Backend para processamento de formulários
- [ ] Upload e gerenciamento de vídeos e áudios
- [ ] Sistema de notificações push
- [ ] Modo escuro
- [ ] PWA (Progressive Web App)
- [ ] Integração com API de geolocalização

## 🎯 Páginas Principais

### Início (index.html)
- Hero com call-to-action
- Seção "Como funciona" com passos
- Cards informativos
- Espaços para vídeo e áudio guia

### O que é ZATAN? (o-que-e-zatan.html)
- Explicação do conceito
- Objetivos e importância
- Cards detalhados das três zonas

### Mapa Interativo (mapa-interativo.html)
- Container preparado para mapa
- Legenda interativa
- Tabela de áreas específicas

### Áreas e Regras (areas-regras.html)
- Cards detalhados por zona
- Tabela de regras por atividade
- Boas práticas
- Alertas e informações importantes

### QR Code (qr-code.html)
- Instruções de uso
- Onde encontrar as placas
- Exemplos de QR codes
- Dicas para melhor experiência

### Quiz (quiz.html)
- 10 perguntas interativas
- Sistema de pontuação
- Feedback educativo

### Contato (contato.html)
- Formulário completo
- Outros canais de atendimento
- Links para redes sociais

## 📄 Licença

Este projeto foi desenvolvido para o Zoneamento Ambiental e Territorial das Atividades Náuticas (ZATAN) no litoral sul de Pernambuco.

## 📞 Contato

- **Email:** contato@zatan.pe.gov.br
- **Telefone:** (81) 3181-0000
- **Endereço:** Av. Governador Agamenon Magalhães, s/n, Recife - PE

---

Desenvolvido com foco em acessibilidade, responsividade e experiência do usuário.

