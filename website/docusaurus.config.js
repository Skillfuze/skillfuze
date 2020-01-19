module.exports = {
  title: 'SkillFuze Docs',
  tagline: '',
  url: 'https://docs.skillfuze.com',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'skillfuze',
  projectName: 'skillfuze',
  themeConfig: {
    navbar: {
      title: 'SkillFuze Docs',
      logo: {
        alt: 'SkillFuze',
        src: 'img/logo.svg',
      },
      links: [
        { to: 'docs', label: 'Docs', position: 'left' },
        { to: 'blog', label: 'Blog', position: 'left' },
        {
          href: 'https://github.com/SkillFuze/skillfuze',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: 'docs',
            },
          ],
        },
        {
          title: 'Social',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/SkillFuze/skillfuze',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} SkillFuze. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: '../docs',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/SkillFuze/skillfuze/edit/master/docs/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
