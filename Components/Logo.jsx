import React from 'react';

const Logo = ({ color }) => {
  return (
    <img
      className={`w-8 ${color} text-teal-accent-400`}
      src="https://raw.githubusercontent.com/viditkulsh/SathiSahyogi/main/image/SathiSahyogi_4mp.jpeg?token=GHSAT0AAAAAACRQTG4UFTLY7KIVTML22HJYZRLXV7A"
      alt="SathiSahyogi Logo"
    />
  );
};

export default Logo;
