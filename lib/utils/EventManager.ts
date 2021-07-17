

/**
 * Event Manager
 * @author Ingo Andelhofs
 */
class EventManager<Type, Callback extends CallableFunction, Arg> {

  private map: Map<Type, Callback[]>;

  public constructor() {
    this.map = new Map<Type, Callback[]>();
  }

  public clear() {
    this.map = new Map<Type, Callback[]>();
  }


  public add(type: Type, callback: Callback) {
    if (!this.map.has(type)) {
      this.map.set(type, []);
    }

    const listeners = this.map.get(type)!;
    listeners.push(callback);
  }

  public remove(type: Type, callback: Callback) {
    const listeners = this.map.get(type) ?? [];

    this.map.set(type, listeners.filter((listenerCallback: Callback) => {
      return !(listenerCallback === callback);
    }));
  }

  public call(type: Type, arg: Arg) {
    const listeners = this.map.get(type) ?? [];

    listeners.forEach((listener: Callback) => {
      listener(arg);
    });
  }

  public hasListenersOfType(type: Type): boolean {
    const listeners = this.map.get(type) ?? [];
    return listeners.length > 0;
  }

  public hasListeners(): boolean {
    let counter = 0;

    this.map.forEach((value: Callback[]) => {
      counter += (value.length ?? 0);
    });

    return counter > 0;
  }
}

export default EventManager;