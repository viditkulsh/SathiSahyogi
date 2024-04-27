import React from 'react';

const Logo = ({ color }) => {
  return (
    <img
      className={`w-8 ${color} text-teal-accent-400`}
      src="https://github.com/viditkulsh/SathiSahyogi/assets/91754462/efe9fa2d-ddd8-4116-880c-ee6f483ded14"
      alt="SathiSahyogi Logo"
    />
  );
};

export default Logo;
