import React from 'react';
import { Link } from 'react-router-dom';

interface SidebarItemProps {
  id: string;
  icon: string;
  label: string;
  active?: boolean;
  to?: string;
  hasFlyout?: boolean;
  flyoutItems?: Array<{ name: string; to?: string; icon?: string; component?: React.ReactNode }>;
  isSidebarExpanded: boolean;
  isAccordionOpen: boolean;
  onToggleAccordion: (id: string) => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  id, icon, label, active, to = "#", hasFlyout, flyoutItems,
  isSidebarExpanded, isAccordionOpen, onToggleAccordion
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [flyoutPosition, setFlyoutPosition] = React.useState<'top' | 'bottom'>('top');
  const hoverTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    // Determine if flyout should be positioned at top or bottom to avoid cropping
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const windowHeight = window.innerHeight;
      const spaceBelow = windowHeight - rect.top;
      // If less than 300px space below, position flyout from bottom
      if (spaceBelow < 350) {
        setFlyoutPosition('bottom');
      } else {
        setFlyoutPosition('top');
      }
    }

    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 150); // Slightly longer delay to be safe
  };

  const handleClick = (e: React.MouseEvent) => {
    if (isSidebarExpanded && hasFlyout) {
      e.preventDefault();
      onToggleAccordion(id);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`sidebar-item-container relative w-full flex flex-col ${isSidebarExpanded ? '' : 'items-center'} transition-all`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        to={to}
        onClick={handleClick}
        className={`
          flex items-center transition-all duration-200
          ${isSidebarExpanded ? 'w-full h-12 px-4' : 'w-12 h-12 justify-center'}
          ${active
            ? 'sidebar-item-active border-l-2 border-primary-container text-primary-container'
            : 'sidebar-hover text-white/70 hover:text-white'}
        `}
      >
        <span className="material-symbols-outlined">{icon}</span>

        {isSidebarExpanded && (
          <>
            <span className="ml-4 font-medium flex-1 truncate">{label}</span>
            {hasFlyout && (
              <span className={`material-symbols-outlined !text-[18px] transition-transform duration-300 ${isAccordionOpen ? 'rotate-180' : ''}`}>
                expand_more
              </span>
            )}
          </>
        )}
      </Link>

      {/* Tooltip for collapsed state - Moved OUTSIDE the main link to avoid nested anchors */}
      {!isSidebarExpanded && isHovered && (
        <div 
          className={`absolute left-full pl-1 z-[100] animate-in fade-in slide-in-from-left-2 duration-200 ${
            flyoutPosition === 'bottom' ? 'bottom-0' : 'top-0'
          }`}
        >
          <div className={`p-4 min-w-[230px] bg-[#1A171F] border border-white/10 shadow-2xl pointer-events-auto rounded-2xl ${
            flyoutPosition === 'bottom' ? 'rounded-bl-none' : 'rounded-tl-none'
          }`}>
            <div className="text-base font-bold text-white whitespace-nowrap mb-3 px-1">{label}</div>
            {hasFlyout && flyoutItems && (
              <div className="space-y-3">
                {flyoutItems.map((item, idx) => (
                  <div key={idx} className="flex flex-col gap-1">
                    {!item.component ? (
                      <Link 
                        to={item.to || "#"} 
                        className="flex items-center gap-4 py-2 px-3 rounded-xl hover:bg-white/10 transition-all text-sm text-white/60 hover:text-primary-container group/flyout"
                      >
                        {item.icon && (
                          <span className="material-symbols-outlined !text-[20px] text-white/30 group-hover/flyout:text-primary-container transition-colors">
                            {item.icon}
                          </span>
                        )}
                        <span className="font-medium group-hover/flyout:translate-x-1.5 transition-transform">{item.name}</span>
                      </Link>
                    ) : (
                      <div className="pt-1">{item.component}</div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Accordion sub-items for expanded state */}
      {isSidebarExpanded && hasFlyout && (
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${isAccordionOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <div className="flex flex-col gap-1 mt-1 px-2">
            {flyoutItems?.map((item, idx) => (
              item.component ? (
                <div key={idx} className="mt-1">
                  {item.component}
                </div>
              ) : (
                <Link
                  key={idx}
                  to={item.to || "#"}
                  className="flex items-center h-10 pl-10 pr-4 rounded-lg text-[0.85rem] text-white/60 hover:text-primary-container hover:bg-white/10 transition-all group/sub"
                >
                  {item.icon && (
                    <span className="material-symbols-outlined !text-[18px] mr-3 text-white/30 group-hover/sub:text-primary-container transition-colors">
                      {item.icon}
                    </span>
                  )}
                  <span className="group-hover/sub:translate-x-1.5 transition-transform font-medium">{item.name}</span>
                </Link>
              )
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SidebarItem;
