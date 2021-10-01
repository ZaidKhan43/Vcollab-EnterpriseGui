import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import {useAppDispatch, useAppSelector} from '../../../../store/storeHooks'
import {fetchCameraMatrix, selectCameraMatrix, selectShowAxis} from '../../../../store/sideBar/sceneSlice'
import CustomWindow from "../../../shared/CustomWindow"
import {vec3, mat4} from "gl-matrix";
import { selectWindowSize } from '../../../../store/windowMgrSlice';

type Color = [number,number,number,number];
function drawAxes(ctx: CanvasRenderingContext2D, rotMat:mat4, width:number,height:number) {
    function drawX(ctx:CanvasRenderingContext2D, pos:vec3, r:number) {
      ctx.beginPath();
      ctx.moveTo(pos[0] - r / 2, pos[1] - r / 2);
      ctx.lineTo(pos[0] + r / 2, pos[1] + r / 2);
      ctx.moveTo(pos[0] + r / 2, pos[1] - r / 2);
      ctx.lineTo(pos[0] - r / 2, pos[1] + r / 2);
      ctx.closePath();
      ctx.lineWidth = r / 5;
      ctx.strokeStyle = "rgb(0,0,0)";
      ctx.stroke();
    }
    function drawY(ctx:CanvasRenderingContext2D, pos:vec3, r:number) {
      ctx.beginPath();
      ctx.moveTo(pos[0] - r / 2, pos[1] + r / 2);
      ctx.lineTo(pos[0], pos[1]);
      ctx.moveTo(pos[0] + r / 2, pos[1] + r / 2);
      ctx.lineTo(pos[0], pos[1]);
      ctx.moveTo(pos[0], pos[1]);
      ctx.lineTo(pos[0], pos[1] - r / 2);
      ctx.lineWidth = r / 5;
      ctx.strokeStyle = "rgb(0,0,0)";
      ctx.stroke();
    }
    function drawZ(ctx:CanvasRenderingContext2D, pos:vec3, r:number) {
      ctx.beginPath();
      ctx.moveTo(pos[0] - r / 2, pos[1] + r / 2);
      ctx.lineTo(pos[0] + r / 2, pos[1] + r / 2);
      ctx.lineTo(pos[0] - r / 2, pos[1] - r / 2);
      ctx.lineTo(pos[0] + r / 2, pos[1] - r / 2);
      ctx.lineWidth = r / 5;
      ctx.strokeStyle = "rgb(0,0,0)";
      ctx.stroke();
    }
    function drawCircle(ctx:CanvasRenderingContext2D, pos:vec3, r:number, color:Color) {
      ctx.beginPath();
      ctx.arc(pos[0], pos[1], r, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fillStyle = `rgba(${color[0]},${color[1]},${color[2]},${color[3]})`;
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(0,0,0,1)";
      ctx.stroke();
    }
    function drawLine(ctx:CanvasRenderingContext2D, pos:vec3,color:Color) {
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.strokeStyle = `rgba(${color[0]},${color[1]},${color[2]},${color[3]})`;
      ctx.lineTo(pos[0], pos[1]);
      ctx.closePath();
      ctx.stroke();
    }
    function drawAxis(ctx:CanvasRenderingContext2D, pos:vec3, axis:string, r:number, color:Color) {
      drawLine(ctx, pos,color);
      drawCircle(ctx, pos, r, color);
      let textSize = r / 1.1;
      switch (axis) {
        case "x":
          drawX(ctx, pos, textSize);
          break;
        case "y":
          drawY(ctx, pos, textSize);
          break;
        case "z":
          drawZ(ctx, pos, textSize);
          break;
        default:
          break;
      }
    }
  
  ctx.resetTransform();
  ctx.clearRect(0, 0, width, height);
  ctx.translate(width / 2, height / 2);
  ctx.scale(1, -1);
  let scale = width / 2 * 0.7;
  let X = vec3.fromValues(rotMat[0], rotMat[1], rotMat[2]);
  let Y = vec3.fromValues(rotMat[4], rotMat[5], rotMat[6]);
  let Z = vec3.fromValues(rotMat[8], rotMat[9], rotMat[10]);
  vec3.scale(X,X,scale);
  vec3.scale(Y,Y,scale);
  vec3.scale(Z,Z,scale);
  
  let red:Color = [245, 51, 82, 1];
  let green:Color = [135, 214, 3, 1];
  let blue:Color = [41, 140, 245, 1];
  let zFirst = [
      { id: "x", pos: X, col:red },
      { id: "y", pos: Y, col:green },
      { id: "z", pos: Z, col:blue }
  ];
  zFirst.sort((a, b) => a.pos[2] - b.pos[2]);
  zFirst.forEach(e => {
      drawAxis(ctx,e.pos,e.id,width/20,e.col);
  })
}

interface Props {
    parentRef: any
}

function AxisTriadWindow(props:Props) {
    const dispatch = useAppDispatch();
    const showAxis = useAppSelector(selectShowAxis);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const rotMat = useAppSelector(selectCameraMatrix);
    const [width,height] = useAppSelector(state => selectWindowSize(state,"window"));
    useEffect(() => {
        dispatch(fetchCameraMatrix());
        if(canvasRef.current)
        ctxRef.current = canvasRef.current.getContext('2d');
    },[canvasRef.current])

    useLayoutEffect(() => {
        if(ctxRef.current) {
            drawAxes(ctxRef.current,new Float32Array(rotMat),width,height);
            
        }   
    },[rotMat, width, height])
    return (
        <>
        <CustomWindow uid="window" resize parentRef = {props.parentRef} width={100} height={100}>
            {
                    
                showAxis ?
                <canvas ref={canvasRef} width={width} height={height} onChange={() => alert("chagne")}></canvas>
                :null
                    
            }
        </CustomWindow>
        </>
    )
}

export default AxisTriadWindow
