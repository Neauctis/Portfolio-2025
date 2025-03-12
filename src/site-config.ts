export const siteConfig = {
  author: 'Aurélien Chauveau',
  title: 'Portfolio 2025 Aurélien Chauveau',
  subtitle: 'Portfolio d\'Aurélien Chauveau version 2025',
  description: 'Le portfolio d\'Aurélien Chauveau regroupant de nombreux projets.',
  image: {
    src: '/hero.jpg',
    alt: 'Image Principale du Site',
  },
  email: 'aure.chv49@gmail.com',
  socialLinks: [
    {
      text: 'GitHub',
      href: 'https://github.com/Neauctis',
      icon: 'i-simple-icons-github',
      header: 'i-ri-github-line',
    },
    {
      text: 'Twitter',
      href: '',
      icon: 'i-simple-icons-x',
      header: 'i-ri-twitter-x-line',
    },
    {
      text: 'Linkedin',
      href: 'www.linkedin.com/in/aurélien-chauveau-766534316',
      icon: 'i-simple-icons-linkedin',
    },
    {
      text: 'Instagram',
      href: '',
      icon: 'i-simple-icons-instagram',
    },
    {
      text: 'Youtube',
      href: '',
      icon: 'i-simple-icons-youtube',
    },
  ],
  header: {
    logo: {
      src: '/favicon.svg',
      alt: 'Logo Image',
    },
    navLinks: [
      {
        text: 'Accueil',
        href: '/',
      },
      {
        text: 'Blog',
        href: '/blog',
      },
      {
        text: 'Notes',
        href: '/blog/notes',
      },
      {
        text: 'Talks',
        href: '/blog/talks',
      },
      {
        text: 'Projects',
        href: '/projects',
      },
    ],
  },
  page: {
    blogLinks: [
      {
        text: 'Blog',
        href: '/blog',
      },
      {
        text: 'Notes',
        href: '/blog/notes',
      },
      {
        text: 'Talks',
        href: '/blog/talks',
      },
    ],
  },
  footer: {
    navLinks: [
      {
        text: 'Posts Props',
        href: '/posts-props',
      },
      {
        text: 'Markdown Style',
        href: '/md-style',
      },
      {
        text: 'View on Astro',
        href: 'https://astro.build/themes/details/vitesse-theme-for-astro/',
      },
      {
        text: 'GitHub Repository',
        href: 'https://github.com/kevinwong865/astro-theme-vitesse',
      },
    ],
  },
}

export default siteConfig
