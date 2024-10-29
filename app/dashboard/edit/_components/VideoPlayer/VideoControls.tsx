"use client";

import { Slider } from "@/components/ui/slider";
import { Slider as WedgesSlider } from "@lemonsqueezy/wedges";
import { Button } from "@/components/ui/button";
import { Volume2, Volume1, VolumeX, Play, Pause } from "lucide-react";

interface VideoControlsProps {
  isPlaying: boolean;
  volume: number;
  progress: number;
  duration: number;
  currentTime: number;
  onPlayPause: () => void;
  onVolumeChange: (value: number) => void;
  onProgressChange: (value: number) => void;
}

export function VideoControls({
  isPlaying,
  volume,
  progress,
  duration,
  currentTime,
  onPlayPause,
  onVolumeChange,
  onProgressChange,
}: VideoControlsProps) {
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-2 w-full px-4 pb-4 relative z-30">
      <WedgesSlider
        value={[progress]}
        max={100}
        step={0.1}
        onValueChange={([value]) => onProgressChange(value)}
        className="w-full text-black custom-slider"
      />
      <style jsx>{`
        .custom-slider :global([role="slider"]) {
          color: black;
        }
      `}</style>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onPlayPause}
          >
            {isPlaying ? <Pause fill="white" className="h-4 w-4" /> : <Play fill="white" className="h-4 w-4" />}
          </Button>

          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => onVolumeChange(volume > 0 ? 0 : 100)}
            >
              {volume === 0 ? <VolumeX className="h-4 w-4" /> : 
               volume < 50 ? <Volume1 className="h-4 w-4" /> : 
               <Volume2 className="h-4 w-4" />}
            </Button>
            <Slider
              value={[volume]}
              max={100}
              className="w-24"
              onValueChange={([value]) => onVolumeChange(value)}
            />
          </div>
        </div>

        <div className="text-sm text-gray-500">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>
    </div>
  );
}
