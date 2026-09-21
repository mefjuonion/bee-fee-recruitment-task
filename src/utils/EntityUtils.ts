import Entity from 'src/core/Entity';

class EntityUtils {
  public static intersects(a: Entity, b: Entity): boolean {
    return a.body.getBounds().rectangle.intersects(b.body.getBounds().rectangle);
  }
}

export default EntityUtils;
