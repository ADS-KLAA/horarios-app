import { SVGProps } from "react"
const QRCodeSVG = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" {...props}>
    <g fill="#fff">
      <path d="M6 0H0v6h6V0zM5 5H1V1h4v4z" />
      <path d="M2 2h2v2H2V2zM0 16h6v-6H0v6zm1-5h4v4H1v-4z" />
      <path d="M2 12h2v2H2v-2zM10 0v6h6V0h-6zm5 5h-4V1h4v4z" />
      <path d="M12 2h2v2h-2V2zM2 7H0v2h3V8H2zM7 9h2v2H7V9zM3 7h2v1H3V7zM9 12H7v1h1v1h1v-1zM6 7v1H5v1h2V7zM8 4h1v2H8V4zM9 8v1h2V7H8v1zM7 6h1v1H7V6zM9 14h2v2H9v-2zM7 14h1v2H7v-2zM9 11h1v1H9v-1zM9 3V1H8V0H7v4h1V3zM12 14h1v2h-1v-2zM12 12h2v1h-2v-1zM11 13h1v1h-1v-1zM10 12h1v1h-1v-1zM14 10v1h1v1h1v-2h-1zM15 13h-1v3h2v-2h-1zM10 10v1h3V9h-2v1zM12 7v1h2v1h2V7h-2z" />
    </g>
  </svg>
)
export default QRCodeSVG
