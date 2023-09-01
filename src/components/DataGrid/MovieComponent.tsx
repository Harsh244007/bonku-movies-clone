import React, { memo } from "react";

interface MovieProps {
  title: string;
  LockKey: number | string;
  img: string;
}

const MovieComponent: React.FC<MovieProps> = ({ title, LockKey, img }) => {
  const handleClick = async () => {
    const formData = new FormData();
    formData.append("post", typeof LockKey=="number" ?String(LockKey):LockKey);
    formData.append("action", "doo_player_ajax");
    formData.append("type", "movie");
    formData.append("nume", "streamaly");

    //   "https://bonkumovies.com/wp-admin/admin-ajax.php",
    const response = await fetch(`https://bonkumovies.com/wp-admin/admin-ajax.php`, {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (e) => {
        const data = await e.json();
        console.log("Response data:", response, data);
        return data;
      })
      .catch((error) => {
        console.log("Error:", error);
      })
      .finally(() => {
        console.log("data:");
      });
  };
  return (
    <div
      tabIndex={0}
      className="bg-white rounded-lg shadow-md p-4 mb-4 overflow-hidden"
      style={{ width: "200px", height: "400px" }}
    >
      <img
        src={img}
        alt={title}
        className="w-full h-auto object-cover rounded-md"
      />
      <div className="mt-2 flex flex-col justify-around items-center h-110">
        <h3 className="text-lg font-semibold">{title}</h3>
        <button
          onClick={handleClick}
          className="text-white bg-blue-400 hover:bg-blue-600 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
          tabIndex={1}
        >
          Play Now
        </button>
      </div>
    </div>
  );
};

export default memo(MovieComponent);
