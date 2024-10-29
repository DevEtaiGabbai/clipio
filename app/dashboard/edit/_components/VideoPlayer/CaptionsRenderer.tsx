"use client";

import { motion } from "framer-motion";
import { Rnd } from "react-rnd";

interface CaptionsRendererProps {
  currentLine: string;
  currentWord: string;
  animateValue: string;
  fontMode: string;
  myWeight: string;
  caseMode: string;
  shadowMode: string;
  colorF: string;
  backgroundColor: string;
  captionSize: number;
  yPos: number;
  textAlign: string;
  externalLineDurationPercent: number;
  offsetX: number;
  offsetY: number;
  blur: number;
  shadowColor: string;
  color1: string;
  color2: string;
  color3: string;
  selectColor: string;
}

export function CaptionsRenderer({
  currentLine,
  currentWord,
  animateValue,
  fontMode,
  myWeight,
  caseMode,
  shadowMode,
  colorF,
  backgroundColor,
  captionSize,
  yPos,
  textAlign,
  externalLineDurationPercent,
  offsetX,
  offsetY,
  blur,
  shadowColor,
  color1,
  color2,
  color3,
  selectColor,
}: CaptionsRendererProps) {
  const baseStyle = {
    fontFamily: `'${fontMode}', sans-serif`,
    fontWeight: myWeight,
    textTransform: caseMode as any,
    textShadow: shadowMode,
    textAlign: textAlign as any,
  };

  const renderCaptionContent = () => {
    switch (animateValue) {
      case 'none':
        return (
          <p 
            style={baseStyle} 
            className="captions-words" 
            dangerouslySetInnerHTML={{ __html: currentLine }} 
          />
        );

      case 'borderfull':
        return (
          <div className="relative inline-block m-2.5">
            <motion.div 
              style={{ 
                scale: externalLineDurationPercent,
                borderRadius: '10px',
                backgroundColor: currentLine ? backgroundColor : null,
                position: 'absolute',
                inset: 0,
                zIndex: -1,
                margin: '0 -5px'
              }}
            />
            <p 
              style={{ ...baseStyle, color: 'white', position: 'relative' }}
              dangerouslySetInnerHTML={{ __html: currentLine }}
            />
          </div>
        );

      case 'popup':
        return (
          <motion.div
            style={{
              scale: externalLineDurationPercent,
              opacity: externalLineDurationPercent,
            }}
          >
            <p 
              style={{
                ...baseStyle,
                textShadow: `${offsetX}px ${offsetY}px ${blur}px ${shadowColor}`,
                display: 'flex',
                flexDirection: 'column',
              }}
              className="captions-words"
              dangerouslySetInnerHTML={{ __html: currentLine }}
            />
          </motion.div>
        );

      // Add other animation cases here...

      default:
        return null;
    }
  };

  return (
    <Rnd
      className="captions handle text-center pointer-events-auto"
      style={{
        color: colorF,
        border: 0,
        zIndex: 20,
        fontSize: `${captionSize}px`,
        top: `${yPos-15}%`,
        width: '100%',
        height: 'auto',
      }}
      default={{
        x: 0,
        y: 0,
        width: '100%',
        height: 'auto',
      }}
      enableResizing={false}
      bounds="parent"
    >
      {renderCaptionContent()}
    </Rnd>
  );
}
