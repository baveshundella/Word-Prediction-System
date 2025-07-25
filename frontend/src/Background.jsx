import React from "react";

export default function Background({ dark }) {
  return (
    <div className="bg-anim">
      {dark ? (
        // Dark mode: animated stars
        <svg className="stars" width="100%" height="100%">
          {[...Array(60)].map((_, i) => (
            <circle
              key={i}
              cx={Math.random() * 100 + "%"}
              cy={Math.random() * 100 + "%"}
              r={Math.random() * 1.5 + 0.5}
              fill="#fff"
              opacity={Math.random() * 0.7 + 0.3}
            >
              <animate
                attributeName="cy"
                values="0;100;0"
                dur={2 + Math.random() * 3 + "s"}
                repeatCount="indefinite"
                begin={Math.random() * 2 + "s"}
              />
            </circle>
          ))}
        </svg>
      ) : (
        // Bright mode: animated chat bubbles
        <svg className="bubbles" width="100%" height="100%">
          {[...Array(8)].map((_, i) => (
            <ellipse
              key={i}
              cx={10 + Math.random() * 80 + "%"}
              cy={90 + Math.random() * 10 + "%"}
              rx={30 + Math.random() * 30}
              ry={18 + Math.random() * 12}
              fill="#a5b4fc"
              opacity={0.18 + Math.random() * 0.12}
            >
              <animate
                attributeName="cy"
                values="100;0;100"
                dur={6 + Math.random() * 4 + "s"}
                repeatCount="indefinite"
                begin={Math.random() * 3 + "s"}
              />
            </ellipse>
          ))}
        </svg>
      )}
    </div>
  );
}
