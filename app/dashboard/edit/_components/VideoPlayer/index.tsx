"use client";

import React, { useRef, useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { VideoControls } from './VideoControls';
import { CaptionsRenderer } from './CaptionsRenderer';
import { motion } from "framer-motion";
import parseSrt from 'parse-srt';
import html2canvas from "html2canvas";
import { Check, File, Zap } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Upload } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

interface VideoPlayerProps {
  serverVideoUrl: string;
  srt: string;
  fontMode: string;
  myWeight: string;
  caseMode: string;
  shadowMode: string;
  colorF: string;
  backgroundColor: string;
  captionSize: number;
  yPos: number;
  textAlign: string;
  offsetX: number;
  offsetY: number;
  blur: number;
  shadowColor: string;
  color1: string;
  color2: string;
  color3: string;
  selectColor: string;
  animateValue: string;
  displayMode: string;
  setVideoProgress: (progress: number) => void;
  setBgDownloading: (downloading: boolean) => void;
  setIsVisible: (visible: boolean) => void;
  onOpen: () => void;
}

export default function VideoPlayer({
  serverVideoUrl,
  srt,
  fontMode,
  myWeight,
  caseMode,
  shadowMode,
  colorF,
  backgroundColor,
  captionSize,
  yPos,
  textAlign,
  offsetX,
  offsetY,
  blur,
  shadowColor,
  color1,
  color2,
  color3,
  selectColor,
  animateValue,
  displayMode,
  setVideoProgress,
  setBgDownloading,
  setIsVisible,
  onOpen,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(100);
  const [progress, setProgress] = useState(0);
  const [currentLine, setCurrentLine] = useState('');
  const [currentWord, setCurrentWord] = useState('');
  const [externalLineDurationPercent, setExternalLineDurationPercent] = useState(0);
  const captions = parseSrt(srt);
  const [showExportModal, setShowExportModal] = useState(false)
  const [filename, setFilename] = useState(`clipio_export_${new Date().toISOString().slice(0, 10)}_${new Date().toISOString().slice(11, 13)}`);
  const [format, setFormat] = useState('mp4');
  const [quality, setQuality] = useState('standard');
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = serverVideoUrl;
    }
  }, [serverVideoUrl]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (value: number) => {
    setVolume(value);
    if (videoRef.current) {
      videoRef.current.volume = value / 100;
    }
  };

  const handleProgressChange = (value: number) => {
    if (videoRef.current) {
      const time = (value / 100) * videoRef.current.duration;
      videoRef.current.currentTime = time;
      setProgress(value);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progress);
      setVideoProgress(progress);

      // Update captions based on displayMode
      const currentTime = videoRef.current.currentTime;
      let lineIndex;
      let lineCaptions;

      switch (displayMode) {
        case '2 lines':
          lineIndex = Math.floor(captions.findIndex(c =>
            currentTime >= c.start && currentTime <= c.end) / 4);
          lineCaptions = captions.slice(lineIndex * 4, lineIndex * 4 + 4);
          break;
        case '1 line':
          lineIndex = Math.floor(captions.findIndex(c =>
            currentTime >= c.start && currentTime <= c.end) / 2);
          lineCaptions = captions.slice(lineIndex * 2, lineIndex * 2 + 2);
          break;
        case '1 word':
          lineIndex = captions.findIndex(c =>
            currentTime >= c.start && currentTime <= c.end);
          lineCaptions = captions.slice(lineIndex, lineIndex + 1);
          break;
      }

      if (lineCaptions?.length > 0) {
        const words = lineCaptions.flatMap(caption => caption.text.split(' '));
        setCurrentLine(words.join(' '));
        setCurrentWord(words[0]); // Set first word as current word
      }
    }
  };

  const exportVideo = async () => {
    if (!videoRef.current) return;

    setBgDownloading(true);
    setIsVisible(false);

    const video = videoRef.current;
    const fps = 30;
    const interval = 1 / fps;
    const frames: string[] = [];

    const captureFrame = async () => {
      if (video.currentTime >= video.duration) {
        video.removeEventListener('seeked', captureFrame);

        try {
          const response = await fetch('/api/convert', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              frames,
              width: video.videoWidth,
              height: video.videoHeight
            }),
          });

          if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'video.mp4';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            onOpen();
            setBgDownloading(false);
            setIsVisible(true);
          }
        } catch (error) {
          console.error('Export failed:', error);
          setBgDownloading(false);
          setIsVisible(true);
        }
      }

      const canvas = document.querySelector('#captionsContainer');
      if (canvas) {
        const render = await html2canvas(canvas, { backgroundColor: null });
        const dataUrl = render.toDataURL();
        frames.push(dataUrl);
      }

      video.currentTime += interval;
    };

    video.addEventListener('seeked', captureFrame);
    video.currentTime = 0;
  };

  return (
    <>
      <div className="">
        <div className="fixed top-4 right-4 mt-20">
          <Button onClick={() => setShowExportModal(true)} className="bg-[#18191b] text-white hover:bg-gray-800 ml-2">
            <Check className="mr-2 h-4 w-4 text-[#8c8c8d]" />
            Done
          </Button>
        </div>
        <Dialog open={showExportModal} onOpenChange={setShowExportModal}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">Export Video</DialogTitle>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              {/* Duration */}
              <div className="flex items-center text-gray-400">
                <span className="mr-2">
                  <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                </span>
                <span>{videoRef.current ? `${Math.floor(videoRef.current.duration / 60)}:${Math.floor(videoRef.current.duration % 60).toString().padStart(2, '0')}` : '0:00'}</span>
                <File className="w-4 h-4 mr-2 ml-2" /> {filename}.{format}
              </div>

              {/* Filename */}
              <div className="space-y-2">
                <span className="text-sm">Filename</span>
                <Input 
                  type="text"
                  placeholder="Enter filename"
                  className="w-full px-3 py-2 rounded-lg text-sm"
                  defaultValue={filename}
                  onChange={(e) => setFilename(e.target.value)}
                />
              </div>

              {/* Format */}
              <div className="space-y-2">
                <span className="text-sm">Format</span>
                <Select defaultValue={format}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mp4">MP4</SelectItem>
                    <SelectItem value="mov" disabled>MOV <Badge className='ml-2' variant='outline' aria-disabled>in development</Badge></SelectItem>
                    <SelectItem value="webm" disabled>WebM <Badge className='ml-2' variant='outline' aria-disabled>in development</Badge></SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* Quality */}
              <div className="space-y-2">
                <span className="text-sm">Quality</span>
                <Select defaultValue="standard">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select quality" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="high" disabled>
                      High
                      <Badge className="ml-2" variant="outline">in development</Badge>
                    </SelectItem>
                    <SelectItem value="ultra" disabled>
                      Ultra
                      <Badge className="ml-2" variant="outline">in development</Badge>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button 
                onClick={exportVideo} 
                className="w-full py-6 rounded-lg mt-2"
              >
                <Upload className="mr-2 h-4 w-4" />
                Export Video
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <Card className="w-[360px] overflow-hidden">
        <div className="relative" style={{ aspectRatio: '9/16' }}>
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            onTimeUpdate={handleTimeUpdate}
          />
          <div id="captionsContainer" className="absolute inset-0 z-10 pointer-events-none">
            <CaptionsRenderer
              currentLine={currentLine}
              currentWord={currentWord}
              animateValue={animateValue}
              fontMode={fontMode}
              myWeight={myWeight}
              caseMode={caseMode}
              shadowMode={shadowMode}
              colorF={colorF}
              backgroundColor={backgroundColor}
              captionSize={captionSize}
              yPos={yPos}
              textAlign={textAlign}
              externalLineDurationPercent={externalLineDurationPercent}
              offsetX={offsetX}
              offsetY={offsetY}
              blur={blur}
              shadowColor={shadowColor}
              color1={color1}
              color2={color2}
              color3={color3}
              selectColor={selectColor}
            />
          </div>
        </div>

        <VideoControls
          isPlaying={isPlaying}
          volume={volume}
          progress={progress}
          duration={videoRef.current?.duration || 0}
          currentTime={videoRef.current?.currentTime || 0}
          onPlayPause={handlePlayPause}
          onVolumeChange={handleVolumeChange}
          onProgressChange={handleProgressChange}
        />
      </Card>
    </>
  );
}
