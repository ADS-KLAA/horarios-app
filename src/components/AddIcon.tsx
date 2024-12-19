import { SVGProps } from "react"

const AddIcon = (props:SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={64}
    height={64}
    fill="none"
    stroke="#000"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.248}
      d="M6 12h6m0 0h6m-6 0v6m0-6V6"
    />
  </svg>
)
export default AddIcon