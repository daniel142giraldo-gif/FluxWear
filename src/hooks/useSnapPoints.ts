import { useCallback, useState } from 'react';
import { MAX_SNAP, MIN_SNAP, SNAP_POINTS } from '../constants/snapPoints';
import { SnapPoint } from '../types/bottomSheet';

export const useSnapPoints = (initialSnap: SnapPoint = 25) => {
  const [activeSnap, setActiveSnap] = useState<SnapPoint>(initialSnap);

  const clampHeight = useCallback((percent: number): number => {
    return Math.min(MAX_SNAP, Math.max(MIN_SNAP, percent));
  }, []);

  const snapTo = useCallback((currentPercent: number): SnapPoint => {
    const clamped = clampHeight(currentPercent);
    let closest: SnapPoint = SNAP_POINTS[0] as SnapPoint;
    let minDistance = Infinity;

    for (const snap of SNAP_POINTS) {
      const distance = Math.abs(clamped - snap);
      if (distance < minDistance) {
        minDistance = distance;
        closest = snap as SnapPoint;
      }
    }
    return closest;
  }, [clampHeight]);

  return {
    snapTo,
    clampHeight,
    activeSnap,
    setActiveSnap,
  };
};