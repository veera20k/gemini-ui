import { create } from 'zustand';

interface DragStoreState {
    dragStateMap: Map<string, boolean>;
    setIsDragging: (id: string, dragging: boolean) => void;
    getIsDragging: (id: string | undefined) => boolean | undefined;
}

const useDragStore = create<DragStoreState>((set, get) => ({
    dragStateMap: new Map(),
    setIsDragging: (id, dragging) => {
        set((state) => ({
            dragStateMap: new Map(state.dragStateMap).set(id, dragging),
        }));
    },
    getIsDragging: (id: string | undefined) => {
        if (!id) return false;
        return get().dragStateMap.get(id);
    },
}));

export default useDragStore;
