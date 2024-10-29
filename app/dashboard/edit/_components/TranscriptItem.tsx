"use client";

import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Clock } from "lucide-react";
import { Card } from '@/components/ui/card';

// Add this new function at the top of the file, outside the component
function formatTimeframe(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  const milliseconds = Math.round((seconds % 1) * 1000);

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
}

interface TranscriptItemProps {
  id: number;
  start: number;
  end: number;
  text: string;
  setSrt: React.Dispatch<React.SetStateAction<string>>;
}

export default function TranscriptItem({ id, start, end, text, setSrt }: TranscriptItemProps) {
  const [localText, setLocalText] = useState(text);

  useEffect(() => {
    setLocalText(text);
  }, [text]);

  const handleBlur = () => {
    setSrt((prevSrt) => {
      const srtLines = prevSrt.split('\n\n');
      const updatedLines = srtLines.map((line) => {
        const [index, time, ...content] = line.split('\n');
        if (parseInt(index) === id) {
          return `${index}\n${time}\n${localText}`;
        }
        return line;
      });
      return updatedLines.join('\n\n');
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalText(e.target.value);
  };

  return (
    <Card className="group bg-[#0e0e0e] relative rounded-lg p-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>In</span>
              <span className="font-medium">{formatTimeframe(start)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>Out</span>
              <span className="font-medium">{formatTimeframe(end)}</span>
            </div>
          </div>
        </div>
        <Input
          className="bg-transparent border-none shadow-none text-lg p-0 focus:ring-0 focus:bg-transparent"
          value={localText}
          onBlur={handleBlur}
          onChange={handleChange}
        />
      </div>
    </Card>
  );
}
