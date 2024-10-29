"use client";
import TranscriptionEditor from "./TranscriptEditor";
import { useState, useEffect } from 'react';
import { Inter, Plus_Jakarta_Sans, Montserrat } from 'next/font/google'
import Style from "./Style";
import React from 'react';
import { motion } from "framer-motion"
import { Progress } from "@/components/ui/progress";
import useWindowSize from 'react-use/lib/useWindowSize'
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";
// import { useDisclosure } from "@/hooks/use-disclosure";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { useRouter } from 'next/navigation'
import { tips } from "./Tips";
import VideoPlayer from "./VideoPlayer";

const font = Plus_Jakarta_Sans({ subsets: ['latin'] })
const font2 = Montserrat({ subsets: ['latin'] })
const font3 = Inter({ subsets: ['latin'] })

export default function Editor() {

    let [isLimited, setIsLimited] = useState('5');
    const { width, height } = useWindowSize()

    const checkLimit = async () => {
        const response = await fetch('/api/checklimit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.status === 403) {
            setIsLimited('limited')
        }
    }
    useEffect(() => {
        checkLimit();
    }, [])

    const [isTranscribing, setIsTranscribing] = useState(false);
    const [isFetchingInfo, setIsFetchingInfo] = useState(false);

    const [serverVideoUrl, setServerVideoUrl] = useState('');
    const [srt, setSrt] = useState('');
    useEffect(() => {
        const getFiles = async () => {
            try {
                // Get the video file
                const videoRes = await fetch('http://127.0.0.1:8000/api/download/video', {
                    headers: {
                        'Accept': 'video/mp4',
                    },
                });
                const videoBlob = await videoRes.blob();
                const videoUrl = URL.createObjectURL(videoBlob);
                console.log(videoUrl, 'videoUrl');

                setServerVideoUrl(videoUrl); // Set the state variable
            } catch (error) {
                console.error('Error getting video file:', error);
            }
            try {
                // Get the SRT file
                const srtRes = await fetch('http://127.0.0.1:8000/api/download/srt', {
                    headers: {
                        'Accept': 'application/x-subrip',
                    },
                });
                const srtText = await srtRes.text();
                console.log(srtText, 'srtRes');

                setSrt(srtText); // Set the state variable
            } catch (error) {
                console.error('Error getting SRT file:', error);
            }
        };
        getFiles();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTipIndex(Math.floor(Math.random() * tips.length));
        }, 30000); // Change tip every 5 seconds (for testing purposes)

        return () => clearInterval(interval);
    }, []);

    const router = useRouter()
    const Push = () => {
        router.push('/')
    }

    const [primaryColor, setPrimaryColor] = useState('#FFFFFF');
    const [outlineColor, setOutlineColor] = useState('#000000');
    const [value, setValue] = React.useState('1');
    const [captionSize, setCaptionSize] = useState(30);
    const [yPos, setYPos] = useState(150);
    const [xPos, setXPos] = useState(0);
    const [colorF, setColorF] = useState('#ffffff'); // Initial color
    const [displayMode, setDisplayMode] = useState('1 word');
    const [color1, setColor1] = useState('#75FB4C');
    const [color2, setColor2] = useState('#F3FF53');
    const [color3, setColor3] = useState('#D73E2C');
    const [emojiMode, setEmojiMode] = useState('none'); // ['top', 'bottom', 'none']
    const [emojiBottom, setEmojiBottom] = useState('bottom');
    const [emojiTop, setEmojiTop] = useState('top');
    const [emojiNone, setEmojiNone] = useState('none');
    const [fontMode, setFontMode] = useState('The Bold Font'); // ['Montserrat', 'Inter']
    const [myWeight, setMyWeight] = useState('700'); // ['400', '500', '600'
    const [caseMode, setCaseMode] = useState('uppercase'); // ['uppercase', 'lowercase', 'none']
    const [shadowS, setShadowS] = useState('1px 1px 2px #000');
    const [shadowM, setShadowM] = useState('2px 2px 5px #000');
    const [shadowL, setShadowL] = useState('-2px -2px 3px #000, 2px -2px 3px #000, -2px 2px 3px #000, 2px 2px 3px #000');
    const [shadowNone, setShadowNone] = useState('');
    const [shadowMode, setShadowMode] = useState(shadowL); // Default shadow mode
    const [noneAnimation, setNoneAnimation] = useState(true);
    const [popUpAnimation, setPopUpAnimation] = useState('y:10');
    const [animateValue, setAnimateValue] = useState('borderfull');
    const [backgroundColor, setBackgroundColor] = useState('#953AE7');
    const [selectColor, setSelectColor] = useState('#D3D3D3');
    const [animationSpeed, setAnimationSpeed] = useState(0.2);
    const [textAlign, setTextAlign] = useState('center');
    const [isExporting, setIsExporting] = useState(false);
    const [shadow, setShadow] = useState("5px 5px 5px #ff0000");
    const [offsetX, setOffsetX] = useState(5);
    const [offsetY, setOffsetY] = useState(5);
    const [blur, setBlur] = useState(5);
    const [shadowColor, setShadowColor] = useState("#333333");
    const [line, setLine] = useState('');
    const [bgDownloading, setBgDownloading] = useState(false);
    const [videoProgress, setVideoProgress] = useState();
    const [isVisible, setIsVisible] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [currentTipIndex, setCurrentTipIndex] = useState(Math.floor(Math.random() * tips.length));

    const shadowStyles = {
        none: shadowNone,
        s: shadowS,
        m: shadowM,
        l: shadowL,
    };
    // Use the shadow style based on the current mode
    const currentShadowStyle = shadowStyles[shadowMode as keyof typeof shadowStyles];

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, newValue: string) => {
        setValue(newValue);
    };

    if (isTranscribing) {
        return (
            <div>Transcribing your video...</div>
        );
    }

    if (isFetchingInfo) {
        return (
            <div className="text-[#0A0015]">Fetching information...</div>
        );
    }

    const colors = [
        "secondary",
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Congratulations!</DialogTitle>
                    </DialogHeader>
                    {isVisible ? (<Fireworks autorun={{ speed: 2, duration: 3000 }} />) : null}
                    <div className="mx-auto">
                        <p>
                            You have exported your video
                        </p>
                    </div>
                    <DialogFooter className="sm:justify-center">
                        <Button color="secondary" onClick={Push}>
                            Continue
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {bgDownloading ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute z-50 w-screen h-screen top-0"
                >
                    <div className="bg-black/90 w-full h-full backdrop-blur-md text-white inset-0 flex items-center">
                        <div className="w-full text-center flex flex-col items-center">
                            <Progress
                                aria-label="Downloading..."
                                value={videoProgress ?? 0}
                                color="success"
                                className="max-w-sm"
                            />
                            <p className="mt-5">Rendering {Math.floor(videoProgress ?? 0)}%</p>
                            <motion.div
                                key={currentTipIndex}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute mx-auto mt-[100px] w-[500px] h-[100px]"
                            >
                                <p>{tips[currentTipIndex]}</p>
                            </motion.div>

                        </div>
                    </div>
                </motion.div>
            ) : null
            }

            <div className="flex flex-row space-x-4 p-4 h-[98vh]">
                {/* Left: TranscriptionEditor */}
                <div className="w-1/3">
                    <TranscriptionEditor
                        srt={srt}
                        setSrt={setSrt}
                        serverVideoUrl={serverVideoUrl}
                        setServerVideoUrl={setServerVideoUrl}
                        line={line}
                        setLine={setLine}
                    />
                </div>

                {/* Middle: Style */}
                <div className="w-1/3">
                    <Style
                        xPos={xPos}
                        setXPos={setXPos}
                        textAlign={textAlign}
                        setTextAlign={setTextAlign}
                        shadowMode={shadowMode}
                        setShadowMode={setShadowMode}
                        shadowNone={shadowNone}
                        setShadowNone={setShadowNone}
                        shadowS={shadowS}
                        setShadowS={setShadowS}
                        shadowM={shadowM}
                        setShadowM={setShadowM}
                        shadowL={shadowL}
                        setShadowL={setShadowL}
                        caseMode={caseMode}
                        setCaseMode={setCaseMode}
                        myWeight={myWeight}
                        setMyWeight={setMyWeight}
                        fontMode={fontMode}
                        setFontMode={setFontMode}
                        emojiMode={emojiMode}
                        setEmojiMode={setEmojiMode}
                        emojiBottom={emojiBottom}
                        setEmojiBottom={setEmojiBottom}
                        emojiTop={emojiTop}
                        setEmojiTop={setEmojiTop}
                        emojiNone={emojiNone}
                        setEmojiNone={setEmojiNone}
                        color1={color1}
                        setColor1={setColor1}
                        color2={color2}
                        setColor2={setColor2}
                        color3={color3}
                        setColor3={setColor3}
                        displayMode={displayMode}
                        setDisplayMode={setDisplayMode}
                        colorF={colorF}
                        setColorF={setColorF}
                        yPos={yPos}
                        setYPos={setYPos}
                        captionSize={captionSize}
                        setCaptionSize={setCaptionSize}
                        noneAnimation={noneAnimation}
                        setNoneAnimation={setNoneAnimation}
                        popUpAnimation={popUpAnimation}
                        setPopUpAnimation={setPopUpAnimation}
                        animateValue={animateValue}
                        setAnimateValue={setAnimateValue}
                        backgroundColor={backgroundColor}
                        setBackgroundColor={setBackgroundColor}
                        animationSpeed={animationSpeed}
                        setAnimationSpeed={setAnimationSpeed}
                        shadow={shadow}
                        setShadow={setShadow}
                        offsetX={offsetX}
                        setOffsetX={setOffsetX}
                        offsetY={offsetY}
                        setOffsetY={setOffsetY}
                        blur={blur}
                        setBlur={setBlur}
                        shadowColor={shadowColor}
                        setShadowColor={setShadowColor}
                        selectColor={selectColor}
                        setSelectColor={setSelectColor}
                    />
                </div>

                {/* Right: VideoPlayer */}
                <div className="w-1/3">
                    <VideoPlayer
                        line={line}
                        setLine={setLine}
                        srt={srt}
                        setSrt={setSrt}
                        serverVideoUrl={serverVideoUrl}
                        setServerVideoUrl={setServerVideoUrl}
                        xPos={xPos}
                        setXPos={setXPos}
                        textAlign={textAlign}
                        setTextAlign={setTextAlign}
                        animationSpeed={animationSpeed}
                        setAnimationSpeed={setAnimationSpeed}
                        noneAnimation={noneAnimation}
                        setNoneAnimation={setNoneAnimation}
                        popUpAnimation={popUpAnimation}
                        setPopUpAnimation={setPopUpAnimation}
                        animateValue={animateValue}
                        setAnimateValue={setAnimateValue}
                        backgroundColor={backgroundColor}
                        setBackgroundColor={setBackgroundColor}
                        shadowMode={shadowMode}
                        setShadowMode={setShadowMode}
                        shadowNone={shadowNone}
                        setShadowNone={setShadowNone}
                        shadowS={shadowS}
                        setShadowS={setShadowS}
                        shadowM={shadowM}
                        setShadowM={setShadowM}
                        shadowL={shadowL}
                        setShadowL={setShadowL}
                        caseMode={caseMode}
                        setCaseMode={setCaseMode}
                        myWeight={myWeight}
                        setMyWeight={setMyWeight}
                        fontMode={fontMode}
                        setFontMode={setFontMode}
                        emojiMode={emojiMode}
                        setEmojiMode={setEmojiMode}
                        emojiBottom={emojiBottom}
                        setEmojiBottom={setEmojiBottom}
                        emojiTop={emojiTop}
                        setEmojiTop={setEmojiTop}
                        emojiNone={emojiNone}
                        setEmojiNone={setEmojiNone}
                        color1={color1}
                        setColor1={setColor1}
                        color2={color2}
                        setColor2={setColor2}
                        color3={color3}
                        setColor3={setColor3}
                        displayMode={displayMode}
                        colorF={colorF}
                        setColorF={setColorF}
                        yPos={yPos}
                        setYPos={setYPos}
                        captionSize={captionSize}
                        transcriptionItems={srt}
                        isExporting={isExporting}
                        setIsExporting={setIsExporting}
                        shadow={shadow}
                        setShadow={setShadow}
                        offsetX={offsetX}
                        setOffsetX={setOffsetX}
                        offsetY={offsetY}
                        setOffsetY={setOffsetY}
                        blur={blur}
                        setBlur={setBlur}
                        shadowColor={shadowColor}
                        setShadowColor={setShadowColor}
                        selectColor={selectColor}
                        setSelectColor={setSelectColor}
                        bgDownloading={bgDownloading}
                        setBgDownloading={setBgDownloading}
                        videoProgress={videoProgress}
                        setVideoProgress={setVideoProgress}
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                        setDialogOpen={setDialogOpen}
                    />
                </div>
            </div>
        </motion.div>
    );
}
