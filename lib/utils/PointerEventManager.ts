import EventManager from "./EventManager";


type PointerEventType =
  "pointerdown" |
  "pointerup" |
  "pointermove";

type Point = {
  x: number;
  y: number;
};

export type ExtendedPointerEvent = {
  domEvent: PointerEvent;
  pointerDown: boolean;
  movement: Point;
  location: Point;

  // Helpers
  percentages: (element: HTMLElement) => Point;
};

type PointerEventCallback = (event: ExtendedPointerEvent) => void;
type DOMPointerEventCallback = (event: PointerEvent) => void;


/**
 * PointerEvent Manager
 * @author Ingo Andelhofs
 */
class PointerEventManager<T extends HTMLElement> {

  // Members
  private element: T;
  private eventManager: EventManager<PointerEventType, DOMPointerEventCallback, PointerEvent>;


  // Public Methods
  public constructor(element: T) {
    this.element = element;
    this.eventManager = new EventManager();
  }

  public on(event: PointerEventType, callback: PointerEventCallback): void {
    const domCallback = this.transformCallback(callback);
    this.listen(event, domCallback);
  }

  public off(event: PointerEventType, callback: PointerEventCallback): void {
    const domCallback = this.transformCallback(callback);
    this.stop(event, domCallback);
  }


  // Private listeners
  private pointerDown = false;
  private insideElement = false;

  private movement: Point = {x: 0, y: 0};
  private location: Point = {x: 0, y: 0};
  private lastLocation: Point = {x: 0, y: 0};

  private onPointerDown = (event: PointerEvent) => {
    this.pointerDown = true;
    this.eventManager.call("pointerdown", event);
  }

  private onPointerMove = (event: PointerEvent) => {
    if (!this.pointerDown && !this.insideElement) {
      return;
    }

    // Movement
    const {clientX, clientY} = event;
    this.lastLocation = {x: this.location.x, y: this.location.y};
    this.location = {x: clientX, y: clientY};
    this.movement = {x: this.location.x - this.lastLocation.x, y: this.location.y - this.lastLocation.y};

    this.eventManager.call("pointermove", event);
  }

  private onPointerUp = (event: PointerEvent) => {
    this.pointerDown = false;

    this.eventManager.call("pointerup", event);
  }

  private onPointerEnter = (event: PointerEvent) => {
    // Fix Movement
    const {clientX, clientY} = event;
    this.location = {x: clientX, y: clientY};
    this.lastLocation = {x: clientX, y: clientY};

    // Inside
    this.insideElement = true;
  }

  private onPointerLeave = () => {
    this.insideElement = false;
  }


  // Private Utils
  private percentages: ExtendedPointerEvent['percentages'] = (element: HTMLElement): Point => {
    const {x, y} = this.location;
    const {left, top, width, height} = element.getBoundingClientRect();

    const offsetLeft = x - left;
    const offsetTop = y - top;

    const percentageX = (offsetLeft / width);
    const percentageY = (offsetTop / height);

    return {
      x: percentageX,
      y: percentageY,
    };
  }

  // Private Helpers
  private listen(event: PointerEventType, callback: DOMPointerEventCallback) {
    if (!this.eventManager.hasListeners()) {
      this.addDefaultListeners();
    }

    this.eventManager.add(event, callback);
  }

  private stop(event: PointerEventType, callback: DOMPointerEventCallback) {
    this.eventManager.remove(event, callback);

    if (!this.eventManager.hasListeners()) {
      this.removeDefaultListeners();
    }
  }

  private addDefaultListeners(): void {
    this.element.addEventListener("pointerenter", this.onPointerEnter);
    this.element.addEventListener("pointerleave", this.onPointerLeave);
    this.element.addEventListener("pointerdown", this.onPointerDown);

    window.addEventListener("pointermove", this.onPointerMove);
    window.addEventListener("pointerup", this.onPointerUp);
  }

  private removeDefaultListeners(): void {
    this.element.removeEventListener("pointerenter", this.onPointerEnter);
    this.element.removeEventListener("pointerleave", this.onPointerLeave);
    this.element.removeEventListener("pointerdown", this.onPointerDown);

    window.removeEventListener("pointermove", this.onPointerMove);
    window.removeEventListener("pointerup", this.onPointerUp);
  }

  private transformCallback(callback: PointerEventCallback): DOMPointerEventCallback {
    return (event: PointerEvent) => {
      callback({
        domEvent: event,
        pointerDown: this.pointerDown,
        movement: this.movement,
        location: this.location,
        percentages: this.percentages,
      });
    }
  }

}

export default PointerEventManager;