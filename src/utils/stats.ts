interface getAccProps {
  correctChar: number;
  errorChar: number;
  text: string;
}
interface getWpmProps {
  endTime?: number | null;
  startTime?: number | null;
  text: string;
}

export const getWPM = ({ endTime, startTime, text }: getWpmProps): number => {
  if (endTime && startTime) {
    const duration = (endTime - startTime) / 1000;
    const totalWords = text.split(' ').length;
    return Math.round((totalWords / duration) * 60);
  }
  return 0;
};

export const getAcc = ({ correctChar, errorChar, text }: getAccProps): number =>
  ((correctChar - errorChar) / text.length) * 100;
