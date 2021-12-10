import { PaletteColor } from "../palette/types/palette"
import { LegendType, LegendDirection, LegendTicsType, LegendValuePlacement, LegendTitlePlacement  } from '../../../store/sideBar/colormapSlice';

type PaletteElementOptions = {
    x: number;
    y: number;
    width: number;
    height: number;
    colorTop: string;
    colorBottom: string;
    textTop: string;
    textCenter: string;
    textBottom: string;
    textColor: string;
    valueType: ValueType;
    paletteType: LegendType;
    paletteDirection: LegendDirection;
    valuePlacement: LegendValuePlacement;
    titlePlacement: LegendTitlePlacement;
    ticks: LegendTicsType;
}
enum ValueType {
    NA = 'na',
    FLOAT = 'float'
}
class PaletteElement {
    private x: number;
    private y: number;
    private width: number;
    private height: number;
    private colorTop: string;
    private colorBottom: string;
    private textTop: string;
    private textCenter: string;
    private textBottom: string;
    private textColor: string;
    private valueType: ValueType;
    private paletteType: LegendType;
    private paletteDirection: LegendDirection;
    private valuePlacement: LegendValuePlacement;
    private titlePlacement: LegendTitlePlacement;
    private ticks: LegendTicsType;

    constructor(options: PaletteElementOptions) {
        this.x = options.x;
        this.y = options.y;
        this.width = options.width;
        this.height = options.height;
        this.colorTop = options.colorTop;
        this.colorBottom = options.colorBottom;
        this.textTop = options.textTop;
        this.textCenter = options.textCenter;
        this.textBottom = options.textBottom;
        this.textColor = options.textColor;
        this.valueType = options.valueType;
        this.paletteType = options.paletteType;
        this.paletteDirection = options.paletteDirection;
        this.valuePlacement = options.valuePlacement;
        this.titlePlacement = options.titlePlacement;
        this.ticks = options.ticks;
    }

    draw(ctx: CanvasRenderingContext2D, paletteCount: number, colorCount: number) {

        this.createTickPosition(ctx, colorCount, paletteCount);


        if (this.paletteType === LegendType.DISCRETE) {

            this.createDiscreteLegend(ctx, paletteCount);

        }

        else if (this.paletteType === LegendType.CONTINUOUS) {

            this.createContinuousLegend(ctx, paletteCount);

        }

        

    }

    createDiscreteLegend(ctx: CanvasRenderingContext2D, paletteCount: number) {

        paletteCount = paletteCount + 1;

        ctx.fillStyle = this.colorTop;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.textColor;
        const text = this.valueType === ValueType.NA ? 'NA' : this.textCenter;

    // value placement 

        if (this.paletteDirection === LegendDirection.HORIZONTAL) {


            if (this.valuePlacement === LegendValuePlacement.TOP) {

                ctx.fillText(text, this.x + this.width / 2, this.y - 10);
            }

            if (this.valuePlacement === LegendValuePlacement.BOTTOM) {

                ctx.fillText(text, this.x + this.width / 2, this.y + this.height + 10)
            }

            if (this.valuePlacement === LegendValuePlacement.ALTERNATING) {

                if (paletteCount % 2 === 0) {

                    ctx.fillText(text, this.x + this.width / 2, this.y + this.height + 10)

                }
                else {

                    ctx.fillText(text, this.x + this.width / 2, this.y - 10)
                }

            }


        }

        else if (this.paletteDirection === LegendDirection.VERTICAL) {

            if (this.valuePlacement === LegendValuePlacement.RIGHT) {

                ctx.fillText(text, this.x + this.width + 30, this.y + this.height / 2);

            }

            if (this.valuePlacement === LegendValuePlacement.LEFT) {

                ctx.fillText(text, this.x - 30, this.y + this.height / 2);


            }

            if (this.valuePlacement === LegendValuePlacement.ALTERNATING) {

                if (paletteCount % 2 === 0) {


                    ctx.fillText(text, this.x - 30, this.y + this.height / 2);

                }
                else {

                    ctx.fillText(text, this.x + this.width + 30, this.y + this.height / 2);
                }

            }

        }


    }

    createContinuousLegend(ctx: CanvasRenderingContext2D, paletteCount: number) {

        paletteCount = paletteCount + 1;

        const textTop = this.valueType === ValueType.NA ? 'NA' : this.textTop;
        const textBtm = this.valueType === ValueType.NA ? 'NA' : this.textBottom;

        if (this.paletteDirection === LegendDirection.HORIZONTAL) {

            let grd = ctx.createLinearGradient(this.x, this.y, this.x + this.width, this.y);
            grd.addColorStop(0, this.colorTop);
            grd.addColorStop(1, this.colorBottom);
            ctx.fillStyle = grd;
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.fillStyle = this.textColor;


            if (this.valuePlacement === LegendValuePlacement.TOP) {

                if (textTop !== ValueType.NA && textTop)

                    ctx.fillText(textTop, this.x, this.y - 8)

                if (textBtm !== ValueType.NA && textBtm)

                    ctx.fillText(textBtm, this.x + this.width, this.y - 8)

            }

            if (this.valuePlacement === LegendValuePlacement.BOTTOM) {


                if (textTop !== ValueType.NA && textTop)

                    ctx.fillText(textTop, this.x, this.y + this.height + 10);

                if (textBtm !== ValueType.NA && textBtm)

                    ctx.fillText(textBtm, this.x + this.width, this.y + this.height + 10);

            }


            if (this.valuePlacement === LegendValuePlacement.ALTERNATING) {


                if (paletteCount === 1) {

                    ctx.fillText(textTop, this.x, this.y - 10);
                    ctx.fillText(textBtm, this.x + this.width, this.y + this.height + 10);

                }


                if (paletteCount % 2 === 0) {

                    ctx.fillText(textBtm, this.x + this.width, this.y - 10);

                }
                else if (paletteCount !== 1) {


                    ctx.fillText(textBtm, this.x + this.width, this.y + this.height + 10);

                }

            }


        }
        else if (this.paletteDirection === LegendDirection.VERTICAL) {

            let grd = ctx.createLinearGradient(this.x, this.y, this.x, this.y + this.height);
            grd.addColorStop(0, this.colorTop);
            grd.addColorStop(1, this.colorBottom);
            ctx.fillStyle = grd;
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.fillStyle = this.textColor;
            const textTop = this.valueType === ValueType.NA ? 'NA' : this.textTop;
            const textBtm = this.valueType === ValueType.NA ? 'NA' : this.textBottom;

            if (this.valuePlacement === LegendValuePlacement.RIGHT) {

                if (textTop !== ValueType.NA && textTop)
                    ctx.fillText(textTop, this.x + this.width + 30, this.y);
                if (textBtm !== ValueType.NA && textBtm)
                    ctx.fillText(textBtm, this.x + this.width + 30, this.y + this.height);

            }

            if (this.valuePlacement === LegendValuePlacement.LEFT) {

                if (textTop !== ValueType.NA && textTop)
                    ctx.fillText(textTop, this.x - 30, this.y)
                if (textBtm !== ValueType.NA && textBtm)
                    ctx.fillText(textBtm, this.x - 30, this.y + this.height);

            }

            if (this.valuePlacement === LegendValuePlacement.ALTERNATING) {

                if (paletteCount === 1) {

                    ctx.fillText(textTop, this.x + this.width + 30, this.y)
                    ctx.fillText(textBtm, this.x - 30, this.y + this.height);

                }

                if (paletteCount % 2 === 0) {


                    ctx.fillText(textBtm, this.x + this.width + 30, this.y + this.height)

                }
                else if (paletteCount !== 1) {

                    ctx.fillText(textBtm, this.x - 30, this.y + this.height);

                }

            }


        }

    }

    titlePlacementPosition(ctx: CanvasRenderingContext2D, i: number, canvasHeight: number, canvasWidth: number) {

    // function will call only one time 

        if (this.paletteDirection === LegendDirection.VERTICAL) {

            if (i === 0) {

                this.verticalTitlePlacement(ctx, canvasHeight);

            }



        }

    // function will call only one time     

        else if (this.paletteDirection === LegendDirection.HORIZONTAL) {

            if (i === 0) {

                this.horizontalTitlePlacement(ctx, canvasWidth);


            }


        }


    }

    verticalTitlePlacement(ctx: CanvasRenderingContext2D, canvasHeight: number) {

        if (this.titlePlacement === LegendTitlePlacement.TOP) {

            ctx.fillText("Legend", this.x, this.y - 20);

        }

        else if (this.titlePlacement === LegendTitlePlacement.BOTTOM) {

            ctx.fillText("Legend", this.x, canvasHeight - 50);

        }


    }

    horizontalTitlePlacement(ctx: CanvasRenderingContext2D, canvasWidth: number) {

        switch (true) {

            case this.titlePlacement === LegendTitlePlacement.TOP_LEFT:

                return ctx.fillText("Legend", this.x, this.y - 40);

            case this.titlePlacement === LegendTitlePlacement.TOP_MIDDLE:

                return ctx.fillText("Legend", (this.x + canvasWidth / 2) - 100, this.y - 40);

            case this.titlePlacement === LegendTitlePlacement.TOP_RIGHT:

                return ctx.fillText("Legend", (this.x + canvasWidth) - 100, this.y - 40);

            case this.titlePlacement === LegendTitlePlacement.BOTTOM_LEFT:

                return ctx.fillText("Legend", this.x, this.y + this.height + 20);

            case this.titlePlacement === LegendTitlePlacement.BOTTOM_MIDDLE:

                return ctx.fillText("Legend", this.x + canvasWidth / 2, this.y + this.height + 20);

            case this.titlePlacement === LegendTitlePlacement.BOTTOM_RIGHT:

                return ctx.fillText("Legend", this.x + canvasWidth, this.y + this.height + 20);

        }


        // if(this.titlePlacement === LegendTitlePlacement.TOP_LEFT) {

        //         ctx.fillText("Legend", this.x ,this.y-20);

        // }

        // else if(this.titlePlacement === LegendTitlePlacement.TOP_MIDDLE) {

        //     ctx.fillText("Legend", this.x ,this.y-20);

        // }

        // else if(this.titlePlacement === LegendTitlePlacement.TOP_RIGHT) {

        //     ctx.fillText("Legend", this.x ,this.y-20);

        // }



    }

    createTickPosition(ctx: CanvasRenderingContext2D, colorCount: number, paletteCount: number) {


        // Tic position for horizontal type 
    
            if (this.paletteType === LegendType.CONTINUOUS && this.paletteDirection === LegendDirection.HORIZONTAL) {
    
                    // Tic Position start  
    
                        if (this.ticks === LegendTicsType.NO_TICS) {
    
                            ctx.beginPath();
    
                        }
    
                        else if (this.ticks === LegendTicsType.INSIDE) {
    
                            ctx.beginPath();
                            ctx.rect(this.x, this.y, this.width, this.height);
                            ctx.lineWidth = 1;
                            ctx.strokeStyle = 'black';
                            ctx.stroke();
    
                        }
    
                        else if (this.ticks === LegendTicsType.OUTSIDE) {
    
                            ctx.beginPath();
                            ctx.moveTo(this.x, this.y);
                            ctx.lineTo(this.x + this.width, this.y);
    
                            if (this.valuePlacement === LegendValuePlacement.TOP) {
    
                                ctx.moveTo(this.x, this.y);
                                ctx.lineTo(this.x, this.y - 10);
    
                                if (paletteCount === (colorCount - 1)) {
    
                                    ctx.moveTo(this.x + this.width, this.y);
                                    ctx.lineTo(this.x + this.width, this.y - 10);
    
    
                                }
    
    
                            }
    
                            if (this.valuePlacement === LegendValuePlacement.BOTTOM) {
    
                                ctx.moveTo(this.x, this.y + this.height);
                                ctx.lineTo(this.x, this.y + this.height + 10);
    
                                if (paletteCount === (colorCount - 1)) {
    
                                    ctx.moveTo(this.x + this.width, this.y + this.height);
                                    ctx.lineTo(this.x + this.width, this.y + this.height + 10);
    
    
                                }
    
    
                            }
    
                            if (this.valuePlacement === LegendValuePlacement.ALTERNATING) {
    
                                let count = paletteCount + 1;
    
                                if (count % 2 === 0) {
    
                                    ctx.moveTo(this.x, this.y + this.height);
                                    ctx.lineTo(this.x, this.y + this.height + 10);
    
                                    if (paletteCount === (colorCount - 1)) {
    
                                        ctx.moveTo(this.x + this.width, this.y);
                                        ctx.lineTo(this.x + this.width, this.y - 10);
    
    
                                    }
    
    
                                }
                                else {
    
                                    ctx.moveTo(this.x, this.y);
                                    ctx.lineTo(this.x, this.y - 10);
    
                                    if (paletteCount === (colorCount - 1)) {
    
                                        ctx.moveTo(this.x + this.width, this.y + this.height);
                                        ctx.lineTo(this.x + this.width, this.y + this.height + 10);
    
    
                                    }
    
    
                                }
    
                            }
    
    
                            // Starting close line            
    
                            if (paletteCount === 0) {
    
                                ctx.moveTo(this.x, this.y);
                                ctx.lineTo(this.x, this.y + this.height);
    
                            }
    
                            // Ending close line     
    
                            if (paletteCount === (colorCount - 1)) {
    
                                ctx.moveTo(this.x + this.width, this.y);
                                ctx.lineTo(this.x + this.width, this.y + this.height);
    
                            }
    
                            ctx.save();
                            ctx.translate(this.x, this.y + this.height);
                            ctx.moveTo(0, 0);
                            ctx.lineTo(this.width, 0);
                            ctx.restore();
                            ctx.stroke();
    
                        }
    
                        else if (this.ticks === LegendTicsType.RUNNING_ACROSS) {
    
                            ctx.beginPath();
                            ctx.rect(this.x, this.y, this.width, this.height);
    
                            if (this.valuePlacement === LegendValuePlacement.TOP) {
    
                                ctx.moveTo(this.x, this.y);
                                ctx.lineTo(this.x, this.y - 10);
    
                                if (paletteCount === (colorCount - 1)) {
    
                                    ctx.moveTo(this.x + this.width, this.y);
                                    ctx.lineTo(this.x + this.width, this.y - 10);
    
    
                                }
    
    
                            }
    
                            if (this.valuePlacement === LegendValuePlacement.BOTTOM) {
    
                                ctx.moveTo(this.x, this.y + this.height);
                                ctx.lineTo(this.x, this.y + this.height + 10);
    
                                if (paletteCount === (colorCount - 1)) {
    
                                    ctx.moveTo(this.x + this.width, this.y + this.height);
                                    ctx.lineTo(this.x + this.width, this.y + this.height + 10);
                                }
    
                            }
    
                            if (this.valuePlacement === LegendValuePlacement.ALTERNATING) {
    
                                let count = paletteCount + 1;
    
                                if (count % 2 === 0) {
    
                                    ctx.moveTo(this.x, this.y + this.height);
                                    ctx.lineTo(this.x, this.y + this.height + 10);
    
                                    if (paletteCount === (colorCount - 1)) {
    
                                        ctx.moveTo(this.x + this.width, this.y);
                                        ctx.lineTo(this.x + this.width, this.y - 10);
    
    
                                    }
    
    
                                }
                                else {
    
                                    ctx.moveTo(this.x, this.y);
                                    ctx.lineTo(this.x, this.y - 10);
    
                                    if (paletteCount === (colorCount - 1)) {
    
                                        ctx.moveTo(this.x + this.width, this.y + this.height);
                                        ctx.lineTo(this.x + this.width, this.y + this.height + 10);
    
    
                                    }
    
    
                                }
    
                            }
    
                            ctx.stroke();
    
                        }
    
                    // Tic Position end 
            }

            else if (this.paletteType === LegendType.DISCRETE && this.paletteDirection === LegendDirection.HORIZONTAL) {
    
                // Tic position start 
    
                    if (this.ticks === LegendTicsType.NO_TICS) {
    
                        ctx.beginPath();
    
                    }
    
                    else if (this.ticks === LegendTicsType.INSIDE) {
    
                        ctx.beginPath();
                        ctx.rect(this.x, this.y, this.width, this.height);
                        ctx.lineWidth = 1;
                        ctx.strokeStyle = 'black';
                        ctx.stroke();
    
                    }
    
                    else if (this.ticks === LegendTicsType.OUTSIDE) {
    
                        ctx.beginPath();
                        ctx.moveTo(this.x, this.y);
                        ctx.lineTo(this.x + this.width, this.y);
    
                        // Starting close line            
    
                        if (paletteCount === 0) {
    
                            ctx.moveTo(this.x, this.y);
                            ctx.lineTo(this.x, this.y + this.height);
    
                        }
    
                        // Ending close line     
    
                        if (paletteCount === (colorCount - 1)) {
    
                            ctx.moveTo(this.x + this.width, this.y);
                            ctx.lineTo(this.x + this.width, this.y + this.height);
    
                            // // End outside tick 
    
                            //         ctx.moveTo(this.x+this.width,this.y);
                            //         ctx.lineTo(this.x+this.width,this.y-10);
    
                        }
                        // value placement
    
                        if (this.valuePlacement === LegendValuePlacement.TOP) {
    
                            ctx.moveTo(this.x + this.width / 2, this.y);
                            ctx.lineTo(this.x + this.width / 2, this.y - 10);
    
                        }
    
                        if (this.valuePlacement === LegendValuePlacement.BOTTOM) {
    
                            ctx.moveTo(this.x + this.width / 2, this.y + this.height);
                            ctx.lineTo(this.x + this.width / 2, this.y + this.height + 10);
    
    
                        }
    
                        if (this.valuePlacement === LegendValuePlacement.ALTERNATING) {
    
                            let count = paletteCount + 1;
    
                            if (count % 2 === 0) {
    
                                ctx.moveTo(this.x + this.width / 2, this.y + this.height);
                                ctx.lineTo(this.x + this.width / 2, this.y + this.height + 10);
    
    
                            }
                            else {
    
    
    
                                ctx.moveTo(this.x + this.width / 2, this.y);
                                ctx.lineTo(this.x + this.width / 2, this.y - 10);
                            }
    
                        }
    
    
                        ctx.save();
                        ctx.translate(this.x, this.y + this.height);
                        ctx.moveTo(0, 0);
                        ctx.lineTo(this.width, 0);
                        ctx.restore();
                        ctx.stroke();
    
                    }
    
                    else if (this.ticks === LegendTicsType.RUNNING_ACROSS) {
    
                        ctx.beginPath();
                        ctx.rect(this.x, this.y, this.width, this.height);
                        // ctx.moveTo(this.x , this.y);
                        // ctx.lineTo(this.x,this.y-10);
    
    
                        if (this.valuePlacement === LegendValuePlacement.TOP) {
    
                            ctx.moveTo(this.x + this.width / 2, this.y);
                            ctx.lineTo(this.x + this.width / 2, this.y - 10);
    
                        }
    
                        if (this.valuePlacement === LegendValuePlacement.BOTTOM) {
    
                            ctx.moveTo(this.x + this.width / 2, this.y + this.height);
                            ctx.lineTo(this.x + this.width / 2, this.y + this.height + 10);
    
                        }
    
                        if (this.valuePlacement === LegendValuePlacement.ALTERNATING) {
    
                            let count = paletteCount + 1;
    
                            if (count % 2 === 0) {
    
                                ctx.moveTo(this.x + this.width / 2, this.y + this.height);
                                ctx.lineTo(this.x + this.width / 2, this.y + this.height + 10);
    
    
                            }
                            else {
    
                                ctx.moveTo(this.x + this.width / 2, this.y);
                                ctx.lineTo(this.x + this.width / 2, this.y - 10);
    
    
                            }
    
                        }
    
    
                        ctx.stroke();
    
                    }
    
                 // Tic position end    
    
            }
         
        // Tic position for vertical type 
    
            if (this.paletteType === LegendType.CONTINUOUS && this.paletteDirection === LegendDirection.VERTICAL) {
    
    
               // Tic position start 
    
                        if (this.ticks === LegendTicsType.NO_TICS) {
    
                            ctx.beginPath();
    
                        }
    
                        else if (this.ticks === LegendTicsType.INSIDE) {
    
                            ctx.beginPath();
                            ctx.rect(this.x, this.y, this.width, this.height);
                            ctx.lineWidth = 1;
                            ctx.strokeStyle = 'black';
                            ctx.stroke();
    
                        }
    
                        else if (this.ticks === LegendTicsType.OUTSIDE) {
    
                            ctx.beginPath();
                            ctx.moveTo(this.x, this.y);
                            ctx.lineTo(this.x, this.y + this.height);
    
                            // Starting close line            
    
                            if (paletteCount === 0) {
    
                                ctx.moveTo(this.x, this.y);
                                ctx.lineTo(this.x + this.width, this.y);
    
                            }
    
                            // Ending close line   
    
                            if (paletteCount === colorCount - 1) {
    
                                ctx.moveTo(this.x, this.y + this.height);
                                ctx.lineTo(this.x + this.width, this.y + this.height);
    
                            }
    
                            ctx.save();
                            ctx.translate(this.x + this.width, this.y);
                            ctx.moveTo(0, 0);
                            ctx.lineTo(0, this.height);
                            ctx.restore();
    
    
    
                            if (this.valuePlacement === LegendValuePlacement.LEFT) {
    
                                ctx.moveTo(this.x, this.y);
                                ctx.lineTo(this.x - 10, this.y);
    
                                // End outside tick left side     
    
                                if (paletteCount === colorCount - 1) {
    
                                    ctx.moveTo(this.x, this.y + this.height);
                                    ctx.lineTo(this.x - 10, this.y + this.height);
    
    
                                }
                            }
    
                            if (this.valuePlacement === LegendValuePlacement.RIGHT) {
    
                                ctx.moveTo(this.x + this.width, this.y);
                                ctx.lineTo(this.x + this.width + 10, this.y);
    
                                // End outside tick right side     
    
                                if (paletteCount === colorCount - 1) {
    
                                    ctx.moveTo(this.x + this.width, this.y + this.height);
                                    ctx.lineTo(this.x + this.width + 10, this.y + this.height);
    
    
                                }
    
    
                            }
    
                            if (this.valuePlacement === LegendValuePlacement.ALTERNATING) {
    
                                let count = paletteCount + 1;
    
                                if (count % 2 === 0) {
    
    
                                    ctx.moveTo(this.x, this.y);
                                    ctx.lineTo(this.x - 10, this.y);
    
                                }
                                else {
    
                                    ctx.moveTo(this.x + this.width, this.y);
                                    ctx.lineTo(this.x + this.width + 10, this.y);
                                }
    
                                // End tic position
                                if (paletteCount === colorCount - 1) {
    
                                    ctx.moveTo(this.x, this.y + this.height);
                                    ctx.lineTo(this.x + this.width + 10, this.y + this.height);
    
                                }
    
                            }
    
    
                            ctx.stroke();
    
                        }
    
                        else if (this.ticks === LegendTicsType.RUNNING_ACROSS) {
    
                            ctx.beginPath();
                            ctx.rect(this.x, this.y, this.width, this.height);
    
    
                            if (this.valuePlacement === LegendValuePlacement.LEFT) {
    
                                ctx.moveTo(this.x, this.y);
                                ctx.lineTo(this.x - 10, this.y);
    
                                // End outside tick left side     
    
                                if (paletteCount === colorCount - 1) {
    
                                    ctx.moveTo(this.x, this.y + this.height);
                                    ctx.lineTo(this.x - 10, this.y + this.height);
    
    
                                }
                            }
    
                            if (this.valuePlacement === LegendValuePlacement.RIGHT) {
    
                                ctx.moveTo(this.x + this.width, this.y);
                                ctx.lineTo(this.x + this.width + 10, this.y);
    
                                // End outside tick right side     
    
                                if (paletteCount === colorCount - 1) {
    
                                    ctx.moveTo(this.x + this.width, this.y + this.height);
                                    ctx.lineTo(this.x + this.width + 10, this.y + this.height);
    
    
                                }
    
    
                            }
    
                            if (this.valuePlacement === LegendValuePlacement.ALTERNATING) {
    
                                let count = paletteCount + 1;
    
                                if (count % 2 === 0) {
    
    
                                    ctx.moveTo(this.x, this.y);
                                    ctx.lineTo(this.x - 10, this.y);
    
                                }
                                else {
    
                                    ctx.moveTo(this.x + this.width, this.y);
                                    ctx.lineTo(this.x + this.width + 10, this.y);
                                }
    
                                // End tic position
                                if (paletteCount === colorCount - 1) {
    
                                    ctx.moveTo(this.x, this.y + this.height);
                                    ctx.lineTo(this.x + this.width + 10, this.y + this.height);
    
                                }
    
                            }
    
                            ctx.stroke();
    
                        }
               // Tic position end 
            }
            else if (this.paletteType === LegendType.DISCRETE && this.paletteDirection === LegendDirection.VERTICAL) {
    
                // Tic position  start 
    
                        if (this.ticks === LegendTicsType.NO_TICS) {
    
                            ctx.beginPath();
    
                        }
    
                        else if (this.ticks === LegendTicsType.INSIDE) {
    
                            ctx.beginPath();
                            ctx.rect(this.x, this.y, this.width, this.height);
                            ctx.lineWidth = 1;
                            ctx.strokeStyle = 'black';
                            ctx.stroke();
    
                        }
    
                        else if (this.ticks === LegendTicsType.OUTSIDE) {
    
                            ctx.beginPath();
                            ctx.moveTo(this.x, this.y);
                            ctx.lineTo(this.x, this.y + this.height);
    
                            if (this.valuePlacement === LegendValuePlacement.LEFT) {
    
                                ctx.moveTo(this.x, this.y + this.height / 2);
                                ctx.lineTo(this.x - 10, this.y + this.height / 2);
    
                            }
    
                            if (this.valuePlacement === LegendValuePlacement.RIGHT) {
    
                                ctx.moveTo(this.x, this.y + this.height / 2);
                                ctx.lineTo(this.x + this.width + 10, this.y + this.height / 2);
    
                            }
    
                            if (this.valuePlacement === LegendValuePlacement.ALTERNATING) {
    
                                let count = paletteCount + 1;
    
                                if (count % 2 === 0) {
    
    
                                    ctx.moveTo(this.x, this.y + this.height / 2);
                                    ctx.lineTo(this.x - 10, this.y + this.height / 2);
    
                                }
                                else {
    
                                    ctx.moveTo(this.x, this.y + this.height / 2);
                                    ctx.lineTo(this.x + this.width + 10, this.y + this.height / 2);
                                }
    
                            }
    
    
                            // Starting close line            
    
                            if (paletteCount === 0) {
    
                                ctx.moveTo(this.x, this.y);
                                ctx.lineTo(this.x + this.width, this.y);
    
                            }
    
                            // Ending close line   
    
                            if (paletteCount === colorCount - 1) {
    
                                ctx.moveTo(this.x, this.y + this.height);
                                ctx.lineTo(this.x + this.width, this.y + this.height);
    
                                // End outside tick 
    
                                // ctx.moveTo(this.x,this.y+this.height);
                                // ctx.lineTo(this.x+this.width+10,this.y+this.height);
    
                            }
    
                            ctx.save();
                            ctx.translate(this.x + this.width, this.y);
                            ctx.moveTo(0, 0);
                            ctx.lineTo(0, this.height);
                            ctx.restore();
    
    
                            ctx.stroke();
    
                        }
    
                        else if (this.ticks === LegendTicsType.RUNNING_ACROSS) {
    
                            ctx.beginPath();
                            ctx.rect(this.x, this.y, this.width, this.height);
    
    
                            if (this.valuePlacement === LegendValuePlacement.LEFT) {
    
                                ctx.moveTo(this.x, this.y + this.height / 2);
                                ctx.lineTo(this.x - 10, this.y + this.height / 2);
    
                            }
    
                            if (this.valuePlacement === LegendValuePlacement.RIGHT) {
    
                                ctx.moveTo(this.x, this.y + this.height / 2);
                                ctx.lineTo(this.x + this.width + 10, this.y + this.height / 2);
    
                            }
    
                            if (this.valuePlacement === LegendValuePlacement.ALTERNATING) {
    
                                let count = paletteCount + 1;
    
                                if (count % 2 === 0) {
    
    
                                    ctx.moveTo(this.x, this.y + this.height / 2);
                                    ctx.lineTo(this.x - 10, this.y + this.height / 2);
    
                                }
                                else {
    
                                    ctx.moveTo(this.x, this.y + this.height / 2);
                                    ctx.lineTo(this.x + this.width + 10, this.y + this.height / 2);
                                }
    
                            }
    
                            ctx.stroke();
    
                        }
                
                // Tic position  end 
    
            }
    
    }
    

}

export class Palette {
    private position: { x: number, y: number };
    private width: number;
    private height: number;
    private bandWidth: number;
    private bandHeight: number;
    private textColor: string;
    private textAlign: string;
    private font: string;
    private baseline: string;
    private minMax: [number, number];
    private colors: string[];
    private values: number[];
    private paletteType: LegendType;
    private paletteDirection: LegendDirection;
    private valuePlacement: LegendValuePlacement;
    private titlePlacement: LegendTitlePlacement;
    private scale: string;
    private paletteElements: PaletteElement[];
    private ticks: LegendTicsType;

    constructor() {
        this.position = { x: 50, y: 50 };
        this.bandWidth = 0;
        this.bandHeight = 0;
        this.baseline = 'middle';
        this.colors = ['#ee4035', '#f37736', '#fdf498', '#7bc043', '#ee4035', '#f37736', '#fdf498'];
        this.values = [100, 50, 30, 0, 10, 15, 20];
        this.paletteType = LegendType.DISCRETE;
        this.ticks = LegendTicsType.RUNNING_ACROSS;
        this.paletteDirection = LegendDirection.VERTICAL;
        this.valuePlacement = LegendValuePlacement.RIGHT;
        this.titlePlacement = LegendTitlePlacement.TOP;
        this.width = 0;
        this.height = 0;
        this.minMax = [0, 10];
        this.scale = 'linear';
        this.font = '12px Times New Roman'
        this.textColor = 'black';
        this.textAlign = 'middle';
        this.paletteElements = [];
    }

    draw(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) {

        ctx.font = this.font;
        ctx.textAlign = this.textAlign as any;
        ctx.textBaseline = this.baseline as any;


        var xOffset = 0;
        var yOffset = 0;
        const colorCount = this.paletteType === LegendType.CONTINUOUS ? (this.colors.length - 1) : this.colors.length;

        if (this.paletteDirection === LegendDirection.VERTICAL) {

            this.bandWidth = canvasWidth - 100;
            this.bandHeight = (canvasHeight - 100) / this.colors.length;

            xOffset = 0;
            yOffset = this.bandHeight;
        }

        else if (this.paletteDirection === LegendDirection.HORIZONTAL) {

            this.bandWidth = (canvasWidth - 100) / this.colors.length;
            this.bandHeight = canvasHeight - 100;

            xOffset = this.bandWidth;
            yOffset = 0;
        }

        for (let i = 0; i < colorCount; i++) {
            const options = {
                x: this.position.x + i * xOffset,
                y: this.position.y + i * yOffset,
                width: this.bandWidth,
                height: this.bandHeight,
                colorTop: this.colors[i],
                colorBottom: this.paletteType === LegendType.CONTINUOUS ? this.colors[i + 1] : this.colors[i],
                textTop: this.paletteType === LegendType.CONTINUOUS && i === 0 ? (this.values[i]).toString() : null,
                textCenter: this.paletteType === LegendType.DISCRETE ? (this.values[i]).toString() : null,
                textBottom: this.paletteType === LegendType.CONTINUOUS ? (this.values[i + 1]).toString() : null,
                textColor: this.textColor,
                valueType: ValueType.FLOAT,
                paletteDirection: this.paletteDirection,
                paletteType: this.paletteType,
                valuePlacement: this.valuePlacement,
                titlePlacement: this.titlePlacement,
                ticks: this.ticks
            } as PaletteElementOptions;
            const paletteElement = new PaletteElement(options);
            paletteElement.draw(ctx, i, colorCount);
            paletteElement.titlePlacementPosition(ctx, i, canvasHeight, canvasWidth);
        }


    }

    // Set selected legend settings    

    setPaletteType(type: any) {

        if (type === LegendType.AUTO) {

            this.paletteType = LegendType.AUTO;
        }
        else if (type === LegendType.CONTINUOUS) {

            this.paletteType = LegendType.CONTINUOUS;

        }
        else if (type === LegendType.DISCRETE) {

            this.paletteType = LegendType.DISCRETE;

        }
    }

    setPaletteDirection(direction: any) {

        if (direction === LegendDirection.AUTO) {

            this.paletteDirection = LegendDirection.AUTO;
        }
        else if (direction === LegendDirection.HORIZONTAL) {

            this.paletteDirection = LegendDirection.HORIZONTAL;

        }
        else if (direction === LegendDirection.VERTICAL) {

            this.paletteDirection = LegendDirection.VERTICAL;

        }
    }

    setPaletteTickPosition(tick: any) {

        if (tick === LegendTicsType.NO_TICS) {

            this.ticks = LegendTicsType.NO_TICS;
        }
        else if (tick === LegendTicsType.INSIDE) {

            this.ticks = LegendTicsType.INSIDE;

        }
        else if (tick === LegendTicsType.OUTSIDE) {

            this.ticks = LegendTicsType.OUTSIDE;

        }

        else if (tick === LegendTicsType.RUNNING_ACROSS) {

            this.ticks = LegendTicsType.RUNNING_ACROSS;
        }

    }

    setPaletteTittlePlacement(tittle: any) {

        if (tittle === LegendTitlePlacement.AUTO) {

            this.titlePlacement = LegendTitlePlacement.AUTO;
        }
        else if (tittle === LegendTitlePlacement.BOTTOM) {

            this.titlePlacement = LegendTitlePlacement.BOTTOM;

        }
        else if (tittle === LegendTitlePlacement.BOTTOM_LEFT) {

            this.titlePlacement = LegendTitlePlacement.BOTTOM_LEFT;

        }

        else if (tittle === LegendTitlePlacement.BOTTOM_MIDDLE) {

            this.titlePlacement = LegendTitlePlacement.BOTTOM_MIDDLE;
        }

        else if (tittle === LegendTitlePlacement.BOTTOM_RIGHT) {

            this.titlePlacement = LegendTitlePlacement.BOTTOM_RIGHT;
        }

        else if (tittle === LegendTitlePlacement.TOP) {

            this.titlePlacement = LegendTitlePlacement.TOP;
        }

        else if (tittle === LegendTitlePlacement.TOP_LEFT) {

            this.titlePlacement = LegendTitlePlacement.TOP_LEFT;
        }

        else if (tittle === LegendTitlePlacement.TOP_MIDDLE) {

            this.titlePlacement = LegendTitlePlacement.TOP_MIDDLE;
        }

        else if (tittle === LegendTitlePlacement.TOP_RIGHT) {

            this.titlePlacement = LegendTitlePlacement.TOP_RIGHT;
        }

    }

    setPaletteValuePlacement(value: any) {

        if (value === LegendValuePlacement.AUTO) {

            this.valuePlacement = LegendValuePlacement.AUTO;
        }
        else if (value === LegendValuePlacement.BOTTOM) {

            this.valuePlacement = LegendValuePlacement.BOTTOM;

        }
        else if (value === LegendValuePlacement.LEFT) {

            this.valuePlacement = LegendValuePlacement.LEFT;

        }

        else if (value === LegendValuePlacement.RIGHT) {

            this.valuePlacement = LegendValuePlacement.RIGHT;
        }

        else if (value === LegendValuePlacement.TOP) {

            this.valuePlacement = LegendValuePlacement.TOP;
        }

        else if (value === LegendValuePlacement.ALTERNATING) {

            this.valuePlacement = LegendValuePlacement.ALTERNATING;
        }


    }



    setPaletteColor(colors:any) {

        console.log("maniks",colors);

        this.colors = colors;

    }

    setPaletteValue(values:any) {

        this.values =values


    }
}


export class PaletteBuilder {

    palette: Palette;
    constructor() {
        this.palette = new Palette();
    }
    build() {
        return this.palette
    }
}