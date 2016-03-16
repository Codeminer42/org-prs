import apicache from 'apicache';

apicache.options({ enabled: (process.env.NODE_ENV === 'production') });

export default apicache.middleware;
