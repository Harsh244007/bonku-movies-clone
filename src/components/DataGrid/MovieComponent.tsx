import React, { memo, useState } from "react";
import Modal from "../Common/Modal";

interface MovieProps {
  title: string;
  LockKey: number | string;
  img: string;
}

const MovieComponent: React.FC<MovieProps> = ({ title, LockKey, img }) => {
  const [showModal, setShowModal] = useState(false);
  const [embedUrl, setEmbedUrl] = useState<string | null>(null);

  const handleClick = async () => {
    await fetch(`https://backend-bonku.vercel.app/api/harsh/${LockKey}`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then(async (e) => {
        const data = await e.json();
        setEmbedUrl(data.embed_url);
        setShowModal(true);
        return data.embed_url;
      })
      .catch((error) => {
        console.log("Error:", error);
      })
      .finally(() => {
        console.log("data:");
      });
  };
  const closeModal = () => {
    setShowModal(false);
    setEmbedUrl(null);
  };

  return (
    <div
      tabIndex={0}
      className="bg-white rounded-lg shadow-md p-4 mb-4 overflow-hidden cursor-pointer"
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
          className="text-white bg-blue-400 cursor-pointer hover:bg-blue-600 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
          tabIndex={1}
        >
          Play Now
        </button>
      </div>

      {showModal && (
        <Modal onClose={closeModal}>
          {embedUrl && (
            <iframe
              src={embedUrl}
              width="100%"
              height="100%"
              title="Embedded Content"
            />
          )}
        </Modal>
      )}
    </div>
  );
};

export default memo(MovieComponent);
