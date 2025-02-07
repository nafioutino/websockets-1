import type { Point } from "@/types";

/**
 *  fonction permettant de faire un tracé de lignes
 * @param ctx - contexte du canvas (2d ou 3d)
 * @param startPoint - point de départ du trait
 * @param endPoint - point final du trait
 * @param color - couleur du tracé
 * @param lineWidth - épaisseur du tracé
 * 
 * @returns void (juste le tracé)
 */
export  const drawLine = (ctx: CanvasRenderingContext2D, startPoint: Point, endPoint: Point, color: string, lineWidth: number, isEraser: boolean) => {
 
    ctx.beginPath();
    // couleur du tracé
    ctx.strokeStyle =  isEraser ?  "white" : color;
    // tracer le(s) trait(s) depuis le dernier point
    ctx.moveTo(startPoint.x, startPoint.y);
    // épaisseur du tracé
    ctx.lineWidth = lineWidth;
    //
    ctx.lineCap = "round"
    //
    ctx.lineJoin = "round"
    //  jusqu'au point actuel
    ctx.lineTo(endPoint.x, endPoint.y);
    // tracé
    ctx.stroke();
}

/**
 * 
 * @param ctx  - contexte du canvas
 * @param width - largeur du canvas
 * @param height  -hauteur du canvas
 */
export const clearCanvas = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height); // Effacer tout le contenu
};