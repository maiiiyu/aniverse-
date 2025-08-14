
# AniVerse — Template de site de animes (grátis)

Um site estático bonito e responsivo para catálogo e reviews de animes. Ideal para hospedar **de graça** no GitHub Pages, Netlify ou Vercel.

## Como usar (GitHub Pages)
1. Crie uma conta no GitHub (se ainda não tiver).
2. Crie um repositório chamado, por exemplo, `aniverse`.
3. Envie todos os arquivos desta pasta para o repositório (arraste e solte pela web).
4. Nas configurações do repositório, habilite **Pages** (branch `main`, pasta `/root`).
5. Acesse a URL que o GitHub fornecer.

## Personalização rápida
- **Dados**: edite `data/anime.json`. Campos: `id`, `title`, `year`, `genres`, `rating`, `episodes`, `image`, `synopsis`, `where_to_watch`.
- **Imagens**: coloque as capas em `assets/images/` e aponte em `image`.
- **Cores/estilo**: altere variáveis no topo do `styles.css` (`--brand`, `--bg`, etc.).
- **Páginas**: edite `index.html`, `anime.html`, `review.html` conforme quiser.

## Dicas legais
- Use apenas imagens que você tem direito de usar.
- Para SEO, edite `<title>` e `<meta name="description">` em cada página.
- Quer um domínio próprio? Você pode usar `seusite.github.io` grátis ou configurar um domínio customizado depois.

Bom proveito! 🎌
