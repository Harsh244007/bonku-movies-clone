import React from "react";

const Banner: React.FC = () => {
  return (
    <div className="bg-blue-500 p-4 text-white">
      <h1 className="text-2xl font-semibold">BonkuMovies Copy without ADS by Harsh</h1>
      <p>Welcome to our page please search any movie below and it will give you that movie without any ads.</p>
    </div>
  );
};

export default React.memo(Banner);
