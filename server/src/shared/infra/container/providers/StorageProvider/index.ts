import { container } from 'tsyringe';
import uploadConfig from '@config/upload';

import IStorageProvider from '@shared/infra/container/providers/StorageProvider/models/IStorateProvider';

import DiskStorageProvider from '@shared/infra/container/providers/StorageProvider/implementation/DiskStorageProvider';
import S3StorageProvider from '@shared/infra/container/providers/StorageProvider/implementation/S3StorageProvider';

const providers = {
  disk: DiskStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorateProvider',
  providers[uploadConfig.driver],
);
