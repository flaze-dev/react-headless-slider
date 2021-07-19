
export type HandleInfo = {
  id: number;
  percentage: number;
};


export type RenderProps = {
  initialized: boolean;
  handles: HandleInfo[];
  getHandleById: (id: number) => HandleInfo | undefined;
};

export type OnHandleChangeProps = {
  handles: HandleInfo[];
  getHandleById: (id: number) => HandleInfo | undefined;
};