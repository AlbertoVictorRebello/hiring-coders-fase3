import React from "react";

function Coins(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      data-name="Layer 26"
      viewBox="0 0 32 32"
      {...props}
    >
      <defs>
        <linearGradient
          id="a"
          x1="8.793"
          x2="29.207"
          y1="7.793"
          y2="28.207"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#00c6ff"></stop>
          <stop offset="1" stopColor="#0072ff"></stop>
        </linearGradient>
      </defs>
      <path
        fill="url(#a)"
        d="M11.414 15L13 16.586V18h-2v-.586L10.586 17H9.414L9 17.414v1.172l.414.414h2L13 20.586v2.828L11.414 25H11v1H9v-1h-.414L7 23.414V22h2v.586l.414.414h1.172l.414-.414v-1.172L10.586 21h-2L7 19.414v-2.828L8.586 15H9v-1h2v1h.414zM31 8.414L29.414 10 31 11.586v2.828L29.414 16 31 17.586v2.828L29.414 22 31 23.586v2.828L28.414 29H5.586L1 24.414v-8.828L5.586 11h6l1-1L11 8.414V5.586L13.586 3h14.828L31 5.586v2.828zm-18-.828L14.414 9h13.172L29 7.586V6.414L27.586 5H14.414L13 6.414v1.172zM27.586 21L29 19.586v-1.172L27.586 17H19v4h8.586zm0-6L29 13.586v-1.172L27.586 11H14.414l4 4h9.172zM17 23.586v-7.172L13.586 13H6.414L3 16.414v7.172L6.414 27h7.172zm12 .828L27.586 23H19v1.414L16.414 27h11.172L29 25.586v-1.172z"
      ></path>
    </svg>
  );
}

export default Coins;