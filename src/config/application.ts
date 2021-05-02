const { PORT, NODE_ENV } = process.env;

export default {
  environment: NODE_ENV || 'develop',
  port: PORT || 3000,
};
