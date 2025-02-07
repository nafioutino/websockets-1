import { defineStore } from "pinia";
interface DrawingState {
    color: string,
    lineWidth: number,
    isDrawing: boolean,
    isEraser: boolean,
}




export const useDrawingStore = defineStore('drawing', {
    state: (): DrawingState => ({
        color: "#008000",
        lineWidth: 2,
        isDrawing: false,
        isEraser: false,
    }),
    actions: {
        setColor(color: string) {
            this.color = color;
        },
        setLineWidth(newLineWidth: number) {
            this.lineWidth = newLineWidth;
        },
        setIsDrawing(isDrawing: boolean) {
            this.isDrawing = isDrawing;
        },
        setIsEraser(isEraser: boolean) {
            this.isEraser = isEraser;
        }
    }
})