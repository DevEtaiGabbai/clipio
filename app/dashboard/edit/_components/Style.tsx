"use client";

import React, { useState } from 'react';
import { Inter, Plus_Jakarta_Sans, Montserrat } from 'next/font/google'
import Image from 'next/image';
import AnimationNone from '../_images/animation-none.svg'
import AnimationBorderFull from '../_images/animation-border-full.svg'
import AnimationBorderWord from '../_images/animation-border-word.svg'
import AnimationPopUp from '../_images/animation-pop-up.svg'
import AnimationColorWord from '../_images/animation-color-words.svg'
import AnimationBorderSelect from '../_images/animation-border-select.svg'
import AnimationStack from '../_images/animation-stack.svg'
import AnimationFadeIn from '../_images/animation-fade-in.svg'
import { Card } from '@/components/ui/card';
import { Tabs } from '@lemonsqueezy/wedges';
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from "framer-motion";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Ban } from 'lucide-react';
import { ColorPicker } from '@/components/ui/color-picker';
import { Separator } from '@/components/ui/separator';

const font3 = Plus_Jakarta_Sans({ subsets: ['latin'] })

const Style = ({
    textAlign,
    setTextAlign,
    animationSpeed,
    setAnimationSpeed,
    backgroundColor,
    setBackgroundColor,
    animateValue,
    setAnimateValue,
    noneAnimation,
    setNoneAnimation,
    popUpAnimation,
    setPopUpAnimation,
    shadowMode,
    setShadowMode,
    shadowNone,
    setShadowNone,
    shadowS,
    setShadowS,
    shadowM,
    setShadowM,
    shadowL,
    setShadowL,
    caseMode,
    setCaseMode,
    myWeight,
    setMyWeight,
    fontMode,
    setFontMode,
    emojiMode,
    setEmojiMode,
    emojiBottom,
    setEmojiBottom,
    emojiTop,
    setEmojiTop,
    emojiNone,
    setEmojiNone,
    color1,
    setColor1,
    color2,
    setColor2,
    color3,
    setColor3,
    displayMode,
    setDisplayMode,
    colorF,
    setColorF,
    captionSize,
    setCaptionSize,
    yPos,
    setYPos,
    xPos,
    setXPos,
    shadow,
    setShadow,
    offsetX,
    setOffsetX,
    offsetY,
    setOffsetY,
    blur,
    setBlur,
    shadowColor,
    setShadowColor,
    selectColor,
    setSelectColor,
}) => {
    const [borderActive, setBorderActive] = useState(false)
    const [bgColorMode, setBgColorMode] = useState('none'); // Default shadow mode
    const handleCaptionSizeChange = (event) => {
        setCaptionSize(event.target.value);
    };

    const handleCaptionYChange = (event) => {
        setYPos(event.target.value);
    };

    const handleCaptionXChange = (event) => {
        setXPos(event.target.value);
    };

    const handleColorFChange = (event) => {
        setColorF(event.target.value);
    };

    const handleDivClick = () => {
        document.getElementById('hiddenColorInput').click();
    };

    const handleColor1Change = (event) => {
        setColor1(event.target.value);
    };

    const handleColor2Change = (event) => {
        setColor2(event.target.value);
    };

    const handleColor3Change = (event) => {
        setColor3(event.target.value);
    };

    const handleFontChange = (font) => {
        // Update the font used in your application
        setFontMode(font);
    };

    const handleMyWeight = (font) => {
        // Update the font used in your application
        setMyWeight(font);
    };

    const handleCaseUpper = (event) => {
        // Update the font used in your application
        setCaseMode('uppercase');
    };
    const handleCaseLower = (event) => {
        // Update the font used in your application
        setCaseMode('lowercase');
    };
    const handleCaseNone = (event) => {
        // Update the font used in your application
        setCaseMode('none');
    };

    const handleShadowNone = (event) => {
        // Update the font used in your application
        setShadowMode('none');
    };

    const handleBackgroundColorChange = (event) => {
        setBackgroundColor(event.target.value);
    };

    const handleSelectColorChange = (event) => {
        setSelectColor(event.target.value);
    };

    const handleAnimationSpeed = (event) => {
        setAnimationSpeed(event.target.value);
    };

    const handleOffsetXChange = (event) => {
        setOffsetX(event.target.value);
    };

    const handleOffsetYChange = (event) => {
        setOffsetY(event.target.value);
    };

    const handleBlurChange = (event) => {
        setBlur(event.target.value);
    };

    const handleShadowColorChange = (event) => {
        setShadowColor(event.target.value);
    };


    const z = 0; // Replace with the number of decimal places you want
    const percentage = (((yPos - 1) / (500 - 1)) * 100).toFixed(z);
    const x = 0; // Replace with the number of decimal places you want
    const Xpercentage = (((xPos - 1) / (500 - 1)) * 100).toFixed(x);

    const [isHovered1, setIsHovered1] = useState(false);
    const [isHovered2, setIsHovered2] = useState(false);
    const [isHovered3, setIsHovered3] = useState(false);

    const [isHoveredEmo1, setIsHoveredEmo1] = useState(false);
    const [isHoveredEmo2, setIsHoveredEmo2] = useState(false);
    const [isHoveredEmo3, setIsHoveredEmo3] = useState(false);

    const [isHoveredCs1, setIsHoveredCs1] = useState(false);
    const [isHoveredCs2, setIsHoveredCs2] = useState(false);
    const [isHoveredCs3, setIsHoveredCs3] = useState(false);

    const [isHoveredSh1, setIsHoveredSh1] = useState(false);
    const [isHoveredSh2, setIsHoveredSh2] = useState(false);
    const [isHoveredSh3, setIsHoveredSh3] = useState(false);
    const [isHoveredSh4, setIsHoveredSh4] = useState(false);

    const [isHoveredAnNone, setIsHoveredAnNone] = useState(false);
    const [isHoveredBorderFull, setIsHoveredBorderFull] = useState(false);
    const [isHoveredBorderWord, setIsHoveredBorderWord] = useState(false);
    const [isHoveredPopUp, setIsHoveredPopUp] = useState(false);
    const [isHoveredColored, setIsHoveredColored] = useState(false);
    const [isHoveredAppear, setIsHoveredAppear] = useState(false);
    const [isHoveredStack, setIsHoveredStack] = useState(false);
    const [isHoveredFadeIn, setIsHoveredFadeIn] = useState(false);

    const [isHoveredLeft1, setIsHoveredLeft1] = useState(false);
    const [isHoveredCenter2, setIsHoveredCenter2] = useState(false);
    const [isHoveredRight3, setIsHoveredRight3] = useState(false);

    const fonts = [
        { label: 'Montserrat', value: 'Montserrat' },
        { label: 'The Bold Font', value: 'The Bold Font' },
        { label: 'Nunito', value: 'Nunito' },
        { label: 'Poppins', value: 'Poppins' },
        { label: 'Roboto', value: 'Roboto' },
        { label: 'Raleway', value: 'Raleway' },
        { label: 'Rubik', value: 'Rubik' },
        { label: 'Noto Sans', value: 'Noto Sans' },
        { label: 'Futura Std', value: 'Futura Std' },
        { label: 'Bangers', value: 'Bangers' },
        { label: 'Helvetica', value: 'Helvetica' },
        { label: 'Cairo', value: 'Cairo' },
        { label: 'TT Fors Trial', value: 'TT Fors Trial' },
        { label: 'Komika', value: 'Komika' },
        { label: 'Oswald', value: 'Oswald' },
        { label: 'Eurostile', value: 'Eurostile' },
    ];

    const weights = [
        { label: 'Black', value: '900' },
        { label: 'Extra Bold', value: '800' },
        { label: 'Bold', value: '700' },
        { label: 'Semi-Bold', value: '600' },
        { label: 'Medium', value: '500' },
        { label: 'Regular', value: '400' },
        { label: 'Light', value: '300' },
        { label: 'Extra Light', value: '200' },
        { label: 'Thin', value: '100' },
    ];

    return (
        // Style Tab
        <div className='max-w-4xl mx-auto'>
                {/* <h1 className="text-2xl font-bold mb-4">Styles Editor</h1> */}
            <Card className="-p-4">
                <ScrollArea className="h-[calc(100vh-6rem)]">
                    <div className="space-y-6 p-6">
                    {/* Text Color */}
                    <Card className="p-3 bg-[#0e0e0e] rounded-lg">
                        <Label className="text-lg font-semibold mb-4">Animation</Label>
                        <div className="grid grid-cols-4 gap-2 mt-2">
                            {[
                                { name: 'None', icon: <Ban className="w-6 h-6" /> },
                                { name: 'Border Full', icon: <Image src={AnimationBorderFull} alt="Border Full" width={40} height={40} /> },
                                { name: 'Border Word', icon: <Image src={AnimationBorderWord} alt="Border Word" width={40} height={40} /> },
                                { name: 'Pop Up', icon: <Image src={AnimationPopUp} alt="Pop Up" width={40} height={40} /> },
                                { name: 'Color Word', icon: <Image src={AnimationColorWord} alt="Color Word" width={40} height={40} /> },
                                { name: 'Border Select', icon: <Image src={AnimationBorderSelect} alt="Border Select" width={40} height={40} /> },
                                { name: 'Stack', icon: <Image src={AnimationStack} alt="Stack" width={40} height={40} /> },
                                { name: 'Fade In', icon: <Image src={AnimationFadeIn} alt="Fade In" width={40} height={40} /> },
                            ].map((item) => (
                                <div
                                    key={item.name}
                                    className={`flex flex-col items-center justify-center p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                                        animateValue === item.name ? 'bg-[#1f1f1f] border border-white' : 'bg-[#262626] hover:bg-[#1f1f1f]'
                                    }`}
                                    onClick={() => setAnimateValue(item.name)}
                                >
                                    {item.icon}
                                    <span className="text-xs mt-2">{item.name}</span>
                                </div>
                            ))}
                        </div>
                    </Card>
                    
                    <Card className="p-6 bg-[#0e0e0e] rounded-lg">
                        <Label className="text-lg font-semibold mb-4">Text Color</Label>
                        <ColorPicker
                            value={colorF}
                            className="w-full mt-2"
                            onChange={(value) => setColorF(value)}
                        />
                        <p className="text-sm text-gray-500 text-right mt-2">{colorF}</p>
                    </Card>

                    {/* Text Size */}
                    <Card className="p-6 bg-[#0e0e0e] rounded-lg">
                        <Label className="text-lg font-semibold mb-4">Text Size</Label>
                        <div className="space-y-4">
                            <Slider
                                value={[captionSize]}
                                onValueChange={([value]) => setCaptionSize(value)}
                                min={10}
                                max={50}
                                step={1}
                                className="w-full mt-2"
                            />
                            <div className="text-sm text-gray-500 text-right">{captionSize}px</div>
                        </div>
                    </Card>

                    {/* Display Mode */}
                    <Card className="p-6 bg-[#0e0e0e] rounded-lg">
                        <Label className="text-lg font-semibold mb-4">Display Mode</Label>
                        <Tabs defaultValue={displayMode} onValueChange={setDisplayMode}>
                            <TabsList className="grid w-full grid-cols-3 mt-2">
                                <TabsTrigger value="2 lines">2 Lines</TabsTrigger>
                                <TabsTrigger value="1 line">1 Line</TabsTrigger>
                                <TabsTrigger value="1 word">per Word</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </Card>

                    {/* Emoji Position */}
                    <Card className="p-6 bg-[#0e0e0e] rounded-lg">
                        <Label className="text-lg font-semibold mb-4">Emoji Position</Label>
                        <Tabs defaultValue={emojiMode} onValueChange={setEmojiMode}>
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="top">Top</TabsTrigger>
                                <TabsTrigger value="bottom">Bottom</TabsTrigger>
                                <TabsTrigger value="none">None</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </Card>
                    <div className="flex items-center space-x-2 my-4">
                        <div className="flex-grow">
                            <Separator />
                        </div>
                        <span className="text-sm font-medium text-gray-500">FONT</span>
                        <div className="flex-grow">
                            <Separator />
                        </div>
                    </div>
                    {/* Font Settings */}
                    <Card className="p-6 bg-[#0e0e0e] rounded-lg">
                        <Label className="text-lg font-semibold mb-[3rem]">Font</Label>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Font Family</Label>
                                <Select value={fontMode} onValueChange={setFontMode}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select font" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {fonts.map((font) => (
                                            <SelectItem key={font.value} value={font.value}>
                                                {font.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Weight</Label>
                                <Select value={myWeight} onValueChange={setMyWeight}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select weight" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {weights.map((weight) => (
                                            <SelectItem key={weight.value} value={weight.value}>
                                                {weight.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </Card>

                    {/* Text Case */}
                    <Card className="p-6 bg-[#0e0e0e] rounded-lg">
                        <Label className="text-lg font-semibold mb-4">Text Case</Label>
                        <Tabs defaultValue={caseMode} onValueChange={setCaseMode}>
                            <TabsList className="grid w-full grid-cols-3 mt-2">
                                <TabsTrigger value="uppercase">Upper</TabsTrigger>
                                <TabsTrigger value="lowercase">Lower</TabsTrigger>
                                <TabsTrigger value="normal">Normal</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </Card>

                    {/* Text Alignment */}
                    <Card className="p-6 bg-[#0e0e0e] rounded-lg">
                        <Label className="text-lg font-semibold mb-4">Text Alignment</Label>
                        <Tabs defaultValue={textAlign} onValueChange={setTextAlign}>
                            <TabsList className="grid w-full grid-cols-3 mt-2">
                                <TabsTrigger value="left">Left</TabsTrigger>
                                <TabsTrigger value="center">Center</TabsTrigger>
                                <TabsTrigger value="right">Right</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </Card>
                    <div className="flex items-center space-x-2 my-4">
                        <div className="flex-grow">
                            <Separator />
                        </div>
                        <span className="text-sm font-medium text-gray-500">TEXT SHADOW</span>
                        <div className="flex-grow">
                            <Separator />
                        </div>
                    </div>
                    {/* Shadow Settings */}
                    <Card className="p-6 bg-[#0e0e0e] rounded-lg">
                        <Label className="text-lg font-semibold mb-4">Shadow Settings</Label>
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <Label>Offset X</Label>
                                <Slider
                                    value={[offsetX]}
                                    onValueChange={([value]) => setOffsetX(value)}
                                    min={0}
                                    max={100}
                                    step={1}
                                />
                            </div>
                            <div className="space-y-4">
                                <Label>Offset Y</Label>
                                <Slider
                                    value={[offsetY]}
                                    onValueChange={([value]) => setOffsetY(value)}
                                    min={0}
                                    max={100}
                                    step={1}
                                />
                            </div>
                            <div className="space-y-4">
                                <Label>Blur</Label>
                                <Slider
                                    value={[blur]}
                                    onValueChange={([value]) => setBlur(value)}
                                    min={0}
                                    max={100}
                                    step={1}
                                />
                            </div>
                            <div className="space-y-4">
                                <Label>Shadow Color</Label>
                                <div className="relative">
                                    <ColorPicker
                                        value={shadowColor}
                                        className="mt-2"
                                        onChange={(value) => setShadowColor(value)}
                                    />
                                    <p className="absolute bottom-0 right-0 text-sm text-gray-500">{shadowColor}</p>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
                </ScrollArea>
            </Card>
        </div>
    );
};

export default Style;
