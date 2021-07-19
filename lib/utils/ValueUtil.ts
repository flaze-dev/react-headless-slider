
type Bounds = {
  min: number;
  max: number;
};


/**
 * ValueUtil
 * @author Ingo Andelhofs
 */
class ValueUtil {

  public static ensureBetween(value: number, bounds: Bounds): number {
    const {min, max} = bounds;
    return Math.min(Math.max(min, value), max);
  }
}

export default ValueUtil;