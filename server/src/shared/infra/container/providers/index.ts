import { container } from 'tsyringe';

import IStorageProvider from "@shared/infra/container/providers/StorageProvider/models/IStorateProvider";
import DiskStorageProvider from "@shared/infra/container/providers/StorageProvider/implementation/DiskStorageProvider";

import IMailProvider from "@shared/infra/container/providers/MailProvider/models/IMailProvider";
import ErherealMailProvider from "@shared/infra/container/providers/MailProvider/implementation/EtherealMailProvider";

import IMailTemplateProvider from "@shared/infra/container/providers/MailTemplateProvider/models/IMailTemplateProvider";
import HandlebarsMailTemplateProvider from './MailTemplateProvider/implementation/HandlebarsMailTemplateProvider';

container.registerSingleton<IStorageProvider>('StorateProvider', DiskStorageProvider)
container.registerSingleton<IMailTemplateProvider>('MailTemplateProvider', HandlebarsMailTemplateProvider)
container.registerInstance<IMailProvider>('MailProvider', container.resolve(ErherealMailProvider))
