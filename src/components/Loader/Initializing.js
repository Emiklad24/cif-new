/**
 * @author trajectory
 * @function Initializing
 **/

export default function Initializing() {
  return (
    <div className="loading gx-text-center">
      <svg width="64px" height="48px">
        <polyline
          points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"
          id="back"
        />
        <polyline
          points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"
          id="front"
        />
      </svg>
    </div>
  );
}
