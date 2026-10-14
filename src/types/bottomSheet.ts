export type SnapPoint = 25 | 35 | 50 | 65 | 75 | 90 | 100;

export type BottomSheetMode = 'closed' | 'open';

export interface BottomSheetProps {
  isVisible: boolean;
  initialSnap?: SnapPoint;
  showBlur?: boolean;
  onClose: () => void;
  onSnapChange?: (snap: SnapPoint) => void;
  children: React.ReactNode;
}