import { container } from 'tsyringe';

import ICacheProvider from '@shared/infra/container/providers/CacheProvider/models/ICacheProvider';

import RedisCacheProvider from '@shared/infra/container/providers/CacheProvider/implementation/RedisCacheProvider';

const providers = {
  redis: RedisCacheProvider,
};

container.registerSingleton<ICacheProvider>('CacheProvider', providers.redis);
