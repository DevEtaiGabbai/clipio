declare module 'parse-srt' {
  export interface SrtItem {
    id: number;
    start: number;
    end: number;
    text: string;
  }

  export default function parseSrt(data: string): SrtItem[];
}
