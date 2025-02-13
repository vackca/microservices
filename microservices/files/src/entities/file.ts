import { IsTypeormDate, IsUndefinable, IsNullable } from '@lomray/microservice-helpers';
import { Allow, IsEnum, IsObject, Length } from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  Index,
} from 'typeorm';
import FileType from '@constants/file-type';
import FileEntity from '@entities/file-entity';
import type Folder from '@entities/folder';

export interface IImageFormat {
  [key: string]: {
    url: string;
    width: number;
    height: number;
    size: number;
    hasWebp?: boolean;
  };
}

interface IFileMeta {
  mime: string;
  size?: number;
  width?: number;
  height?: number;
  hasWebp: boolean;
}

@JSONSchema({
  properties: {
    fileEntities: { $ref: '#/definitions/FileEntity' },
    folder: { $ref: '#/definitions/Folder' },
  },
})
@Entity()
class File {
  @PrimaryGeneratedColumn('uuid')
  @Allow()
  id: string;

  @Index('IDX_file_userId', ['userId'])
  @Column({ type: 'varchar', length: 36, default: null })
  @Length(1, 36)
  @IsNullable()
  @IsUndefinable()
  userId: string | null;

  @Column({ type: 'varchar', default: null })
  @Length(36, 36)
  @IsNullable()
  @IsUndefinable()
  folderId: string | null;

  @Column({ type: 'varchar', length: 255 })
  @Length(1, 255)
  url: string;

  @Column({ type: 'varchar', length: 150, default: '' })
  @Length(0, 150)
  @IsUndefinable()
  alt: string;

  @Column({ type: 'enum', enum: FileType })
  @IsEnum(FileType)
  type: FileType;

  @Column({ type: 'json', default: {} })
  @IsObject()
  @IsUndefinable()
  formats: IImageFormat;

  @Column({ type: 'json', default: {} })
  @IsObject()
  @IsUndefinable()
  meta: IFileMeta;

  @CreateDateColumn()
  @IsTypeormDate()
  createdAt: Date;

  @UpdateDateColumn()
  @IsTypeormDate()
  updatedAt: Date;

  @OneToMany(() => FileEntity, (entityFile) => entityFile.file)
  fileEntities: FileEntity[];

  @ManyToOne('Folder', 'files', { onDelete: 'SET NULL' })
  @IsUndefinable()
  folder: Folder;
}

export default File;
