# Tema Lokahi Digital - WordPress

Tema WordPress profissional desenvolvido para a Lokahi Digital, agência especializada em performance digital, mídia paga, automação e análise de dados.

## Características

- **One-Page Layout**: Design moderno em página única com navegação por âncoras
- **Performance**: Código otimizado, sem page builders, sem jQuery
- **Animações Profissionais**: Implementadas com anime.js de forma sutil e elegante
- **Design Responsivo**: Mobile-first e totalmente adaptável
- **SEO-Friendly**: HTML semântico e estrutura otimizada
- **Acessibilidade**: ARIA labels e navegação por teclado

## Estrutura do Tema

```
lokahi-theme-wp/
├── header.php              # Header com menu sticky
├── footer.php              # Footer minimalista
├── front-page.php          # Página principal one-page
├── functions.php           # Configurações e registros
├── style.css               # Estilos principais
├── js/
│   ├── animations.js       # Animações com anime.js
│   └── navigation.js       # Menu mobile e navegação
├── inc/                    # Funções auxiliares
└── template-parts/         # Templates reutilizáveis
```

## Seções da Página Principal

1. **Hero**: Apresentação com headline, subheadline e CTA
2. **Serviços**: Grid com 4 serviços principais
3. **Experiência**: Texto institucional sobre a agência
4. **Conteúdo**: Loop de posts do blog
5. **Contato**: Botões de contato (email e WhatsApp)

## Instalação

1. Faça download do tema
2. No painel do WordPress, vá em **Aparência > Temas > Adicionar Novo**
3. Clique em **Enviar Tema** e selecione o arquivo .zip
4. Ative o tema

## Configuração Inicial

### 1. Criar Menus

Vá em **Aparência > Menus** e crie os seguintes menus:

**Menu Principal** (Primary Menu):
- Início (#inicio)
- Serviços (#servicos)
- Experiência (#experiencia)
- Conteúdo (#conteudo)
- Contato (#contato)

**Menu Footer** (Footer Menu):
- Links opcionais para o rodapé

### 2. Configurar Página Inicial

1. Crie uma nova página (pode deixar em branco)
2. Vá em **Configurações > Leitura**
3. Selecione "Uma página estática"
4. Escolha a página criada como "Página Inicial"

### 3. Personalizar Conteúdo

Os textos estão diretamente no arquivo `front-page.php`. Para personalizar:

- Edite `front-page.php` para alterar títulos, descrições e CTAs
- Atualize as informações de contato (email e WhatsApp)
- Ajuste os textos dos serviços conforme necessário

### 4. Adicionar Posts

Para a seção de Conteúdo funcionar:
1. Crie posts normalmente em **Posts > Adicionar Novo**
2. Os 3 posts mais recentes aparecerão automaticamente

## Personalização de Cores

As cores estão definidas como CSS Variables no `style.css` (linhas 41-50):

```css
:root {
	--color-primary: #0066FF;
	--color-primary-dark: #0052CC;
	--color-text: #1A1A1A;
	--color-text-light: #666666;
	--color-bg: #FFFFFF;
	--color-bg-alt: #F8F9FA;
	--color-border: #E5E7EB;
}
```

## Animações

O tema utiliza **anime.js** para animações sutis e profissionais:

- **Hero**: Fade + translateY sequencial (título, subtítulo, CTA)
- **Serviços**: Cards animam ao entrar na viewport (stagger)
- **Posts**: Fade + scale ao scroll
- **Header**: Transição suave ao scroll com sombra
- **Botões**: Micro-interações no hover

Todas as animações estão em `js/animations.js` e podem ser ajustadas.

## Dependências

- **Anime.js 3.2.1**: Carregado via CDN (configurado em `functions.php`)
- **Google Fonts (Inter)**: Fonte principal do tema

## Requisitos

- WordPress 5.0+
- PHP 7.4+
- Navegadores modernos com suporte a CSS Grid e CSS Variables

## Suporte a Recursos WordPress

- Custom Menus
- Custom Logo
- Post Thumbnails
- HTML5 Markup
- Translation Ready
- Custom Background
- Jetpack Ready

## Performance

- Sem jQuery
- CSS moderno (Grid, Flexbox, Variables)
- JavaScript modular e otimizado
- Lazy loading de animações
- Mobile-first approach

## Desenvolvimento

Para desenvolvimento local:

1. Clone o repositório
2. Coloque na pasta `wp-content/themes/`
3. Ative o tema no WordPress

## Licença

GPL v2 ou posterior

## Créditos

- Baseado em Underscores (_s)
- Animações: Anime.js
- Tipografia: Inter (Google Fonts)

---

**Desenvolvido para Lokahi Digital**
Performance, Dados e Resultados
