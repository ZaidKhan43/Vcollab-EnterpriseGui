import {PaletteColor} from "../palette/types/palette"
import {LegendType, LegendTicsType} from '../palette/types/legend'

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
        this.ticks = options.ticks;
    }

    draw(ctx:CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.rect(this.x,this.y,this.width,this.height);
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'black';
        ctx.stroke();
        if(this.paletteType === LegendType.DISCRETE)
        {
            ctx.fillStyle = this.colorTop;
            ctx.fillRect(this.x,this.y,this.width,this.height);
            ctx.fillStyle = this.textColor;
            const text = this.valueType === ValueType.NA ? 'NA' : this.textCenter;
            ctx.fillText(text,this.x + this.width + this.width/3 , this.y + this.height/2);
            
        }
        else if(this.paletteType === LegendType.CONTINUOUS)
        {
            let grd = ctx.createLinearGradient(this.x,this.y,this.x,this.y+this.height);
            grd.addColorStop(0, this.colorTop);
            grd.addColorStop(1, this.colorBottom);                                                         
            ctx.fillStyle = grd;   
            ctx.fillRect(this.x,this.y,this.width,this.height);
            ctx.fillStyle = this.textColor;
            const textTop = this.valueType === ValueType.NA ? 'NA' : this.textTop;
            const textBtm = this.valueType === ValueType.NA ? 'NA' : this.textBottom;
            if(textTop !== ValueType.NA && textTop)
            ctx.fillText(textTop,this.x + this.width + this.width/3 , this.y);
            if(textBtm !== ValueType.NA && textBtm)
            ctx.fillText(textBtm,this.x + this.width + this.width/3 , this.y + this.height);
        }
        
    }
}

export class Palette {
    private position: {x:number, y: number};
    private width: number;
    private height: number;
    private bandWidth: number;
    private bandHeight: number;
    private textColor: string;
    private textAlign: string;
    private font: string;
    private baseline: string;
    private minMax: [number,number];
    private colors: string[];
    private values: number[];
    private paletteType: LegendType;
    private scale: string;
    private paletteElements: PaletteElement[];
    private ticks: LegendTicsType;
    constructor() {
        this.position = {x: 15, y: 15};
        this.bandWidth =  20;
        this.bandHeight = 20;
        this.baseline = 'middle';
        this.colors = ['#ee4035', '#f37736', '#fdf498', '#7bc043'];
        this.values = [100,50,30,0];
        this.paletteType = LegendType.DISCRETE;
        this.width = 300;
        this.height = 300;
        this.minMax = [0,10];
        this.scale = 'linear';
        this.font = '12px Times New Roman'
        this.textColor = 'black';
        this.textAlign = 'middle';
        this.paletteElements = [];
        this.ticks = LegendTicsType.OUTSIDE
    }
    draw(ctx:CanvasRenderingContext2D) {
        //console.log("drawn")
        ctx.font = this.font;
        ctx.textAlign = this.textAlign as any;
        ctx.textBaseline = this.baseline as any;

        const xOffset = 0;
        const yOffset = this.bandHeight;
        const colorCount = LegendType.CONTINUOUS?(this.colors.length-1):this.colors.length;
        for(let i=0; i< colorCount; i++) {
            const options = {
                x: this.position.x+i*xOffset,
                y: this.position.y+i*yOffset,
                width: this.bandWidth,
                height: this.bandHeight,
                colorTop: this.colors[i],
                colorBottom: this.paletteType === LegendType.CONTINUOUS ? this.colors[i+1] :this.colors[i],
                textTop: this.paletteType === LegendType.CONTINUOUS && i === 0 ? (this.values[i]).toString() : null,
                textCenter: this.paletteType === LegendType.DISCRETE ?(this.values[i]).toString() : null,
                textBottom: this.paletteType === LegendType.CONTINUOUS ? (this.values[i+1]).toString() :null,
                textColor: this.textColor,
                valueType: ValueType.FLOAT,
                paletteType: this.paletteType,
                ticks: this.ticks
            } as PaletteElementOptions;
            const paletteElement = new PaletteElement( options);
            paletteElement.draw(ctx);
        }
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