module.exports = {
  apps: [
    {
      name: 'easy-cors-proxy',
      script: './dist/src/main.js',
      max_memory_restart: '2000M',
      node_args: '--max_old_space_size=2048',
    },
  ],
};
