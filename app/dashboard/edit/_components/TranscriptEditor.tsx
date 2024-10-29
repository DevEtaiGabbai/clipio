"use client";

import React, { useState, useEffect } from 'react';
import parseSrt from 'parse-srt';
import TranscriptItem from './TranscriptItem';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Settings, Paintbrush } from "lucide-react";

interface SrtItem {
  start: number;
  end: number;
  text: string;
}

interface TranscriptionEditorProps {
  srt: string;
  setSrt: React.Dispatch<React.SetStateAction<string>>;
  serverVideoUrl: string;
  setServerVideoUrl: React.Dispatch<React.SetStateAction<string>>;
  line: string;
  setLine: React.Dispatch<React.SetStateAction<string>>;
}

export default function TranscriptionEditor({
  srt,
  setSrt,
  serverVideoUrl,
  setServerVideoUrl,
  line,
  setLine,
}: TranscriptionEditorProps) {
  const [items, setItems] = useState<SrtItem[]>([]);

  useEffect(() => {
    const parsedItems = parseSrt(srt);
    setItems(parsedItems);
  }, [srt]);

  return (
    <div className="h-full">
      {/* <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Subtitles Editor</h1>
        <div className="flex items-center gap-2">
          <div className="bg-blue-100 text-blue-600 px-2.5 py-0.5 rounded-md text-sm font-medium">
            US
          </div>
          <span className="text-lg">English</span>
        </div>
      </div> */}

      <Card className="h-[calc(100%-5rem)]">
        <ScrollArea className="h-full">
          <div className="p-4 space-y-4">
            {items.map((item, index) => (
              <TranscriptItem
                key={index}
                id={index + 1}
                start={item.start}
                end={item.end}
                text={item.text}
                setSrt={setSrt}
              />
            ))}
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
}
