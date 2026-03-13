export default function Code(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      width="35"
      height="29"
      viewBox="0 0 35 29"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" stroke="currentColor">
        <path
          className="right"
          d="M24.9843 22.2949L32.3884 16.3549C33.3864 15.5543 33.3864 14.0355 32.3884 13.2349L24.9843 7.29492"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          className="left"
          d="M10.2559 22.2949L2.85178 16.3549C1.85382 15.5543 1.85383 14.0355 2.85179 13.2349L10.2559 7.29492"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          className="middle"
          d="M12.832 27.9507L22.4086 1.63929"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
