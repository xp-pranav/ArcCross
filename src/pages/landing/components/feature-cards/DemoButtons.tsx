import React from 'react';
import { Pause, Play, RotateCcw } from 'lucide-react';

export interface DemoControlProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onReplay: () => void;
}

export const DemoButtons: React.FC<DemoControlProps> = ({
  isPlaying,
  onTogglePlay,
  onReplay,
}) => (
  <div className="ac-feature-card-controls">
    <button
      type="button"
      className="ac-control-btn"
      onClick={onTogglePlay}
      aria-label={isPlaying ? 'Pause demonstration' : 'Play demonstration'}
    >
      {isPlaying ? <Pause size={14} /> : <Play size={14} />}
      <span>{isPlaying ? 'Pause' : 'Play'}</span>
    </button>
    <button
      type="button"
      className="ac-control-btn"
      onClick={onReplay}
      aria-label="Replay demonstration"
    >
      <RotateCcw size={14} />
      <span>Replay</span>
    </button>
  </div>
);
