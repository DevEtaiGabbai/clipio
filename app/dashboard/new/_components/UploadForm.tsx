'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from 'framer-motion';
import React from "react";
import { ArrowDownIcon, CloudUploadIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Alert } from "@lemonsqueezy/wedges";
import { useUser } from "@clerk/nextjs";

const UploadForm = ({MEGABYTES, MINUTES}: {MEGABYTES: number, MINUTES: number}) => {
  const { user } = useUser();
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const router = useRouter();

  const handleDragEnter = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
    setIsDragging(true);
  };

  const handleDragOver = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
    setIsDragging(false);
    const files = ev.dataTransfer.files;
    handleFileUpload(files);
  };

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setIsUploading(true);

    try {
      const file = files[0];
      const maxSize = MEGABYTES * 1024 * 1024;
      if (file.size > maxSize) {
        toast.error(`Please upload a file smaller than ${MEGABYTES} MB`);
        return;
      }

      const durationInSeconds = await getVideoDuration(file);
      const minutes = Math.floor(durationInSeconds / 60);
      const seconds = durationInSeconds % 60;
      if (minutes > MINUTES || (minutes === MINUTES && seconds > 0)) {
        toast.error(`Uploaded video must be less than ${MINUTES} minutes`);
        return;
      }

      const response = await fetch('/api/getUserCredits', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ userEmail: user?.primaryEmailAddress?.emailAddress! })
      });

      if (response.ok) {
        const formData = new FormData();
        formData.append('file', file);

        await fetch('http://127.0.0.1:8000/api/upload', {
          method: 'POST',
          body: formData,
        });

        const statusRes = await fetch('http://127.0.0.1:8000/api/status');
        const statusData = await statusRes.json();
        
        if (statusData.status === 'finished') {
          router.push('/dashboard/edit');
        }
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('An error occurred while uploading the file');
    } finally {
      setIsUploading(false);
    }
  };

  const getVideoDuration = (file: File): Promise<number> => {
    return new Promise((resolve) => {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        resolve(video.duration);
      };
      video.src = URL.createObjectURL(file);
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl mb-4">
        <Alert title="Pro Tip:" closable>
          Upload a 9:16 video at 720p or higher.
        </Alert>
      </div>
      <div className="w-full max-w-3xl relative">
        <motion.div
          className="relative flex items-center justify-center"
          animate={{ scale: isDragging ? 1.005 : 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="w-full aspect-video relative overflow-hidden rounded-3xl p-[4px] bg-gradient-to-r from-gray-700 to-gray-800">
            <div className="relative w-full h-full bg-black rounded-[22px] overflow-hidden">
              {isUploading ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-black/90 backdrop-blur-sm text-white flex items-center justify-center rounded-3xl"
                >
                  <div className="text-center flex flex-col items-center">
                    <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                    <p className="mt-4 text-lg text-gray-300">Uploading...</p>
                  </div>
                </motion.div>
              ) : (
                <label
                  htmlFor="fileInput"
                  className="w-full h-full flex flex-col items-center justify-center cursor-pointer text-gray-400 hover:text-gray-300 transition-colors duration-300"
                >
                  <CloudUploadIcon className="w-16 h-16 mb-4" />
                  <p className="text-xl font-semibold mb-2">Choose File or Drag & Drop</p>
                  <p className="text-sm text-gray-500">Max file size {MEGABYTES} MB</p>
                  <p className="text-sm text-gray-500">Max duration {MINUTES} minutes</p>
                </label>
              )}
            </div>
          </div>
          <input
            id="fileInput"
            type="file"
            accept="video/*"
            onChange={(ev) => handleFileUpload(ev.target.files)}
            className="hidden"
          />
        </motion.div>
      </div>
    </div>
  );
}

export default UploadForm;
