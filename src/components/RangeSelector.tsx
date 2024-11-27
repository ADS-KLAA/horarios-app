import { Range } from "react-range";

interface RangeProps {
    onRangeChange : (newrange:number[]) => void,
    range: number[]
}
function RangeSelector({range, onRangeChange } : RangeProps) {
     // Default range: 8 AM to 10 PM
    const MIN = 8;
    const MAX = 23;
  
    const handleRangeChange = (newRange : number[]) => {
      onRangeChange(newRange); // Notify parent of changes[]
    };
  
    return (
      <div className="w-1/5 flex flex-col items-center my-4">
        <div className="flex justify-between w-full text-sm font-medium mb-2">
          <span>Start: {range[0]}:00</span>
          <span>End: {range[1]}:00</span>
        </div>
        <Range
          step={1}
          min={MIN}
          max={MAX}
          values={range}
          onChange={handleRangeChange}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              className="h-2 bg-gray-200 rounded-full w-full relative"
            >
              <div
                className="absolute h-2 bg-primaryBlack rounded-full"
                style={{
                  left: `${((range[0] - MIN) / (MAX - MIN)) * 100}%`,
                  right: `${100 - ((range[1] - MIN) / (MAX - MIN)) * 100}%`,
                }}
              />
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              className="h-5 w-5 bg-primaryBlack rounded-full shadow-md focus:outline-none"
            />
          )}
        />
      </div>
    );
  };
export default RangeSelector