import { Entity, PrimaryGeneratedColumn, Column, Timestamp } from 'typeorm';
import { ArticleClass } from './cat.article';

@Entity()
export class CatEntity {
  // 会以类名来创建表,如果是驼峰命名的,生成的表名是下划线区分
  @PrimaryGeneratedColumn({ comment: '主键id' })
  id: number;

  @Column({ length: 50, comment: '用户名', generated: 'uuid', unique: true })
  userName: string;

  @Column({ length: 50, comment: '密码' })
  passWord?: string;

  @Column({ comment: '文章', default: null })
  article?: string;

  @Column({ type: 'timestamp', default: () => 'current_timestamp' })
  createAt?: Timestamp;

  @Column({
    type: 'timestamp',
    onUpdate: 'current_timestamp',
    default: () => 'current_timestamp',
  })
  updateAt?: Timestamp;
}
