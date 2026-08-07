export default defineAppConfig({
  icon: {
    customize: (content) =>
      content.replace(/stroke-width="2"/g, 'stroke-width="1.5"'),
  },
});
