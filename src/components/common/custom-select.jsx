import "../../styles/components/custom-select.css"

export default function CustomSelect({
  value,
  onChange,
  options,
}) {  
  return (
    <>
      <select
        className="select-dropdown"
        value={value}
        onChange={onChange}
      >
        {options.map((option, i) => (
          <option key={i} value={option.value} className="sort-option">
            {option.label}
          </option>
        ))}
      </select>
    </>
  )
}; 