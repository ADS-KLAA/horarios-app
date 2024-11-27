import { SVGProps } from "react"
const ClassSVG = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    viewBox="0 0 32 32"
    {...props}
  >
    <circle
      cx={23}
      cy={13}
      r={5}
      style={{
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 2,
        strokeMiterlimit: 10,
      }}
    />
    <path
      d="M16 25a7 7 0 1 1 14 0"
      style={{
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 2,
        strokeMiterlimit: 10,
      }}
    />
    <circle
      cx={9}
      cy={13}
      r={5}
      style={{
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 2,
        strokeMiterlimit: 10,
      }}
    />
    <path
      d="M2 25a7 7 0 1 1 14 0"
      style={{
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 2,
        strokeMiterlimit: 10,
      }}
    />
  </svg>
)

export const ClassFiledSVG = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    viewBox="0 0 24 24"
    {...props}
  >
    <path fill="currentColor" d="M7.5 5C5.6 5 4 6.6 4 8.5S5.6 12 7.5 12 11 10.4 11 8.5 9.4 5 7.5 5zm9 0C14.6 5 13 6.6 13 8.5s1.6 3.5 3.5 3.5S20 10.4 20 8.5 18.4 5 16.5 5zm-9 9C2.6 14 1 18 1 18v2h13v-2s-1.6-4-6.5-4zm9 0c-1.5 0-2.7.4-3.6.9 1.4 1.2 2 2.6 2.1 2.7l.1.2V20h8v-2c-.1 0-1.7-4-6.6-4z" />
    <path
    color="currentColor"
      d="M0 0h24v24H0z"
      style={{
        fill: "none",
      }}
    />
  </svg>
)

export default ClassSVG
