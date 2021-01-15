import config from 'config';

const isProduction: boolean = (process.env.NODE_ENV || config.get('NODE_ENV')) === 'production';

export default isProduction;
