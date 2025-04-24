// import { useState } from "react";

// const VirtualizedList = ({ items, itemHeight, containerHeight }) => {
//   const [scrollTop, setScrollTop] = useState(0);
//   const startIndex = Math.floor(scrollTop / itemHeight);
//   const endIndex = Math.min(
//     startIndex + Math.ceil(containerHeight / itemHeight),
//     items.length
//   );
//   const visibleItems = items.slice(startIndex, endIndex);
//   const handleScroll = (event) => {
//     setScrollTop(event.target.scrollTop);
//   };
//   return (
//     <div
//       style={{ height: `${containerHeight}px`, overflowY: "scroll" }}
//       onScroll={handleScroll}
//     >
//       <div style={{ height: `${items.length * itemHeight}px` }}>
//         <div
//           id="visible-list"
//           style={{
//             position: "relative",
//             height: `${visibleItems.length * itemHeight}px`,
//             top: `${startIndex * itemHeight}px`,
//           }}
//         >
//           {visibleItems.map((item) => (
//             <div key={item} style={{ height: `${itemHeight}px` }}>
//               {item}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VirtualizedList;

// If dynamic height of the items
import { useEffect, useMemo, useRef, useState } from "react";

const VirtualizedList = ({ items, containerHeight }) => {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef(null);

  // Step 1: Calculate positions (offsetTop / offsetBottom)
  const positions = useMemo(() => {
    let top = 0;
    return items.map((item) => {
      const pos = { ...item, top, bottom: top + item.height };
      top += item.height;
      return pos;
    });
  }, [items]);

  // Step 2: Determine visible items based on scroll position
  const visibleItems = positions.filter(
    (item) => item.bottom > scrollTop && item.top < scrollTop + containerHeight
  );

  const handleScroll = (e) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  const totalHeight = positions[positions.length - 1]?.bottom || 0;

  return (
    <div
      ref={containerRef}
      style={{ height: containerHeight, overflowY: "scroll" }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: "relative" }}>
        {visibleItems.map((item) => (
          <div
            key={item.id}
            style={{
              position: "absolute",
              top: item.top,
              height: item.height,
              width: "100%",
              boxSizing: "border-box",
              borderBottom: "1px solid #ccc",
              padding: "5px",
              background: "#f9f9f9",
            }}
          >
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VirtualizedList;
