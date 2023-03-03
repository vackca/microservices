import { Microservice } from '@lomray/microservice-nodejs-lib';
import Event from '@lomray/microservices-client-api/constants/events/files';
import type { InsertEvent, RemoveEvent, UpdateEvent } from 'typeorm';
import {
  EntityManager,
  EntitySubscriberInterface,
  EventSubscriber,
  getCustomRepository,
} from 'typeorm';
import FileModel from '@entities/file';
import FileEntity from '@entities/file-entity';
import FileEntityRepository from '@repositories/file-entity';

@EventSubscriber()
class File implements EntitySubscriberInterface<FileModel> {
  /**
   * This subscriber only for file entity
   */
  listenTo(): typeof FileModel {
    return FileModel;
  }

  /**
   * 1. Trigger create event
   */
  afterInsert(event: InsertEvent<FileModel>): void {
    void Microservice.eventPublish(Event.FileCreate, { entity: event.entity });
  }

  /**
   * 1. Trigger create event
   */
  afterUpdate(event: UpdateEvent<FileModel>): void {
    void Microservice.eventPublish(Event.FileUpdate, { entity: event.databaseEntity });
  }

  /**
   * Get relation entities for pass full file data to event
   */
  async beforeRemove({ entity, manager }: RemoveEvent<FileModel>): Promise<void> {
    if (!entity) {
      return;
    }

    entity.fileEntities = await File.getRelations(manager, entity.id);
  }

  /**
   * 1. Trigger remove event
   * 2. Refresh order column for file entities
   */
  afterRemove(event: RemoveEvent<FileModel>): void {
    const entity = { ...event.databaseEntity, ...event.entity };

    void Microservice.eventPublish(Event.FileRemove, { entity });
    void Promise.all(entity.fileEntities?.map(({ entityId }) => this.refreshOrderColumn(entityId)));
  }

  /**
   * Get file entities
   * @private
   */
  protected static getRelations(manager: EntityManager, fileId: string): Promise<FileEntity[]> {
    return manager.getRepository(FileEntity).find({ fileId });
  }

  /**
   * Resort file entities
   * @protected
   */
  protected refreshOrderColumn(entityId: string): Promise<void> {
    return getCustomRepository(FileEntityRepository).refreshOrder(entityId);
  }
}

export default File;
