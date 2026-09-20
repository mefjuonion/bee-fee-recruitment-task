import Entity from 'src/core/Entity';

export default function intersects(a: Entity, b: Entity): boolean {
  return a.body.getBounds().rectangle.intersects(b.body.getBounds().rectangle);
}
